import { Box } from '@mui/material'
import ModeSelect from '../ModeSelect'

const AppBar = () => {
  return (
    <Box
      sx={{
        bgcolor: 'primary.light',
        width: '100%',
        height: (theme) => theme.trello.headerHeight,
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <ModeSelect />
    </Box>
  )
}

export default AppBar
