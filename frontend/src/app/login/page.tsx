import { LoginForm } from "@/components/login-form"
import { SignUpForm } from "@/components/signup-form";
import * as React from "react";

export default function LoginPage() {
  const [showSignup, setShowSignup] = React.useState(false);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        {showSignup ? (
          <SignUpForm setShowSignup={setShowSignup} />
        ) : (
          <LoginForm setShowSignup={setShowSignup} />
        )}
      </div>
    </div>
  )
}
