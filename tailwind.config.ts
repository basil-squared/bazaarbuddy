import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      colors: {
        mocha: {
          rosewater: "hsl(var(--mocha-rosewater))",
          flamingo: "hsl(var(--mocha-flamingo))",
          pink: "hsl(var(--mocha-pink))",
          mauve: "hsl(var(--mocha-mauve))",
          red: "hsl(var(--mocha-red))",
          maroon: "hsl(var(--mocha-maroon))",
          peach: "hsl(var(--mocha-peach))",
          yellow: "hsl(var(--mocha-yellow))",
          green: "hsl(var(--mocha-green))",
          teal: "hsl(var(--mocha-teal))",
          sky: "hsl(var(--mocha-sky))",
          sapphire: "hsl(var(--mocha-sapphire))",
          blue: "hsl(var(--mocha-blue))",
          lavender: "hsl(var(--mocha-lavender))",
          text: "hsl(var(--mocha-text))",
          subtext1: "hsl(var(--mocha-subtext1))",
          subtext0: "hsl(var(--mocha-subtext0))",
          overlay2: "hsl(var(--mocha-overlay2))",
          overlay1: "hsl(var(--mocha-overlay1))",
          overlay0: "hsl(var(--mocha-overlay0))",
          surface2: "hsl(var(--mocha-surface2))",
          surface1: "hsl(var(--mocha-surface1))",
          surface0: "hsl(var(--mocha-surface0))",
          base: "hsl(var(--mocha-base))",
          mantle: "hsl(var(--mocha-mantle))",
          crust: "hsl(var(--mocha-crust))",
        },
      },
    },
  },
};
export default config;