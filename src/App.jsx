import { Button, Typography } from '@mui/material'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'
import { AcUnit } from '@mui/icons-material'

function App() {
  return (
    <div>
      <p>3Duy</p>
      <Typography variant="body1" color="text.secondary">
        Nguyễn Ba Duy
      </Typography>
      <Button variant="contained">Click Me</Button>
      <Button variant="text">Hello World</Button>
      <Button variant="outlined">Hello World</Button>
      <Button variant="contained">Hello World</Button>
      <AccessAlarmIcon />
      <AcUnit />
    </div>
  )
}

export default App
