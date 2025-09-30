import Image from "next/image"
import Link from "next/link"
import React from "react"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
 

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

