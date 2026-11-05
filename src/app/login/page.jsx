"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Heart } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default function LoginPage() {
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries());
    const { data, error } = await authClient.signIn.email({
      ...user,
    });
    if (data) {
      redirect("/");
    }
    if (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Brand Header */}
      <div className="mb-8 text-center">
        <Link href="/" className="inline-flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition">
            <Heart className="fill-white w-5 h-5" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-slate-900">
            Social<span className="text-emerald-600">Serve</span>
          </span>
        </Link>
        <p className="text-xs text-slate-500 font-medium mt-1 tracking-wide uppercase">
          Together for a Better Society
        </p>
      </div>

      {/* Signup Card Container */}
      <div className="w-full max-w-md space-y-6">
        <Card className="border border-slate-200/80 shadow-xl bg-white rounded-3xl overflow-hidden">
          <CardHeader className="text-center pb-2 pt-8">
            <CardTitle className="text-2xl font-extrabold tracking-tight text-slate-900">
              Log in to Your Account
            </CardTitle>
            <CardDescription className="text-sm text-slate-500 mt-1">
              Access your community volunteer account
            </CardDescription>
          </CardHeader>

          <CardContent className="p-8 pt-4">
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <FieldGroup className="space-y-4">
                {/* Social Logins */}
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    type="button"
                    className="w-full h-11 border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-medium rounded-xl transition flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-4 h-4 shrink-0"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="text-xs">Apple</span>
                  </Button>

                  <Button
                    variant="outline"
                    type="button"
                    className="w-full h-11 border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-medium rounded-xl transition flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-4 h-4 shrink-0"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="text-xs">Google</span>
                  </Button>
                </div>

                <FieldSeparator className="*:data-[slot=field-separator-content]:bg-white *:data-[slot=field-separator-content]:text-slate-400 *:data-[slot=field-separator-content]:text-xs">
                  Or register with email
                </FieldSeparator>

                {/* Email Field */}
                <Field className="space-y-1.5">
                  <FieldLabel
                    htmlFor="email"
                    className="text-xs font-semibold text-slate-700"
                  >
                    Email Address
                  </FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="m@example.com"
                    required
                    className="h-11 rounded-xl border-slate-200 focus-visible:ring-emerald-500 bg-slate-50/50"
                  />
                </Field>

                {/* Password Field */}
                <Field className="space-y-1.5">
                  <FieldLabel
                    htmlFor="password"
                    className="text-xs font-semibold text-slate-700"
                  >
                    Password
                  </FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    required
                    className="h-11 rounded-xl border-slate-200 focus-visible:ring-emerald-500 bg-slate-50/50"
                  />
                </Field>
              </FieldGroup>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-md transition-colors mt-6"
              >
                Sign In
              </Button>
            </form>

            <div className="text-center mt-6 text-sm text-slate-500">
              Have not an account?{" "}
              <Link
                href="/signup"
                className="text-emerald-600 hover:text-emerald-700 font-semibold underline underline-offset-4"
              >
                Sign Up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
