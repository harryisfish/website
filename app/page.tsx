import { MotionDiv } from "@/components/ui/motion";
import { LightPoints } from "@/components/ui/light-points";

export default function Home() {
  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="relative h-screen">
        <LightPoints className="absolute inset-0 bg-white dark:bg-black" />
        <MotionDiv
          className="relative z-10 text-4xl font-bold flex justify-center items-center h-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Hi, I&apos;m Cunoe...
        </MotionDiv>
      </div>
    </MotionDiv>
  );
}
