// src/lib/constants/breakpoints.ts
export const BREAKPOINTS = {
    sm: '640px',
    md: '768px', 
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
} as const

export const RESPONSIVE_CLASSES = {
    grid: {
        mobile: 'grid-cols-1',
        tablet: 'sm:grid-cols-2 md:grid-cols-2',
        desktop: 'lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'
    },
    spacing: {
        mobile: 'gap-3 p-3',
        desktop: 'sm:gap-4 sm:p-4'
    },
    text: {
        mobile: 'text-sm',
        desktop: 'sm:text-base'
    }
} as const
