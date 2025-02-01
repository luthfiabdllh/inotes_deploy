"use client";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";


export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { push } = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try{
      const res = await signIn("credentials", {
        email: e.target.email.value,
        password: e.target.password.value,
        redirect: false,
        callbackUrl: "/",
      })
      if (!res?.error) {
        e.target.reset();
        setSuccess(true);
        push("/");
      } else {
        setError(res.error);
        console.log(res.error);
        e.target.reset();
        setLoading(false);
      }
    } catch (error) {
          setError("An error occurred");
          console.error(error);
          e.target.reset();
          setLoading(false);
        }
      }


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {error && <div className="mx-auto -mb-3 text-red-600">{error}</div>}
      {success && <div className="mx-auto -mb-3 text-green-600">Registration successful!</div>}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => handleLogin(e)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Login..." : "Login"}
              </Button>
              <Button variant="outline" className="w-full">
                <Image src="/image/ic_google.svg" alt="Google Icon" width={20} height={20} />
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              have an account?{""}
              <Link href="/register" className="ml-1 underline underline-offset-4 text-blue-600">
                Register
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
