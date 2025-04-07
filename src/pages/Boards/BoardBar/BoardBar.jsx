import { Avatar, AvatarGroup, Box, Button, Chip, Tooltip } from '@mui/material'
import {
  AddToDrive,
  Bolt,
  Dashboard,
  FilterList,
  PersonAdd,
  VpnLock
} from '@mui/icons-material'
import { capitalizeFirstLetter } from '~/utils/formatters'

const MENU_STYLE = {
  color: 'white',
  bgcolor: 'transparent',
  border: 'none',
  paddingX: '5px',
  '.MuiSvgIcon-root': {
    color: 'white',
    marginBottom: 0.4
  },
  '&:hover': {
    bgcolor: 'primary.100'
  }
}

const BoardBar = ({ board }) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: (theme) => theme.trello.boardBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2, //đảm bảo khi thu nhỏ vẫn có gap không bị dính nhau
        paddingX: 2,
        overflowX: 'auto', //thu nhỏ bị khoảng trắng nên ẩn đi
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
        '&::-webkit-scrollbar-track': { m: 2 } // Xử lý scrollbar bắt đầu cuộn từ phần tử đầu tiên chứ ko phải sát lề
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Tooltip title={board?.description}>
          <Chip
            icon={<Dashboard />}
            label={board?.title}
            variant="outlined"
            clickable
            sx={MENU_STYLE}
          />
        </Tooltip>
        <Chip
          icon={<VpnLock />}
          label={capitalizeFirstLetter(board?.type)}
          variant="outlined"
          clickable
          sx={MENU_STYLE}
        />
        <Chip
          icon={<AddToDrive />}
          label="Add to Google Drive"
          variant="outlined"
          clickable
          sx={MENU_STYLE}
        />
        <Chip
          icon={<Bolt />}
          label="Automation"
          variant="outlined"
          clickable
          sx={MENU_STYLE}
        />
        <Chip
          icon={<FilterList />}
          label="Filters"
          variant="outlined"
          clickable
          sx={MENU_STYLE}
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          startIcon={<PersonAdd sx={{ mb: 0.3 }} />}
          variant="outlined"
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': { borderColor: 'white' }
          }}
        >
          Invite
        </Button>
        <AvatarGroup
          max={7}
          total={24}
          sx={{
            gap: 1,
            '& .MuiAvatar-root': {
              width: 34,
              height: 34,
              fontSize: '16px',
              color: 'white',
              cursor: 'pointer',
              border: 'none',
              '&:first-of-type': { backgroundColor: '#a4b0be' }
            }
          }}
        >
          <Tooltip title="3Duy">
            <Avatar alt="3Duy" src="" />
          </Tooltip>
          <Tooltip title="3Duy">
            <Avatar alt="3Duy" src="" />
          </Tooltip>
          <Tooltip title="3Duy">
            <Avatar alt="3Duy" src="" />
          </Tooltip>
          <Tooltip title="3Duy">
            <Avatar alt="3Duy" src="" />
          </Tooltip>
          <Tooltip title="3Duy">
            <Avatar alt="3Duy" src="" />
          </Tooltip>
          <Tooltip title="3Duy">
            <Avatar alt="3Duy" src="" />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
