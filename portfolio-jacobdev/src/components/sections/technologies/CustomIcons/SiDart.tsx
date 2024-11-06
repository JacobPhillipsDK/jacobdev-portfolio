import * as React from 'react';

// SiPostman

import {IconType} from '../iconType';

type SiDartProps = React.ComponentPropsWithoutRef<'svg'> & {
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

const defaultColor = '#f58219';

const  SiDart: IconType = React.forwardRef<SVGSVGElement, SiDartProps>(function  SiDart({
                                                                                                      title = 'SiDart',
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
            viewBox="0 0 24 24"
            ref={ref}
            {...others}
        >
            <title>{title}</title>
            <path
                d="M4.105 4.105S9.158 1.58 11.684.316a3.079 3.079 0 0 1 1.481-.315c.766.047 1.677.788 1.677.788L24 9.948v9.789h-4.263V24H9.789l-9-9C.303 14.5 0 13.795 0 13.105c0-.319.18-.818.316-1.105l3.789-7.895zm.679.679v11.787c.002.543.021 1.024.498 1.508L10.204 23h8.533v-4.263L4.784 4.784zm12.055-.678c-.899-.896-1.809-1.78-2.74-2.643-.302-.267-.567-.468-1.07-.462-.37.014-.87.195-.87.195L6.341 4.105l10.498.001z"/>
        </svg>

    )
        ;
});

export {SiDart as default, defaultColor};