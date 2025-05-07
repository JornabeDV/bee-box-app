const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      screens: {
        'desktop': '1440px',
      },
      borderRadius: {
        "theme-sm": '4px'
      },
      boxShadow: {
        "effusive": "rgba(0, 0, 0, 0.38) 0px 2px 8px 4px"
      },
      fontFamily: {
        source: 'Source Sans Pro',
        sourceSemiBold: 'Source-Sans-SemiBold',
        sourceBoldItalic: 'Source-Sans-Bold-Italic',
        robotoBlack: 'Roboto-Black',
        sourceBold: 'Source-Sans-Bold',
        sourceSerif: 'Source-Serif',
      },
      colors: {
        bee: '#F7CB00',
        primary: '#EDEEC0',
        secondary: '#F56E0E',
        dark: 'var(--color-secondary)',
        light: '#EBEBEB',
        darkYellow: '#433E0E',
        greenGray: '#7C9082',
        'bg-button-inactive': '#7C90821A',
        'bg-button-active': '#F56E0E1A',
        'bg-button-active-red': '#F444011A',
        'bg-button-active-blue': '#5DC4FE1A',
        'button-red': '#FE895D',
        'button-blue': '#5DC4FE',
        gold: '#D59754',
        silver: '#EEF0F3',
        bgLight: '#E8E9EB',
        borderline: '#343437',
        skulls: '#727272',
        lightGray: 'rgba(255, 255, 255, 0.6)',
        error: '#F53D2C',
        redTeam: '#FF3F00',
        blueTeam: '#4B94DD',
        darkest: '#141416',
        yellowGreen: '#D4E157',
        borderTable: 'var(--border-table)',
        'player-1': 'var(--player-1-color-hex)',
        'player-2': 'var(--player-2-color-hex)',
        'player-3': 'var(--player-3-color-hex)',
        'player-4': 'var(--player-4-color-hex)',
        'player-5': 'var(--player-5-color-hex)',
        'bomb-red': 'rgb(255, 63, 1)',
        'theme-borders': 'var(--color-border)',
        'success-green': '#68F565',
        'fail-red': '#F56565',
        'dark-gray': '#777676',
        'blueish': '#322d46',
        'hover': 'var(--text-hover)',
        'idle-yellow': '#FFC800',
        'light-orange': '#F5bE9E',
        'admin-purple': '#A020F0',
        'primary-text': 'var(--color-text)'
      },
      fontSize: {
        h1: '2.75rem',
        h2: '2.125rem',
        h3: '2rem',
        h4: '1.75rem',
        pMobile: '0.625rem'

      },
      keyframes: {
        spin: {
          "0%": { transform: "rotate(0deg);" },
          "100%": { transform: "rotate(360deg);" }
        }
      }
    }
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/container-queries"),
    // require("@tailwindcss/forms"),
    plugin(({ addVariant, addUtilities, matchUtilities, theme }) => {
      addVariant("svg", ["& svg"]);
      addVariant("hfa", ["&:hover", "&:focus", "&:active"]);
      addVariant("hfwa", ["&:hover", "&:focus", "&:focus-within", "&:active"]);
      addVariant("hfwaa", ["&:hover", "&:focus", "&:focus-within", "&:active", "&.active"]);
      addVariant("hfva", ["&:hover", "&:focus", "&:focus-visible", "&:active"]);
      addVariant("ha", ["&:hover", "&:active"]);
      addVariant("hf", ["&:hover", "&:focus-visible"]);
      addVariant("ac", ["&.active"]);
      addVariant("b", ["&::before"]);
      addVariant("a", ["&::after"]);
      addVariant("group-hfa", [".group:hover &", ".group:focus &", ".group:active &"]);
      addVariant("group-hf", [".group:hover &", ".group:focus &"]);
      addVariant("group-ac", [".group.active &"]);
      addVariant("group-hfva", [
        ".group:hover &",
        ".group:focus &",
        ".group:focus-visible &",
        ".group:active &",
      ]);
      addVariant("group-hfwa", [
        ".group:hover &",
        ".group:focus &",
        ".group:focus-within &",
        ".group:active &",
      ]);
    })
  ]
}