import * as React from 'react';


import { IconType } from '../iconType';

type SiFastapiProps = React.ComponentPropsWithoutRef<'svg'> & {
    /**
     * The title provides an accessible short text description to the SVG
     */
    title?: string;
    /**
     * Hex color or color name or "default" to use the default hex for each icon
     */
    color?: string;
    /**
     * The size of the Icon.
     */
    size?: string | number;
}

const defaultColor = '#05998b';

const SiFastapi: IconType = React.forwardRef<SVGSVGElement, SiFastapiProps>(function SiFastapi({
                                                                                             title = 'SiFastapi',
                                                                                             color = 'currentColor',
                                                                                             size = 24,
                                                                                             ...others
                                                                                         }, ref) {
    if (color === 'default') {
        color = defaultColor;
    }

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            fill={color}
            viewBox='0 0 154 154'
            ref={ref}
            {...others}
        >
            <title>{title}</title>
            <circle cx="77" cy="77" fill="#FFFFFFFF" r="77"/>
            <path d="M81.375 18.667l-38.75 70H77.5l-3.875 46.666 38.75-70H77.5z" fill="#27272AFF"/>
        </svg>
    )
        ;
});

export {SiFastapi as default, defaultColor};
