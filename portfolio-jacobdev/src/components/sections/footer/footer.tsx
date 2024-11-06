import React from 'react';
import { metadata as meta } from '@/app/config';
import IconButton from "@/components/icons/iconButton";
import { Container } from '@/components/ui/container';

function Footer() {
    return (
        <Container className="space-y-4">
        <footer
            className="grid w-full shrink-0 grid-cols-3 items-center gap-2 border-t border-border px-4 py-6 sm:gap-4 md:px-6">
            <div className="text-xs text-gray-500 dark:text-gray-400">
                © 2024 {meta.author.name}. All rights reserved.
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center">
                Made With   <span className="text-red-500 px-1 ">❤</span> by <span className=" pl-1 underline">{meta.author.name}</span>
            </div>
            <div className="flex justify-end gap-4 items-center">
                <IconButton
                    iconSrc="/icons/github-mark-white.svg"
                    href="https://github.com/JacobPhillipsDK"
                    variant="outline"
                    size="icon"
                    className="p-0 border-none bg-transparent flex items-center justify-center"
                    aria-label="GitHub Profile"
                />
                <IconButton
                    iconSrc="/icons/linkedin-white.svg"
                    href="https://www.linkedin.com/in/jacobphillips-dk/"
                    variant="outline"
                    size="icon"
                    className="p-0 border-none bg-transparent flex items-center justify-center"
                    aria-label="LinkedIn Profile"
                />
            </div>
        </footer>
        </Container>
    );
}

export default Footer;