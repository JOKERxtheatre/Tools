"use client";

import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { motion, useAnimation } from "framer-motion";

type BackgroundAnimationProps = {
  colors?: string[];
  pauseOnMobile?: boolean;
};

export default function BackgroundAnimation({
  colors = ["pink", "lightblue"],
  pauseOnMobile = true,
}: BackgroundAnimationProps) {
  const animationControls = useAnimation();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  useEffect(() => {
    if (pauseOnMobile && isMobile) {
      animationControls.stop();
    } else {
      animationControls.start("animate");
    }
  }, [isMobile, pauseOnMobile, animationControls]);

  return (
    <div className="animation-container">
      {[...Array(2)].map((_, index) => (
        <motion.div
          key={index}
          className={`shape${index + 1}`}
          initial={{
            top: index === 0 ? "22%" : "33%",
            left: index === 0 ? "70%" : "20%",
            width: index === 0 ? "25rem" : "35rem",
            height: index === 0 ? "25rem" : "25rem",
            opacity: 1,
          }}
          animate={animationControls}
        />
      ))}
    </div>
  );
}
