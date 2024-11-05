'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import IconButton from "@/components/icons/iconButton";



export default function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [githubLogoSrc, setGithubLogoSrc] = React.useState<string>('/icons/github-mark-white.svg')
    const [linkedinLogoSrc, setLinkedinLogoSrc] = React.useState<string>('icons/linkedin-white.svg')


    React.useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        setTheme(mediaQuery.matches ? 'dark' : 'light')
    }, [setTheme])

    React.useEffect(() => {
        setGithubLogoSrc(theme === 'dark' ? '/icons/github-mark-white.svg' : '/icons/github-mark.svg')
        setLinkedinLogoSrc(theme === 'dark' ? '/icons/linkedin-white.svg' : '/icons/linkedin.svg')
    }, [theme])

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    return (
        <div className="flex items-center space-x-2">
            <Button
                variant="outline"
                size="icon"
                onClick={toggleTheme}
                className="border-none bg-transparent"
            >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
            </Button>
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
                aria-label="GitHub Profile"
            />
        </div>
    )
}