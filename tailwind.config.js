/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				},
				theme: {
					primary: {
						DEFAULT: 'hsl(var(--theme-primary))',
						foreground: 'hsl(var(--theme-primary-foreground))',
						hover: 'hsl(var(--theme-primary-hover))'
					},
					accent: {
						DEFAULT: 'hsl(var(--theme-accent))',
						foreground: 'hsl(var(--theme-accent-foreground))',
						hover: 'hsl(var(--theme-accent-hover))'
					},
					success: {
						DEFAULT: 'hsl(var(--theme-success))',
						foreground: 'hsl(var(--theme-success-foreground))'
					},
					warning: {
						DEFAULT: 'hsl(var(--theme-warning))',
						foreground: 'hsl(var(--theme-warning-foreground))'
					},
					error: {
						DEFAULT: 'hsl(var(--theme-error))',
						foreground: 'hsl(var(--theme-error-foreground))'
					},
					info: {
						DEFAULT: 'hsl(var(--theme-info))',
						foreground: 'hsl(var(--theme-info-foreground))'
					},
					surface: {
						DEFAULT: 'hsl(var(--theme-surface))',
						hover: 'hsl(var(--theme-surface-hover))',
						active: 'hsl(var(--theme-surface-active))'
					},
					border: {
						DEFAULT: 'hsl(var(--theme-border))',
						hover: 'hsl(var(--theme-border-hover))'
					},
					text: {
						primary: 'hsl(var(--theme-text-primary))',
						secondary: 'hsl(var(--theme-text-secondary))',
						muted: 'hsl(var(--theme-text-muted))',
						inverse: 'hsl(var(--theme-text-inverse))'
					}
				}
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
}
