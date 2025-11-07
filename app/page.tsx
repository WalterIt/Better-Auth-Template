'use client'

import { authClient } from "@/auth-client";
import { BetterAuthActionButton } from "@/components/auth/better-auth-action-button";
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react";

export default function Home() {
  const [hasAdminPermission, setHasAdminPermission] = useState(false)
  const {data: session, isPending: loading} = authClient.useSession();

  useEffect(() => {
    authClient.admin
      .hasPermission({ permission: { user: ["list"] } })
      .then(({ data }) => {
        setHasAdminPermission(data?.success ?? false)
      })
  }, [])


  if (loading) {
    return <div className="flex items-center justify-center h-screen text-3xl text-blue-700">Loading...</div>
  }

  return (
    <div className="my-6 px-4 max-w-md mx-auto">
      <div className="text-center space-y-6">
        {session == null ? (
          <>
            <h1 className="text-3xl font-bold">Welcome to Better-Auth App!</h1>
            <Button asChild size="lg">
              <Link href="/auth/login">Sign In / Sign Up</Link>
            </Button>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-semi-bold">
              Welcome {session.user.name}!
            </h1>
            <div className="flex gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/profile">Profile</Link>
              </Button>
              {hasAdminPermission && (
                <Button variant="outline" asChild size="lg">
                  <Link href="/admin">Admin</Link>
                </Button>
              )}
              <BetterAuthActionButton
                variant="destructive"
                size="lg"
                action={() => authClient.signOut()}>
                Sign Out
              </BetterAuthActionButton>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
