import {
  Badge,
  Box,
  Button,
  InputAdornment,
  SvgIcon,
  TextField,
  Tooltip,
  Typography
} from '@mui/material'
import {
  Apps,
  Close,
  HelpOutline,
  LibraryAdd,
  NotificationsNone,
  Search
} from '@mui/icons-material'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import Workspace from './Menus/Workspaces'
import Recent from './Menus/Recent'
import Starred from './Menus/Starred'
import Templates from './Menus/Templates'
import Profiles from './Menus/Profiles'
import { useState } from 'react'
import ModeSelect from '../ModeSelect/ModeSelect'

const AppBar = () => {
  const [searchValues, setSearchValues] = useState('')

  return (
    <Box
      sx={{
        width: '100%',
        height: (theme) => theme.trello.headerHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2, //đảm bảo khi thu nhỏ vẫn có gap không bị dính nhau
        paddingX: 2,
        overflowX: 'auto', //thu nhỏ bị khoảng trắng nên ẩn đi
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0',
        '&::-webkit-scrollbar-track': { m: 2 } // Xử lý scrollbar bắt đầu cuộn từ phần tử đầu tiên chứ ko phải sát lề
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Apps sx={{ color: 'white' }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <SvgIcon
            component={TrelloIcon}
            inheritViewBox
            fontSize="small"
            sx={{ color: 'white' }}
          />
          <Typography
            variant="body1"
            sx={{
              fontSize: '1.2rem',
              fontWeight: 'bold',
              color: 'white'
            }}
          >
            Trello
          </Typography>
        </Box>

        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            gap: 2
          }}
        >
          <Workspace />
          <Recent />
          <Starred />
          <Templates />
          <Button
            sx={{
              color: 'white',
              border: 'none',
              '&:hover': { border: 'none' }
            }}
            startIcon={<LibraryAdd />}
            variant="outlined"
          >
            Create
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField
          id="outlined-search"
          label="Search..."
          variant="outlined"
          type="text"
          size="small"
          value={searchValues}
          onChange={(e) => setSearchValues(e.target.value)}
          slotProps={{
            input: {
              // thêm icon và đầu tiên bên trong input
              startAdornment: (
                // Phải có InputAdornment để hợp lệ
                <InputAdornment position="start">
                  <Search sx={{ color: 'white' }} fontSize="small" />
                </InputAdornment>
              ),
              // thêm icon cuối bên trong input
              endAdornment: (
                <InputAdornment position="end">
                  <Close
                    fontSize="small"
                    sx={{
                      color: searchValues ? 'white' : 'transparent', // xử lý nếu có searchValues thì mới hiện dấu X để xóa
                      cursor: searchValues ? 'pointer' : 'auto',
                      ml: 0.6
                    }}
                    onClick={() => setSearchValues('')} // xử lý dấu X ở cuối để xóa phần search đi
                  />
                </InputAdornment>
              )
            }
          }}
          sx={{
            minWidth: 12,
            maxWidth: 170,
            // chọn thẻ label - phần nhãn label (cũng là placeholder)
            '& label': { color: 'white' },
            // chọn thẻ input - phần text search
            '& input': { color: 'white' },
            // phần nhãn label khi focus
            '& label.Mui-focused': { color: 'white' },
            // toàn bộ phần thẻ input -> đi vào fieldset là set cho phần bên ngoài của input và xử lý khi hover và khi hover ra
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'white' },
              '&:hover fieldset': { borderColor: 'white' },
              '&.Mui-focused fieldset': { borderColor: 'white' }
            }
          }}
        />

        <ModeSelect />

        <Tooltip title="Notifications">
          <Badge color="warning" variant="dot" sx={{ cursor: 'pointer' }}>
            <NotificationsNone sx={{ color: 'white' }} />
          </Badge>
        </Tooltip>

        <Tooltip title="Help">
          <HelpOutline sx={{ cursor: 'pointer', color: 'white' }} />
        </Tooltip>

        <Profiles />
      </Box>
    </Box>
  )
}

export default AppBar
