"use client";

import Link from "next/link";
import { Container } from "@/components/cotainer"; // keeping your original import
import IconButton from "@/components/icons/iconButtons";
import * as React from "react";
import { motion } from "motion/react";
import { useHideOnScroll } from "@/hooks/useHideOnScroll";


const Header: React.FC = () => {
  const { hidden, atTop } = useHideOnScroll({ upDelay: 14, downDelay: 14, topEpsilon: 6 });

  return (
    <motion.header
      initial={false}
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ type: "spring", stiffness: 500, damping: 40, mass: 0.6 }}
      className={[
        "sticky top-0 z-50 w-full",
        "backdrop-blur supports-[backdrop-filter]:bg-background/60",
        atTop ? "border-b border-transparent" : "border-b border-white/10",
      ].join(" ")}
    >
      <Container>
        <div className="flex w-full items-center justify-between py-8">
          <Link href="/" className="flex items-center justify-center">
            <span className="text-md font-semibold transition-transform hover:translate-x-1 hover:translate-y-1">
              <u>jacobdev.dk</u>
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {/* <ModeToggle /> */}
              <div className="flex items-center space-x-2">
                <IconButton
                  iconSrc={"/icons/github-mark-white.svg"}
                  href="https://github.com/JacobPhillipsDK"
                  variant="outline"
                  size="icon"
                  className="flex items-center justify-center bg-transparent p-0 border-none"
                  aria-label="GitHub Profile"
                />
                <IconButton
                  iconSrc={"icons/linkedin-white.svg"}
                  href="https://www.linkedin.com/in/jacobphillips-dk/"
                  variant="outline"
                  size="icon"
                  className="flex items-center justify-center bg-transparent p-0 border-none"
                  aria-label="LinkedIn Profile"
                />
                <IconButton
                  iconSrc={"icons/mail.svg"}
                  href="mailto:me@jacobdev.dk"
                  variant="outline"
                  size="icon"
                  className="flex items-center justify-center bg-transparent p-0 border-none"
                  aria-label="Email Address"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </motion.header>
  );
};

export default Header;