import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import ClientSideSelect from './clientside';
import MotionWrap from '@/components/motion-wrap';
import TextReveal from '@/components/motion/text-reveal';
import React from 'react';
import Reveal from '@/components/reveal';

interface Technology {
  name: string;
  icon: string;
  learning?: boolean;
  tab: string;
  mostused?: boolean;
}

const technologies: Technology[] = [
  { name: 'React', icon: 'react.svg', learning: true, tab: 'webdev', mostused: true },
  { name: 'Next.js', icon: 'nextjs.svg', tab: 'webdev', mostused: true },
  { name: 'Tailwind CSS', icon: 'tailwind.svg', tab: 'webdev', mostused: true },
  { name: 'CSS', icon: 'css.svg', learning: true, tab: 'webdev' },
  { name: 'Node.js', icon: 'nodejs.svg', learning: true, tab: 'webdev', mostused: true },
  { name: 'Django', icon: 'django.svg', tab: 'webdev' },
  { name: 'MongoDB', icon: 'mongodb.svg', tab: 'webdev' },
  { name: 'PostgreSQL', icon: 'postgresql.svg', tab: 'webdev' },
  { name: 'Bootstrap', icon: 'bootstrap.svg', tab: 'webdev' },
  { name: 'NGINX', icon: 'nginx.svg', tab: 'devops' },
  { name: 'Python', icon: 'python.svg', tab: 'languages', mostused: true },
  { name: 'JavaScript', icon: 'javascript.svg', tab: 'languages', mostused: true },
  { name: 'TypeScript', icon: 'typescript.svg', tab: 'languages', mostused: true },
  { name: 'Java', icon: 'java.svg', tab: 'languages' },
  { name: 'C++', icon: 'cpp.svg', tab: 'languages' },
  { name: 'TensorFlow', icon: 'tensorflow.svg', tab: 'aidata' },
  { name: 'PyTorch', icon: 'pytorch.svg', tab: 'aidata' },
  { name: 'Scikit-learn', icon: 'scikit-learn.svg', tab: 'aidata' },
  { name: 'Pandas', icon: 'pandas.svg', tab: 'aidata' },
  { name: 'Docker', icon: 'docker.svg', tab: 'devops', mostused: true },
  { name: 'Git', icon: 'git.svg', tab: 'devops', mostused: true },
  { name: 'Jenkins', icon: 'jenkins.svg', tab: 'devops' },

];

const tabs = [
  { id: 'mostused', label: 'Most Used' },
  { id: 'languages', label: 'Languages' },
  { id: 'webdev', label: 'Web Dev' },
  { id: 'aidata', label: 'AI & Data Science' },
  { id: 'devops', label: 'DevOps & Tools' }
];

export default function TechnologyTabs() {
  return (
      <MotionWrap className="w-full py-16 lg:py-16" id="technologies">
        <div className="flex w-full flex-col items-center justify-center pb-5 text-center lg:flex-row lg:justify-between lg:text-left">
          <div className="flex flex-col items-center lg:items-start">
            <Reveal>
              <h2 className="text-4xl font-bold leading-tight tracking-tighter sm:text-5xl md:text-5xl md:leading-tight lg:text-6xl lg:leading-tight">
                My
              </h2>
            </Reveal>
            <Reveal>
              <h2 className="-mt-2 text-4xl font-bold leading-tight tracking-tighter sm:text-5xl md:text-5xl md:leading-tight lg:text-6xl lg:leading-tight">
                Technologies
              </h2>
            </Reveal>
          </div>
          <p className="mt-4 hidden text-gray-500 dark:text-gray-400 lg:mt-0 lg:block lg:w-[35%]">
            Here are what I&apos;m currently learning and the technologies I use the
            most.
          </p>
        </div>
        <div className="hidden lg:block">
          <Tabs defaultValue="mostused" className="w-full">
            <TabsList className="grid w-full grid-cols-2 text-sm sm:grid-cols-3 sm:text-base lg:grid-cols-5 lg:text-lg">
              {tabs.map((tab) => (
                  <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    {tab.label}
                  </TabsTrigger>
              ))}
            </TabsList>
            {tabs.map((tab) => (
                <TabsContent key={tab.id} value={tab.id}>
                  <TechnologyGrid tabId={tab.id} />
                </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Mobile Select Dropdown */}
        <div className="lg:hidden">
          <ClientSideSelect tabs={tabs} />
          <TechnologyGrid tabId="mostused" />
        </div>

        <div className="mt-4 flex items-center pb-6 lg:mt-6 lg:pb-8">
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-green-500 sm:h-3 sm:w-3 lg:h-4 lg:w-4"></div>
            <span className="text-sm sm:text-base lg:text-lg">
            Currently Learning
          </span>
          </div>
        </div>
      </MotionWrap>
  );
}

interface TechnologyGridProps {
  tabId: string;
}

function TechnologyGrid({ tabId }: TechnologyGridProps) {
  const filteredTechnologies = technologies.filter(tech =>
      tabId === 'mostused' ? tech.mostused : tech.tab === tabId
  );

  return (
      <Card className="w-full max-w-none">
        <CardContent className="w-full p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 sm:gap-6 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10">
            {filteredTechnologies.map((tech) => (
                <div
                    key={tech.name}
                    className={`group relative flex aspect-square items-center justify-center rounded-lg bg-muted p-2 transition-all duration-300 hover:scale-105 sm:p-3 lg:p-4 ${tech.learning ? 'ring-2 ring-green-500 ring-offset-2 ring-offset-background' : ''}`}
                >
                  <Image
                      src={`/icons/${tech.icon}`}
                      alt={tech.name}
                      width={48}
                      height={48}
                      className="h-8 w-8 object-contain sm:h-10 sm:w-10 lg:h-12 lg:w-12"
                  />
                  <span className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/75 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 sm:text-sm">
                {tech.name}
              </span>
                </div>
            ))}
          </div>
        </CardContent>
      </Card>
  );
}
