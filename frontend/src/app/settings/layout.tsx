import { Separator } from "@/components/ui/separator"

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full min-h-svh">
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5 w-full">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings
          </p>
          <Separator className="my-6" />
        </div>
        <div className="flex flex-col space-y-8 justify-start lg:flex-row lg:space-x-12 lg:space-y-0">
          <div className="flex-1 lg:max-w-2xl pl-10">{children}</div>
        </div>
      </div>
    </div>
  )
}
