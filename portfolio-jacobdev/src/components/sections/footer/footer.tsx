import React from "react"
import { metadata as meta } from "@/app/config"
import IconButton from "@/components/icons/iconButton"
import { Container } from "@/components/ui/container"

function Footer() {
    return (
        <Container className="space-y-4">
            <footer className="flex flex-col screen-950:flex-row items-center justify-between gap-4 border-t border-border px-4 py-6 screen-950:px-6">
                <div className="text-xs text-gray-500 dark:text-gray-400 text-center screen-950:text-left">
                    © {new Date().getFullYear()} {meta.author.name}. All rights reserved.
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center font-bold">
                    Made & Hosted With <span className="text-red-500 px-1">❤</span> by{" "}
                    <span className="pl-1">{meta.author.name}</span>
                </div>
                <div className="flex justify-center screen-950:justify-end gap-4 items-center">
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
