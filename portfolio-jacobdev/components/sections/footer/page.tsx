import React from "react"
import { metadata as meta } from "@/app/config"
import IconButton from "@/components/icons/iconButtons"
import { Container } from "@/components/cotainer"

function Footer() {
    return (
        <Container className="space-y-4">
            <footer className="grid w-full grid-cols-1 xl:grid-cols-3 items-center gap-4 border-t border-border px-4 py-6 xl:px-6">
                <div className="text-xs text-gray-500 dark:text-gray-400 text-center xl:text-left justify-self-center xl:justify-self-start">
                    © {new Date().getFullYear()} {meta.author.name}. All rights reserved.
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center font-bold justify-self-center">
                    Made with <span className="text-red-500 px-1">❤</span> by{" "}
                    <span className="pl-1">{meta.author.name}</span>
                </div>
                <div className="flex gap-4 items-center justify-center xl:justify-self-end">
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
                    <IconButton
                        iconSrc="icons/mail.svg"
                        href="mailto:me@jacobdev.dk"
                        variant="outline"
                        size="icon"
                        className="p-0 border-none bg-transparent flex items-center justify-center"
                        aria-label="Email Address"
                    />
                </div>
            </footer>
        </Container>
    )
}

export default Footer
