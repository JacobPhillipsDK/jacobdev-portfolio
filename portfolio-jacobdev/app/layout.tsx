import {Bricolage_Grotesque} from "next/font/google";
import {createMetadata} from '@/lib/metadata';
import {metadata as meta} from '@/app/config';
import "./globals.css";
import { GoogleAnalytics } from '@next/third-parties/google'
import Cursor from '@/components/cursor/cursor';

import Footer from '@/components/sections/footer/page'
import {Toaster} from '@/components/ui/sonner';
import Header from "@/components/header/page";
import { TransitionProvider } from '@/components/Motion/transition-provider';

const bricolage_grotesque = Bricolage_Grotesque({subsets: ['latin']});

export const metadata = createMetadata({
    title: {
        absolute: meta.site.title,
        template: `%s | ${meta.site.title}`
    },
    description: meta.site.description,
    twitter: {
        title: meta.site.title,
        description: meta.site.description
    }
});

export default function RootLayout({
                                       children
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
        <body className={`${bricolage_grotesque.className} bg-background text-foreground relative flex min-h-[100dvh] flex-col`}>
            <TransitionProvider speed={2}>
                <Header/>
                <div className="relative min-h-screen bg-background">
                    {children}
                    <Toaster/>
                </div>
                <Footer/>
                <Cursor />
            </TransitionProvider>
        </body>
        <GoogleAnalytics gaId="G-WVT3P9L2YR" />
        </html>
    );
}
