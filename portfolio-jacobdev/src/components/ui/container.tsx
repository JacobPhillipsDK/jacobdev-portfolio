import React from 'react'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
    className?: string
    as?: keyof JSX.IntrinsicElements
}

export function Container({
                              children,
                              className = '',
                              as: Component = 'div',
                              ...props
                          }: ContainerProps) {
    return (
        <Component
            className={`relative mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 ${className}`}
            {...props}
        >
            {children}
        </Component>
    )
}