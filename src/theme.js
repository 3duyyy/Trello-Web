import { cyan, deepOrange, orange, teal } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data'
  },
  trello: {
    headerHeight: '48px',
    boardBarHeight: '58px'
  },
  colorSchemes: {
    light: {
      palette: {
        primary: teal,
        secondary: deepOrange
      }
    },
    dark: {
      palette: {
        primary: cyan,
        secondary: orange
      }
    }
  }
})

export default theme
