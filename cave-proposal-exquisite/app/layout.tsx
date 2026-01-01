import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Cave Proposal Generator',
  description: 'Exquisite proposal generator with dynamic schedules and editing'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
