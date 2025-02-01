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
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation";

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    const response = await fetch("https://note-iota-two.vercel.app/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: e.target.fullname.value,
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    });

    if (response.ok) {
      e.target.reset();
      setSuccess(true);
      setLoading(false);
      push("/login");
    } else {
      const errorData = await response.json();
      setLoading(false);
      setError(errorData.message || "Registration failed");
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {error && <div className="mx-auto -mb-3 text-red-600">{error}</div>}
      {success && <div className="mx-auto -mb-3 text-green-600">Registration successful!</div>}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>
              Fill field to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="fullname">Fullname</Label>
                </div>
                <Input id="fullname" type="text" required />
              </div>
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
                {loading ? "Registering..." : "Register"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              have an account?{""}
              <Link href="/login" className="ml-1 underline underline-offset-4 text-blue-600">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}