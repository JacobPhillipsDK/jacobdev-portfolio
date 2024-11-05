import React from 'react';
import MotionWrap from '@/components/motion-wrap';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowUpRightIcon } from 'lucide-react';
import TextReveal from '@/components/motion/text-reveal';

function About() {
  return (
      <MotionWrap className="w-full pt-28 lg:pt-28" id="about">
          <div className="flex items-center gap-4 px-4">
              <div className="relative w-32 h-32">
                  <Image
                      src="/Github Profile Picture.png"
                      alt="Picture of my GitHub profile picture"
                      fill
                      style={{objectFit: 'cover'}}
                      className="rounded-full"
                  />
              </div>
              <h2 className="text-4xl font-bold leading-tight tracking-tighter sm:text-5xl md:text-5xl lg:text-6xl">
                  <TextReveal>Hey, I'm <span className="text-[#22c55e]">Jacob</span></TextReveal>
              </h2>
          </div>
          <p className="text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed px-4 mt-4">
              <TextReveal>
                  I love working on web applications, automation, and network solutions.<br/>
            In my free time, I enjoy building Raspberry Pi projects, solving LeetCode challenges, and working on
            personal projects.
          </TextReveal>
        </p>
        <div className="flex gap-2 px-4 mt-4">
          <Button asChild variant={'outline'}>
            <a href="resume.pdf" target="_blank">
              View Resume <ArrowUpRightIcon className="ml-2 size-5" />
            </a>
          </Button>
          <Button asChild>
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </MotionWrap>
  );
}

export default About;
