import {
    Header,
    About,
    Projects,
    Experience,
  Education
} from '@/components/sections';
import Technologies from '@/components/sections/technologies/Technologies';
import Cursor from '@/components/cursor/cursor';
import { Container } from '@/components/ui/container';
import React from "react";

export default function Home() {
    return (
        <div className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-background">
            <Header />
                <main className="flex-1 relative z-10">
                <Container className="space-y-4">
                    <About/>
                    <Technologies/>
                    <Projects/>
                    <Experience/>
                    <Education/>
                </Container>
            </main>
            <Cursor/>
        </div>
    );
}