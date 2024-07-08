import { AuthProvider } from "@/context/AuthContext";
import { getAuthStatus } from "@/lib";

export const metadata = {
  title: "Next.js Authentication",
  description: "Example using NextAuth.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider authenticated={getAuthStatus()}>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
