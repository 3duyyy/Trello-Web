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
            <Avatar
              alt="3Duy"
              src="https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-6/465140251_1927415607778028_5850506606264726671_n.jpg?stp=cp6_dst-jpg&_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEpiFwzON8wwf6P4d9XrIz7-WVDZhKzuJz5ZUNmErO4nMJC5-hCDveZjQY3gIq5SClEp13l-NLUCG2LQ18qRShM&_nc_ohc=aJhDV7NhHaoQ7kNvgGsM6YY&_nc_zt=23&_nc_ht=scontent.fhan20-1.fna&_nc_gid=AQuawGg3UEi2PHkvzSOgMAz&oh=00_AYBaWoIOxdJShJ4trx8pUXTU_ytriMPLrtu3WS4fJPnnLQ&oe=674F82EA"
            />
          </Tooltip>
          <Tooltip title="3Duy">
            <Avatar
              alt="3Duy"
              src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-6/457507890_1877018326151090_2516425372482766944_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeGuxoKeMp1cKgGlakXewnRg1YNNEoqIi7vVg00SioiLu_5PWrxSxwPiLhe728rVwURg8J6pe8HcFMrHkFs45GMs&_nc_ohc=wBvc3vB22PgQ7kNvgGZDj_q&_nc_zt=23&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AmLQJPQUsguXa7erH9oP5aR&oh=00_AYChzr54jn2-iDAiDMYadRfE2urkG4H8rDAAxbb4UI5roA&oe=674F88DF"
            />
          </Tooltip>
          <Tooltip title="3Duy">
            <Avatar
              alt="3Duy"
              src="https://scontent.fhan2-4.fna.fbcdn.net/v/t39.30808-6/453397364_1853364085183181_916081157010932949_n.jpg?stp=cp6_dst-jpg&_nc_cat=105&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeGlqQrSuF78FIEmnm82Nbm51kMlw0aiiCXWQyXDRqKIJRNcJNywckF5t-IEz1U0chPzM8KboObdbbBKZW4Efr5E&_nc_ohc=oUkZ1-WuJp0Q7kNvgHv42d-&_nc_zt=23&_nc_ht=scontent.fhan2-4.fna&_nc_gid=A5jKvNSsnZIdOmHfTthYhsa&oh=00_AYAsGTzzg95MGaUccME_viZR1OR0wR43ANbx7pVD6m1UBA&oe=674F76AA"
            />
          </Tooltip>
          <Tooltip title="3Duy">
            <Avatar
              alt="3Duy"
              src="https://scontent.fhan2-4.fna.fbcdn.net/v/t39.30808-6/448155632_1822464158273174_8806038129791070669_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeG21AO2-DddycaiWWvQfdpVj0uhmJykEFOPS6GYnKQQU1ayHBVId7u10X6YkeE0FDNDicukvvhDG_bf9mSlehEJ&_nc_ohc=_TpVCAed7fIQ7kNvgHoQH2f&_nc_zt=23&_nc_ht=scontent.fhan2-4.fna&_nc_gid=AvjofeupegPAqYaet6E8E0W&oh=00_AYAZJnrVQnhR_XfVqUcoqwIbnR7TtPVwrQK1tLrfHcHd9Q&oe=674F7F0B"
            />
          </Tooltip>
          <Tooltip title="3Duy">
            <Avatar
              alt="3Duy"
              src="https://scontent.fhan2-4.fna.fbcdn.net/v/t39.30808-6/429673603_1757929058060018_2990581267260821107_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeF3zSuoJ-q0u2D8ratKxc0grwMp6jLj7NmvAynqMuPs2dWb11y24tr9ezt_-SJIsT8iAciB3s86aynTSxO4Xnir&_nc_ohc=6vRBUri14QgQ7kNvgFyQnBp&_nc_zt=23&_nc_ht=scontent.fhan2-4.fna&_nc_gid=A9DFk8A0NdH5ouT3MSem0cB&oh=00_AYDW97Of0Cbb9JB0lJMhUJUSp-B4QBkd8LwTTYnf7zkG3w&oe=674F86C8"
            />
          </Tooltip>
          <Tooltip title="3Duy">
            <Avatar
              alt="3Duy"
              src="https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-6/310297363_1444725932713667_3303886835298166811_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeFY-tmt4NA3B06ZONXoKfllyRto1GIDVvTJG2jUYgNW9Bw4o1OhRfMOBQg-SxwRj9tXUlst1N2E30ZD2R03N08M&_nc_ohc=BOQfEIReR_sQ7kNvgEti53m&_nc_zt=23&_nc_ht=scontent.fhan20-1.fna&_nc_gid=AyeWETZ9QJHRWk3TX4j-f1Q&oh=00_AYCoHOYduLj8NjnRF796H6VhmjjkVHxjNjJfwiGCjQa7JA&oe=674F5258"
            />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
