import React from 'react'

type AsProps<T extends React.ElementType> = {
    as?: T;
}

type PropsToOmit<T extends React.ElementType, P> = keyof (AsProps<T> & P)

type PolymorphicComponentProp<
  T extends React.ElementType,
  Props = object
> = React.PropsWithChildren<Props & AsProps<T>> &
    Omit<React.ComponentPropsWithoutRef<T>, PropsToOmit<T, Props>>;

interface ContainerProps {
    className?: string
}

export function Container<T extends React.ElementType = 'div'>({
                                                                   children,
                                                                   className = '',
                                                                   as,
                                                                   ...props
                                                               }: PolymorphicComponentProp<T, ContainerProps>) {
    const Component = as || 'div'
    return (
        <Component
            className={`relative mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 ${className}`}
            {...props}
        >
            {children}
        </Component>
    )
}