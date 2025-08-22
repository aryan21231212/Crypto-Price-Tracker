import Link from "next/link";

// app/not-found.tsx
export default function NotFound() {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl font-bold">404</h1>
        <p className="text-xl mt-4">Page Not Found</p>
        <Link href="/" className="mt-6 text-blue-500 underline">
          Go back home
        </Link>
      </div>
    );
  }