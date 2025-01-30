'use client';

import React from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation';

interface IconButtonProps extends React.ComponentProps<typeof Button> {
    iconSrc: string
    href?: string
    iconSize?: number
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
    ({ iconSrc, href, iconSize = 24, className, onClick, ...props }, ref) => {
        const router = useRouter();

        const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            if (href) {
                e.preventDefault();
                router.push(href);
            }
            onClick?.(e);
        };

        return (
            <Button
                ref={ref}
                className={`p-0 flex items-center justify-center ${className || ''}`}
                onClick={handleClick}
                {...props}
            >
                <Image
                    src={iconSrc}
                    alt=""
                    width={iconSize}
                    height={iconSize}
                    className="m-0"
                    aria-hidden="true"
                />
            </Button>
        )
    }
)

IconButton.displayName = 'IconButton'

export default IconButton