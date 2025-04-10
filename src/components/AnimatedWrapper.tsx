import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { ReactNode } from "react";

interface AnimatedWrapperProps {
  children: ReactNode;
  from?: "bottom" | "top" | "left" | "right" | "fade";
}

function AnimatedWrapper({
  children,
  from = "bottom",
}: AnimatedWrapperProps) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setStartAnimation(true);
      }, 300); // 1-second delay
      return () => clearTimeout(timer);
    }
  }, [inView]);

  useEffect(() => {
    if (startAnimation) {
      controls.start({ opacity: 1, x: 0, y: 0 });
    }
  }, [startAnimation, controls]);

  const initialAnimation = () => {
    switch (from) {
      case "bottom":
        return { opacity: 0, y: 50 };
      case "top":
        return { opacity: 0, y: -50 };
      case "left":
        return { opacity: 0, x: -50 };
      case "right":
        return { opacity: 0, x: 50 };
      default:
        return { opacity: 0 };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={initialAnimation()}
      animate={controls}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
}

export default AnimatedWrapper;
