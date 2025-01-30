import * as React from 'react';


import { IconType } from '../iconType';

type SiFlutterProps = React.ComponentPropsWithoutRef<'svg'> & {
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

const SiFlutter: IconType = React.forwardRef<SVGSVGElement, SiFlutterProps>(function SiFlutter({
                                                                                             title = 'SiFlutter',
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
            viewBox="0 0 64 64"
            ref={ref}
            {...others}
        >
            <title>{title}</title>
            <g transform="matrix(.061615 0 0 .061615 -1.430818 -1.2754)">
                <defs>
                    <path id="A"
                          d="M959.4 500L679.8 779.7l279.6 279.7H639.9L360.2 779.7 639.9 500h319.5zM639.9 20.7L120.6 540l159.8 159.8 679-679.1H639.9z"/>
                </defs>
                <clipPath id="B">
                    <use xlinkHref="#A"/>
                </clipPath>
                <g clipPath="url(#B)">
                    <path d="M360.3 779.7L520 939.5 959.4 500H639.9z" fill="#fafafa"/>
                </g>
                <defs>
                    <path id="C"
                          d="M959.4 500L679.8 779.7l279.6 279.7H639.9L360.2 779.7 639.9 500h319.5zM639.9 20.7L120.6 540l159.8 159.8 679-679.1H639.9z"/>
                </defs>
                <clipPath id="D">
                    <use xlinkHref="#C"/>
                </clipPath>
                <path clipPath="url(#D)" d="M639.9 20.7h319.5l-679 679.1L120.6 540z" fill="#fafafa"/>
                <defs>
                    <path id="E"
                          d="M959.4 500L679.8 779.7l279.6 279.7H639.9L360.2 779.7 639.9 500h319.5zM639.9 20.7L120.6 540l159.8 159.8 679-679.1H639.9z"/>
                </defs>
                <clipPath id="F">
                    <use xlinkHref="#E"/>
                </clipPath>
                <path clipPath="url(#F)" d="M520 939.5l119.9 119.8h319.5L679.8 779.7z" fill="#fafafa"/>
                <defs>
                    <path id="G"
                          d="M959.4 500L679.8 779.7l279.6 279.7H639.9L360.2 779.7 639.9 500h319.5zM639.9 20.7L120.6 540l159.8 159.8 679-679.1H639.9z"/>
                </defs>
                <clipPath id="H">
                    <use xlinkHref="#G"/>
                </clipPath>
                <linearGradient id="I" gradientUnits="userSpaceOnUse" x1="566.635" y1="970.339" x2="685.65"
                                y2="851.324">
                    <stop offset="0" stop-color="#1a237e" stop-opacity=".4"/>
                    <stop offset="1" stop-color="#1a237e" stop-opacity="0"/>
                </linearGradient>
                <path clipPath="url(#H)" d="M757 857.4l-77.2-77.7L520 939.5z" fill="url(#I)"/>
                <defs>
                    <path id="J"
                          d="M959.4 500L679.8 779.7l279.6 279.7H639.9L360.2 779.7 639.9 500h319.5zM639.9 20.7L120.6 540l159.8 159.8 679-679.1H639.9z"/>
                </defs>
                <clipPath id="K">
                    <use xlinkHref="#J"/>
                </clipPath>
                <g clipPath="url(#K)">
                    <path d="M360.282 779.645L520.086 619.84 679.9 779.645 520.086 939.45z" fill="#fafafa"/>
                </g>
                <radialGradient id="L" cx="7824.659" cy="-2855.979" r="5082.889"
                                gradientTransform="matrix(0.25,0,0,-0.25,-1812,-622.5)" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stop-color="#fff" stop-opacity=".1"/>
                    <stop offset="1" stop-color="#fff" stop-opacity="0"/>
                </radialGradient>
                <path
                    d="M959.4 500L679.8 779.7l279.6 279.7H639.9L360.2 779.7 639.9 500h319.5zM639.9 20.7L120.6 540l159.8 159.8 679-679.1H639.9z"
                    fill="url(#L)"/>
            </g>
        </svg>
    )
        ;
});

export {SiFlutter as default, defaultColor};
