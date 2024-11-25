import { Box, Container, useColorScheme } from '@mui/material'
import { DarkMode, LightMode, SettingsBrightness } from '@mui/icons-material'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

const ModeSelect = () => {
  const { mode, setMode } = useColorScheme()

  const handleChange = (e) => {
    setMode(e.target.value)
  }

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="label-select-dark-light-mode">Mode</InputLabel>
      <Select
        labelId="label-select-dark-light-mode"
        id="select-dark-light-mode"
        value={mode}
        label="Mode"
        onChange={handleChange}
      >
        <MenuItem value="light">
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <LightMode fontSize="small" /> Light
          </div>
        </MenuItem>
        <MenuItem value="dark">
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <DarkMode fontSize="small" /> Dark
          </div>
        </MenuItem>
        <MenuItem value="system">
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <SettingsBrightness fontSize="small" /> System
          </div>
        </MenuItem>
      </Select>
    </FormControl>
  )
}

const App = () => {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
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
    </Container>
  )
}

export default App
