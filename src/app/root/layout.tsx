import { isAuthenticated } from "@/lib/actions/auth.action"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import React from "react"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
   const isUserAuthenticated= await isAuthenticated();
   if(!isUserAuthenticated) redirect('/auth/sign-in');

  return (
    <div>
      <nav>
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Logo" width={38} height={32} />
          <span>PrepWise</span>
        </Link>
      </nav>
      <main>{children}</main>
    </div>
  )
}

