'use client'

import React from 'react';
import Link from '@/components/motion/link';
import { metadata as meta } from '@/app/config';
import { useTheme } from 'next-themes';
import { footer } from '@/components/sections/footer/config';
import IconButton from "@/components/icons/iconButton";

function Footer() {
    const { theme, setTheme } = useTheme();
    const [githubLogoSrc, setGithubLogoSrc] = React.useState<string>('/icons/github-mark-white.svg');
    const [linkedinLogoSrc, setLinkedinLogoSrc] = React.useState<string>('icons/linkedin-white.svg');

    React.useEffect(() => {
        setGithubLogoSrc(theme === 'dark' ? '/icons/github-mark-white.svg' : '/icons/github-mark.svg');
        setLinkedinLogoSrc(theme === 'dark' ? '/icons/linkedin-white.svg' : '/icons/linkedin.svg');
    }, [theme]);

    return (
        <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t border-border px-4 py-6 sm:flex-row md:px-6">
            <p className="text-xs text-gray-500 dark:text-gray-400">
                © 2024 {meta.author.name}. All rights reserved.
            </p>
            <IconButton
                iconSrc={githubLogoSrc}
                href="https://github.com/JacobPhillipsDK"
                variant="outline"
                size="icon"
                className="p-0 border-none bg-transparent flex items-center justify-center"
                aria-label="GitHub Profile"
            />
            <IconButton
                iconSrc={linkedinLogoSrc}
                href="https://www.linkedin.com/in/jacobphillips-dk/"
                variant="outline"
                size="icon"
                className="p-0 border-none bg-transparent flex items-center justify-center"
                aria-label="LinkedIn Profile"
            />
            {/*<nav className="flex gap-4 sm:ml-auto sm:gap-6">*/}
            {/*    {footer.map((link, index) => {*/}
            {/*        const { title, href } = link;*/}
            {/*        return (*/}
            {/*            <Link*/}
            {/*                className="text-xs underline-offset-4 hover:underline"*/}
            {/*                href={href}*/}
            {/*                key={`l_${index}`}*/}
            {/*            >*/}
            {/*                {title}*/}
            {/*            </Link>*/}
            {/*        );*/}
            {/*    })}*/}
            {/*</nav>*/}
        </footer>
    );
}

export default Footer;