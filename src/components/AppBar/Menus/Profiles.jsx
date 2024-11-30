import {
  Check,
  ExpandMore,
  Logout,
  PersonAdd,
  Settings
} from '@mui/icons-material'
import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Tooltip
} from '@mui/material'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'

const Profiles = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ padding: 0 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar
            sx={{ width: 34, height: 34 }}
            alt="D"
            src="https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-6/465140251_1927415607778028_5850506606264726671_n.jpg?stp=cp6_dst-jpg&_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEpiFwzON8wwf6P4d9XrIz7-WVDZhKzuJz5ZUNmErO4nMJC5-hCDveZjQY3gIq5SClEp13l-NLUCG2LQ18qRShM&_nc_ohc=aJhDV7NhHaoQ7kNvgGsM6YY&_nc_zt=23&_nc_ht=scontent.fhan20-1.fna&_nc_gid=AQuawGg3UEi2PHkvzSOgMAz&oh=00_AYBaWoIOxdJShJ4trx8pUXTU_ytriMPLrtu3WS4fJPnnLQ&oe=674F82EA"
          />
        </IconButton>
      </Tooltip>
      <Menu
        id="demo-positioned-menu-profiles"
        aria-labelledby="demo-positioned-button-profiles"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar sx={{ height: '28px', width: '28px', marginRight: 2 }} />
          Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar sx={{ height: '28px', width: '28px', marginRight: 2 }} /> My
          account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  )
}

export default Profiles
