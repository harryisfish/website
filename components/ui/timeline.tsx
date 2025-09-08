"use client";
import {
  useScroll,
  useTransform,
  motion,
  Variants,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { MotionDiv, MotionH2, MotionP, MotionH3 } from "./motion";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

const stagger: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-white dark:bg-neutral-950 md:px-10"
      style={{ fontFamily: "'LXGW Bright Medium', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif" }}
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
        <MotionH2 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-2xl md:text-5xl mb-6 text-black dark:text-white max-w-4xl font-bold" 
          style={{ fontFamily: "'LXGW Bright Medium', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",  }}
        >
          Changelog from my journey
        </MotionH2>
        {(() => {
          const startYear = 2003;
          const currentYear = new Date().getFullYear();
          const years = currentYear - startYear;
          return (
            <MotionP
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-neutral-700 dark:text-neutral-300 text-base md:text-lg max-w-sm font-semibold"
              style={{
                fontFamily:
                  "'LXGW Bright Medium', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
              }}
            >
              My changelog began {years} years ago, and every step since has been a line in this unfolding journey.
            </MotionP>
          );
        })()}
      </div>

      <MotionDiv 
        ref={ref} 
        className="relative max-w-7xl mx-auto pb-20"
        initial="initial"
        animate="animate"
        variants={stagger}
      >
        {data.map((item, index) => (
          <MotionDiv
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
            variants={fadeInUp}
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
              </div>
              <MotionH3 
                className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-neutral-500 dark:text-neutral-500" 
                style={{ fontFamily: "'LXGW Bright Medium', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",  }}
                variants={fadeInUp}
              >
                {item.title}
              </MotionH3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <MotionH3 
                className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500" 
                style={{ fontFamily: "'LXGW Bright Medium', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",  }}
                variants={fadeInUp}
              >
                {item.title}
              </MotionH3>
              <MotionDiv variants={fadeInUp}>
                {item.content}
              </MotionDiv>
            </div>
          </MotionDiv>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </MotionDiv>
    </div>
  );
};
