module.exports = {
  content: [
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {

    screens: {
      'tablet': '640px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },

    extend: {
      colors: {
        "orange":"fd8100",
        "darkTeal":"#0e6564",
        "teal":"#43a3a2",
        "lightPink":"#ffc5c4",
        "lychee":"#fff7ec",
        "yellow":"#ffba28"
        // Configure your color palette here
      },
    }, 

    

    backgroundImage: {
      'Picture-Background': "uurl('/src/assets/image/background.png')",
      'Orange-Background': "url('/src/assets/image/orange-background.png')",
    },
    
    

    fontFamily: {
      'Poppins': ['Poppins', 'sans-serif'],
      'Lato': ['Lato', 'sans-serif']
    },



    fontSize: {
      '2xl': ['24px', {
        letterSpacing: '-0.01em',
      }],
      '20':'20px',
      '16':'16px',
      '14':'14px',
      '12':'12px',
  

      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      // "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",

      


    },
      
    maxWidth: {
      '2xs': '16rem',   // custom max-width value with a label of "2xs"
      
 
            },
    minWidth: {
      '2xs': '16rem',   // custom max-width value with a label of "2xs"
      
 
            },

    minHeight: {
      'c-md': '24rem',   // custom max-width value with a label of "2xs"
     
  
            },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}