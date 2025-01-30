'use client'


import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import ClientSideSelect from './clientside';
import MotionWrap from '@/components/motion-wrap';
import Reveal from '@/components/reveal';
import {
  SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs,
  SiDjango, SiMongodb, SiPostgresql, SiNginx,
  SiPython, SiJavascript, SiTypescript, SiCplusplus,
  SiTensorflow, SiPytorch, SiScikitlearn, SiPandas, SiDocker,
  SiGit, SiJenkins, SiRust, SiLinux, SiFedora, SiLatex, SiOpencv, SiFlask,
} from '@icons-pack/react-simple-icons';

import SiJava from  "@/components/sections/technologies/CustomIcons/SiJava";
import SiFastapi from  "@/components/sections/technologies/CustomIcons/SiFastapi";
import SiPostman from "@/components/sections/technologies/CustomIcons/SiPostman";
import SiFlutter from "@/components/sections/technologies/CustomIcons/SiFlutter";
import SiFirebase from "@/components/sections/technologies/CustomIcons/SiFirebase";
import SiDart from "@/components/sections/technologies/CustomIcons/SiDart";
import SiJira from "@/components/sections/technologies/CustomIcons/SiJira";
import SiCsharp from "@/components/sections/technologies/CustomIcons/SiCsharp";

interface Technology {
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  learning?: boolean;
  tab: string;
  mostused?: boolean;
}

//  background color for svg : #fafafa
// icon color : #27272a


const technologies: Technology[] = [
  { name: 'React', icon: SiReact, tab: 'webdev', mostused: true },
  { name: 'Next.js', icon: SiNextdotjs, tab: 'webdev', mostused: true,learning:true },
  { name: 'Tailwind CSS', icon: SiTailwindcss, tab: 'webdev', mostused: true },
  { name: 'Node.js', icon: SiNodedotjs, tab: 'webdev', mostused: true },
  { name: 'Django', icon: SiDjango, tab: 'webdev' },
  { name: 'MongoDB', icon: SiMongodb, tab: 'webdev' },
  { name: 'PostgreSQL', icon: SiPostgresql, tab: 'webdev', mostused: true, learning: true },
  { name: 'NGINX', icon: SiNginx, tab: 'devops' , learning: true},
  { name: 'Python', icon: SiPython, tab: 'languages', mostused: true },
  { name: 'JavaScript', icon: SiJavascript, tab: 'languages' },
  { name: 'TypeScript', icon: SiTypescript, tab: 'languages', mostused: true },
  { name: 'Java', icon: SiJava, tab: 'languages' },
  { name: 'C++', icon: SiCplusplus, tab: 'languages' },
  { name: 'TensorFlow', icon: SiTensorflow, tab: 'aidata' },
  { name: 'PyTorch', icon: SiPytorch, tab: 'aidata' },
  { name: 'Scikit-learn', icon: SiScikitlearn, tab: 'aidata' },
  { name: 'Pandas', icon: SiPandas, tab: 'aidata' },
  { name: 'Docker', icon: SiDocker, tab: 'devops', mostused: true },
  { name: 'Git', icon: SiGit, tab: 'devops', mostused: true },
  { name: 'Jenkins', icon: SiJenkins, tab: 'devops' , learning:true},
  { name: 'Rust', icon: SiRust, tab: 'languages', learning: true },
  {name:'FastAPI', icon:SiFastapi, tab:'webdev', learning:false},
  {name:'Postman', icon:SiPostman, tab:'devops'},
  {name:'Flutter', icon:SiFlutter, tab:'webdev'},
  {name:'Firebase', icon:SiFirebase, tab:'webdev', learning:false},
  {name:'Dart', icon:SiDart, tab:'languages'},
  {name:'Jira', icon:SiJira, tab:'devops'},
  {name:'C#', icon:SiCsharp, tab:'languages'},
  {name:'Linux', icon:SiLinux, tab:'devops'},
  {name:'Fedora', icon:SiFedora, tab:'devops'},
  {name:'LaTeX', icon:SiLatex, tab:'devops'},
  {name:'OpenCV', icon:SiOpencv, tab:'aidata'},
  {name:'Flask', icon:SiFlask, tab:'webdev'},


];

const tabs = [
  { id: 'mostused', label: 'Most Used' },
  { id: 'languages', label: 'Languages' },
  { id: 'webdev', label: 'Frame Works' },
  { id: 'aidata', label: 'AI & Data Science' },
  { id: 'devops', label: 'DevOps & Tools' }
];

export default function TechnologyTabs() {
  const [mobileSelectedTab, setMobileSelectedTab] = useState<string>('mostused');

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

        {/* Desktop Tab Component */}
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
          <ClientSideSelect
              tabs={tabs}
              activeTab={mobileSelectedTab}
              setActiveTab={setMobileSelectedTab}
          />
          <TechnologyGrid tabId={mobileSelectedTab} />
        </div>

        <div className="mt-4 flex items-center pb-6 lg:mt-6 lg:pb-8">
          <div className="flex items-center space-x-2">
            <div className="h-4 w-4 rounded-full bg-green-500 sm:h-3 sm:w-3 lg:h-4 lg:w-4"></div>
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
                    className="flex flex-col items-center space-y-2"
                >
                  <div
                      className={`group relative flex aspect-square w-full items-center justify-center rounded-lg bg-muted p-2 transition-all duration-300 hover:scale-105 sm:p-3 lg:p-4 ${
                          tech.learning ? 'ring-4 ring-green-500 ring-offset-2 ring-offset-background' : ''
                      }`}
                  >
                    <tech.icon className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12" />
                    <span className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/75 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 sm:text-sm">
                  {tech.name}
                </span>
                  </div>
                  <span className="text-center text-xs font-medium sm:text-sm">
                {tech.name}
              </span>
                </div>
            ))}
          </div>
        </CardContent>
      </Card>
  );
}
