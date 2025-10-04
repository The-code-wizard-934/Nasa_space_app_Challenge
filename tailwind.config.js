/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)" /* slate-400 with opacity */,
        input: "var(--color-input)" /* slate-800 */,
        ring: "var(--color-ring)" /* blue-500 */,
        background: "var(--color-background)" /* slate-900 */,
        foreground: "var(--color-foreground)" /* slate-50 */,
        primary: {
          DEFAULT: "var(--color-primary)" /* blue-800 */,
          foreground: "var(--color-primary-foreground)" /* slate-50 */,
        },
        secondary: {
          DEFAULT: "var(--color-secondary)" /* blue-500 */,
          foreground: "var(--color-secondary-foreground)" /* slate-50 */,
        },
        destructive: {
          DEFAULT: "var(--color-destructive)" /* red-500 */,
          foreground: "var(--color-destructive-foreground)" /* slate-50 */,
        },
        muted: {
          DEFAULT: "var(--color-muted)" /* slate-700 */,
          foreground: "var(--color-muted-foreground)" /* slate-400 */,
        },
        accent: {
          DEFAULT: "var(--color-accent)" /* cyan-500 */,
          foreground: "var(--color-accent-foreground)" /* slate-50 */,
        },
        popover: {
          DEFAULT: "var(--color-popover)" /* slate-800 */,
          foreground: "var(--color-popover-foreground)" /* slate-50 */,
        },
        card: {
          DEFAULT: "var(--color-card)" /* slate-800 */,
          foreground: "var(--color-card-foreground)" /* slate-50 */,
        },
        success: {
          DEFAULT: "var(--color-success)" /* emerald-500 */,
          foreground: "var(--color-success-foreground)" /* slate-50 */,
        },
        warning: {
          DEFAULT: "var(--color-warning)" /* amber-500 */,
          foreground: "var(--color-warning-foreground)" /* slate-900 */,
        },
        error: {
          DEFAULT: "var(--color-error)" /* red-500 */,
          foreground: "var(--color-error-foreground)" /* slate-50 */,
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        heading: ["Inter", "sans-serif"],
        body: ["Source Sans 3", "sans-serif"],
        caption: ["IBM Plex Sans", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      backdropBlur: {
        cosmic: "8px",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.15s ease-out",
        "slide-in": "slide-in 0.3s ease-in-out",
        "pulse-cosmic": "pulse-cosmic 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-in": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        "pulse-cosmic": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      boxShadow: {
        cosmic: "0 4px 6px -1px rgba(0, 0, 0, 0.3)",
        floating: "0 10px 15px -3px rgba(0, 0, 0, 0.4)",
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
      },
      transitionTimingFunction: {
        cosmic: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
        240: "60rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
