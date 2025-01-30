import About from "@/components/sections/about/page"
import Technologies from "@/components/sections/technologies/page"
import Experience from "@/components/sections/experience/page"
import Education from "@/components/sections/education/page"
import Projects from "@/components/sections/projects/page"

// Container import
import {Container} from '@/components/cotainer'


export default function Home() {
    return (
        <main className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-background">
            <Container className="space-y-2 -mt-28">
                <About/>
                <Technologies/>
                <Projects/>
                <Experience/>
                <Education/>
            </Container>
        </main>
    );
}
