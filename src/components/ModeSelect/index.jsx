import { DarkMode, LightMode, SettingsBrightness } from '@mui/icons-material'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useColorScheme } from '@mui/material'

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

export default ModeSelect
