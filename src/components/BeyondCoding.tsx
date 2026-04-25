"use client";

import { motion } from "framer-motion";

const PHOTOS = [
  { src: "/beyond/barca.jpg", alt: "FC Barcelona", rotate: -15, z: 1 },
  { src: "/beyond/messi.jpg", alt: "Lionel Messi", rotate: -7, z: 2 },
  { src: "/beyond/naruto.jpg", alt: "Naruto", rotate: 3, z: 3 },
  { src: "/beyond/kakashi.jpg", alt: "Kakashi Hatake", rotate: 12, z: 4 },
];

const fanVariants = {
  hidden: { opacity: 0, y: 40, rotate: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotate: PHOTOS[i].rotate,
    scale: 1,
    transition: {
      delay: 0.15 * i,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function BeyondCoding() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
        {/* Photo fan */}
        <div className="relative h-[220px] w-full max-w-[480px] md:h-[240px] md:max-w-[520px] shrink-0">
          {PHOTOS.map((photo, i) => (
            <motion.div
              key={photo.alt}
              className="absolute bottom-4 w-[110px] h-[140px] md:w-[130px] md:h-[165px] origin-bottom rounded-xl overflow-hidden border-[3px] border-white dark:border-neutral-800 shadow-lg cursor-pointer"
              style={{
                zIndex: photo.z,
                left: `${i * 22 + 8}%`,
              }}
              custom={i}
              variants={fanVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{
                y: -16,
                scale: 1.08,
                zIndex: 10,
                transition: { duration: 0.25, ease: "easeOut" },
              }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </motion.div>
          ))}
        </div>

        {/* <motion.div
          className="relative w-[140px] h-[140px] md:w-[160px] md:h-[160px] shrink-0 hidden md:block"
          initial={{ opacity: 0, rotate: -30 }}
          whileInView={{ opacity: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
  
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 shadow-xl"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute inset-[25%] rounded-full bg-neutral-700/80" />
            <div className="absolute inset-[38%] rounded-full bg-neutral-900" />
            <div className="absolute inset-[44%] rounded-full bg-neutral-600/40" />
            <div className="absolute inset-[12%] rounded-full border border-neutral-700/30" />
            <div className="absolute inset-[16%] rounded-full border border-neutral-700/20" />
            <div className="absolute inset-[20%] rounded-full border border-neutral-700/30" />
          </motion.div>
          <div
            className="absolute -left-8 top-2 w-[130px] h-[130px] md:w-[150px] md:h-[150px] rounded-lg overflow-hidden shadow-md border border-white/10 -z-10"
          >
            <img
              src="/beyond/kakashi.jpg"
              alt="Kakashi Hatake"
              className="w-full h-full object-cover"
              draggable={true}
            />
          </div>
        </motion.div> */}
      </div>

      {/* Text */}
      <div className="flex flex-col gap-3 max-w-xl">
        <h2 className="text-xl font-serif font-bold bg-gradient-to-b from-black to-gray-400/80 bg-clip-text leading-tight text-transparent dark:from-white dark:to-slate-900/10 tracking-tight md:text-2xl">
          Beyond Coding
        </h2>
        <p className="font-serif text-base md:text-lg text-foreground/70 leading-relaxed">
          I&apos;m a lifelong football fanatic and a proud{" "}
          <span className="font-semibold text-foreground/80">FC Barcelona</span> supporter - watching{" "}
          <span className="font-semibold text-foreground/80">Messi</span> play is why I fell in love with the beautiful game.
          Off the pitch, I&apos;m deep into anime - <span className="italic text-foreground/60">Naruto</span> shaped
          how I think about perseverance, and{" "}
          <span className="font-semibold text-foreground/80">Kakashi Hatake</span> remains my all-time favorite character.
        </p>
      </div>
    </div>
  );
}
