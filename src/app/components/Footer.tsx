import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-800/80 bg-[#0B0D10] py-6">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
        
        {/* Left Side: Logo Image & Brand Name */}
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="FitLog Logo"
            width={24}
            height={24}
            className="h-6 w-auto object-contain"
          />
          <span className="text-lg font-black tracking-wider uppercase text-white">
            FITLOG
          </span>
        </Link>

        {/* Right Side: Copyright Text */}
        <p className="text-xs font-medium text-zinc-400 text-center sm:text-right">
          © {new Date().getFullYear()} FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
}