import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center bg-[#171717] text-gray-200 px-4">

      <h1 className="text-7xl font-extrabold text-yellow-400 drop-shadow-lg">404</h1>
      <p className="text-2xl mt-4 text-gray-300">Oops... Page Not Found!</p>


      <div className="mt-6 text-5xl animate-bounce">🐱</div>
      <p className="text-sm text-gray-500 mt-2 italic">Even the crypto cat couldn’t find this page.</p>


      <Link
        href="/"
        className="mt-8 bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-full font-semibold transition shadow-lg"
      >
        Go Back Home
      </Link>
    </div>
  );
}
