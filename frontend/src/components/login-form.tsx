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
  password: z.string().min(3, {
    message: "Password must be at least 3 characters.",
  }),
})

export function LoginForm({
  className,
  setShowSignup,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & { setShowSignup: (show: boolean) => void }) {
  const { logIn } = useAppContext();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const handleSubmit = async (data: z.infer<typeof FormSchema>) => {
    toast.promise(logIn(data.email, data.password), {
      loading: "Logging in...",
    });
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
              Don&apos;t have an account?{" "}
              <Button
                variant="none"
                size="text"
                className="underline underline-offset-4"
                onClick={() => setShowSignup(true)}>
                Sign up
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
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex">
                          {"Password"}
                          <a
                            href="#"
                            className="ml-auto text-sm underline-offset-4 hover:underline justify-end"
                          >
                            Forgot your password?
                          </a>
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
                  Sign in
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
