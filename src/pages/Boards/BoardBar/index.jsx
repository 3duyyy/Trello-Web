import { Box } from '@mui/material'

const BoardBar = () => {
  return (
    <Box
      sx={{
        bgcolor: 'primary.dark',
        width: '100%',
        height: (theme) => theme.trello.boardBarHeight,
        display: 'flex',
        alignItems: 'center'
      }}
    >
      Board Bar
    </Box>
  )
}

export default BoardBar
