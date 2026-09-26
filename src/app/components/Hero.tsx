import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-[#121318] p-8 sm:p-12 lg:p-16">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        
        {/* Left Content Column */}
        <div className="z-10 lg:col-span-7">
          {/* Subtitle / Tag */}
          <span className="text-xs font-bold uppercase tracking-widest text-[#ccff00]">
            WORKOUT LIBRARY
          </span>

          {/* Heading */}
          <h1 className="mt-4 text-4xl font-black uppercase leading-none tracking-tight text-white sm:text-5xl lg:text-6xl">
            TRAIN WITH INTENT. <br className="hidden sm:inline" />
            LOG EVERY SET.
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-lg text-base text-zinc-400 sm:text-lg">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          {/* CTA Button */}
          <div className="mt-8">
            <a
              href="#library"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('library')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center rounded-lg bg-[#ccff00] px-6 py-3.5 text-xs font-black uppercase tracking-wider text-zinc-950 transition-all hover:bg-[#b8e600] active:scale-95 cursor-pointer"
            >
              BROWSE WORKOUTS
            </a>
          </div>
        </div>

        {/* Right Graphic Column */}
        <div className="relative flex justify-center lg:col-span-5 lg:justify-end">
          <div className="relative h-[280px] w-full max-w-[340px] sm:h-[360px] lg:h-[400px]">
            <Image
              src="/banner.png"
              alt="Gym Equipment Illustration"
              fill
              priority
              sizes="340px"
              className="object-contain object-center lg:object-right"
            />
          </div>
        </div>

      </div>
    </section>
  );
}