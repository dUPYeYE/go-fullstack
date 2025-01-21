import { GalleryVerticalEnd } from "lucide-react"

import { cn } from "@/lib/utils"
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useAppContext } from "@/hooks/use-context"

const FormSchema = z.object({
  email: z.string().email({
    message: "Enter a correct email address.",
  }),
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  password: z.string().min(3, {
    message: "Password must be at least 3 characters.",
  }),
  confirmPassword: z.string().min(3, {
    message: "Password must be at least 3 characters.",
  }),
}).superRefine(({ password, confirmPassword }, ctx) => {
  if (password !== confirmPassword) {
    ctx.addIssue({
      code: "custom",
      message: "Passwords do not match.",
      path: ["confirmPassword"],
    });
  }
});

export function SignUpForm({
  className,
  setShowSignup,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & { setShowSignup: (show: boolean) => void }) {
  const { register: signUp } = useAppContext();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  })

  const handleSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const result = await signUp(data.email, data.password, data.username);

      if (result === true) {
        toast.success("Signed up successfully, sign in to continue.");
        setShowSignup(false);
      } else {
        toast.error(result || "An error occurred.");
      }
    } catch (error) {
      toast.error(`Failed to sign up.: ${JSON.stringify(error)}`);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
          <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span className="sr-only">dupp.</span>
            </a>
            <h1 className="text-xl font-bold">Welcome to my app.</h1>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Button
                variant="none"
                size="text"
                className="underline underline-offset-4"
                onClick={() => setShowSignup(false)}
                >
                Sign in
              </Button>
            </div>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="m@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex">
                          {"Password"}
                        </FormLabel>
                        <FormControl>
                          <Input type='password' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex">
                          {"Confirm password"}
                        </FormLabel>
                        <FormControl>
                          <Input type='password' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Sign up
                </Button>
              </div>
            </form>
          </Form>
        </div>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
