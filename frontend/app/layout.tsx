import type { Metadata } from 'next'
import './globals.css'
// import Topnav from "@/components/signin/onboarding/topnav"
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import Topnav from '@/components/onboarding/topnav';

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: 'team-india',
  description: 'team-india',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>
        <Topnav />
        {children}
      </body>
    </html>
  )
}
