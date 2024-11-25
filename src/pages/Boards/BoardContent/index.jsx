import { Box } from '@mui/material'

const index = () => {
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        width: '100%',
        height: (theme) =>
          `calc(100vh - ${theme.trello.headerHeight} - ${theme.trello.boardBarHeight})`,
        display: 'flex',
        alignItems: 'center'
      }}
    >
      Board Content
    </Box>
  )
}

export default index
