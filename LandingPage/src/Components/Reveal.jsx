import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from 'react-intersection-observer';

export const Reveal = ({ children, width = "fit-content" }) => {
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });

    const slideControls = useAnimation();

    useEffect(() => {
        if (inView) {
            slideControls.start("visible");
        }
    }, [inView, slideControls]);

    return (
        <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 75 },
                    visible: { opacity: 1, y: 0 }
                }}
                initial="hidden"
                animate={slideControls}
                transition={{ duration: 0.5, ease: "easeIn" }}  // using a string for ease, ensure it's supported or change it
                style={{
                    position: "absolute",
                    top: 4,
                    bottom: 4,
                    left: 0,
                    right: 0,
                    backgroundColor: "#09b399",
                    zIndex: 20
                }}
            >
                {children}
            </motion.div>
        </div>
    );
}