import { Separator } from "@/components/ui/separator";
import SettingsLayout from "./layout";
import { ProfileForm } from "./profile-form";

export function SettingsPage() {
  return (
    <div className="container-wrapper">
      <div className="container p-4">
        <SettingsLayout>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Profile</h3>
              <p className="text-sm text-muted-foreground">
                This is how others will see you on the site.
              </p>
            </div>
            <Separator />
            <ProfileForm />
          </div>
        </SettingsLayout>
      </div>
    </div>
  );
}
