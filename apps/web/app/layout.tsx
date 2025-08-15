import './globals.css'

export const metadata = {
  title: 'Hirevision - AI Interview Platform',
  description: 'Boost your hiring process with AI solution',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
