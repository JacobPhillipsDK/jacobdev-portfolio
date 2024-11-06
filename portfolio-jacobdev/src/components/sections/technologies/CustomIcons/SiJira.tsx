import * as React from 'react';

// SiPostman

import {IconType} from '../iconType';

type SiJiraProps = React.ComponentPropsWithoutRef<'svg'> & {
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

const SiJira: IconType = React.forwardRef<SVGSVGElement, SiJiraProps>(function SiJira({
                                                                                                      title = 'SiJira',
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
                d="M11.571 11.513H0a5.218 5.218 0 0 0 5.232 5.215h2.13v2.057A5.215 5.215 0 0 0 12.575 24V12.518a1.005 1.005 0 0 0-1.005-1.005zm5.723-5.756H5.736a5.215 5.215 0 0 0 5.215 5.214h2.129v2.058a5.218 5.218 0 0 0 5.215 5.214V6.758a1.001 1.001 0 0 0-1.001-1.001zM23.013 0H11.455a5.215 5.215 0 0 0 5.215 5.215h2.129v2.057A5.215 5.215 0 0 0 24 12.483V1.005A1.001 1.001 0 0 0 23.013 0Z"/>
        </svg>

    )
        ;
});

export {SiJira as default, defaultColor};