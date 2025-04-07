import {
  AddCard,
  Close,
  Cloud,
  ContentCopy,
  ContentCut,
  ContentPaste,
  DeleteForever,
  DragHandle,
  ExpandMore
} from '@mui/icons-material'
import {
  Box,
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
  Typography
} from '@mui/material'
import { useState } from 'react'
import ListCards from './ListCards/ListCards'
// dndkit
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { toast } from 'react-toastify'
import { useConfirm } from 'material-ui-confirm'
import { cloneDeep } from 'lodash'
import { createNewCardAPI, deleteColumnDetailsAPI } from '~/apis'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCurrentActiveBoard,
  updateCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'

const Column = ({ column }) => {
  const dispatch = useDispatch()
  const board = useSelector(selectCurrentActiveBoard)
  // ===========dndkit============
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: column._id, data: { ...column } })

  const dndKitColumnStyles = {
    // touchAction: 'none' -> Khi Sensor là Pointer
    transform: CSS.Translate.toString(transform),
    transition,
    // xử lý kéo thả column gắn column dài kết hợp listeners đặt trong Box có fit-content
    height: '100%',
    opacity: isDragging ? 0.5 : undefined
  }

  // ==========Dropdown Menu============
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  // ==========Sort Cards theo API=============
  // Cards lúc này ko cần sắp xếp theo cardOrderIds nữa vì đã sắp xếp ở component cha cao nhất lúc call API
  const orderedCards = column.cards

  // ==========Xử lý Add new card================
  const [openNewCardForm, setOpenNewCardForm] = useState(false)
  const toggleOpenNewCardForm = () => setOpenNewCardForm(!openNewCardForm)
  const [newCardTitle, setNewCardTitle] = useState('')

  // Xử lý tạo mới 1 Card
  const addNewCard = async () => {
    if (!newCardTitle) {
      toast.error('Please Enter Card Title!', {
        position: 'bottom-right'
      })
      return
    }
    // Xử lý data để call API
    const newCardData = {
      title: newCardTitle,
      columnId: column._id
    }

    // Func có nhiệm vụ call API tạo mới Card và làm lại dữ liệu State board
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id
    })

    // Cập nhật lại State Board: ta set lại State để Component re-render thay vì call lại API fetchBoardDetailsAPI
    /**Lưu ý: cách làm này tùy đặc thù dự án, có thể có dự án BE sẽ support trả về luôn toàn bộ Board đầy đủ dù có
    là API tạo Column hay Card đi nữa. */
    // Tương tự tạo mới Column ta dùng cloneDeep
    const newBoard = cloneDeep(board)
    const columnToUpdate = newBoard.columns.find(
      (column) => column._id === createdCard.columnId
    )
    if (columnToUpdate) {
      // Nếu Column rỗng (đang chứa placeholder card)
      if (columnToUpdate.cards.some((card) => card.FE_PlaceholderCard)) {
        columnToUpdate.cards = [createdCard]
        columnToUpdate.cardOrderIds = [createdCard._id]
      } else {
        // Ngược lại nếu Column đã có data thì push vào cuối mảng
        columnToUpdate.cards.push(createdCard)
        columnToUpdate.cardOrderIds.push(createdCard._id)
      }
    }

    // Cập nhật dữ liệu Board vào Redux Store
    dispatch(updateCurrentActiveBoard(newBoard))

    // Đóng trạng thái add new Card và clear input
    toggleOpenNewCardForm()
    setNewCardTitle('')
  }

  // Xử lý xóa Column và Cards bên trong nó
  const confirmDeleteColumn = useConfirm()
  const handleDeleteColumn = async () => {
    const { confirmed } = await confirmDeleteColumn({
      title: 'Delete Column?',
      description:
        'This action will permanently delete your Column and its Cards! Are you sure?',
      confirmationText: 'Confirm',
      cancellationText: 'Cancel'
    })
    if (confirmed) {
      // Update chuẩn dữ liệu state Board
      // filter() tạo mảng mới ko ảnh hưởng mảng cũ nên không làm ảnh hưởng rules Immutability của Redux Toolkit
      const newBoard = { ...board }
      newBoard.columns = newBoard.columns.filter((c) => c._id !== column._id)
      newBoard.columnOrderIds = newBoard.columnOrderIds.filter(
        (_id) => _id !== column._id
      )

      // Cập nhật dữ liệu Board vào Redux Store
      dispatch(updateCurrentActiveBoard(newBoard))

      // Gọi API xử lý BE
      deleteColumnDetailsAPI(column._id).then((res) =>
        toast.success(res?.deleteResult)
      )
    }
  }

  return (
    <div ref={setNodeRef} style={dndKitColumnStyles} {...attributes}>
      <Box
        {...listeners}
        sx={{
          minWidth: 300,
          maxWidth: 300,
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#333643' : '#ebecf0',
          ml: 2,
          borderRadius: '6px',
          height: 'fit-content',
          maxHeight: (theme) =>
            `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)}) `
        }}
      >
        {/* Header */}
        <Box
          sx={{
            height: (theme) => theme.trello.columnHeaderHeight,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Typography
            sx={{ fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}
            variant="h6"
          >
            {column?.title}
          </Typography>
          <Box>
            <Tooltip title="More Options">
              <ExpandMore
                sx={{ color: 'text.primary', cursor: 'pointer' }}
                id="basic-column-dropdown"
                aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              />
            </Tooltip>
            <Menu
              id="basic-menu-column-dropdown"
              aria-labelledby="basic-column-dropdown"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
            >
              <MenuItem
                sx={{
                  '&:hover': {
                    color: 'success.light',
                    '& .add-card-icon': {
                      color: 'success.light'
                    }
                  }
                }}
                onClick={toggleOpenNewCardForm}
              >
                <ListItemIcon>
                  <AddCard className="add-card-icon" fontSize="small" />
                </ListItemIcon>
                <ListItemText>Add new card</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCut fontSize="small" />
                </ListItemIcon>
                <ListItemText>Cut</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCopy fontSize="small" />
                </ListItemIcon>
                <ListItemText>Copy</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentPaste fontSize="small" />
                </ListItemIcon>
                <ListItemText>Paste</ListItemText>
              </MenuItem>

              <Divider />
              <MenuItem
                sx={{
                  '&:hover': {
                    color: 'warning.dark',
                    '& .delete-forever-icon': {
                      color: 'warning.dark'
                    }
                  }
                }}
                onClick={handleDeleteColumn}
              >
                <ListItemIcon>
                  <DeleteForever
                    className="delete-forever-icon"
                    fontSize="small"
                  />
                </ListItemIcon>
                <ListItemText>Delete this column</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <Cloud fontSize="small" />
                </ListItemIcon>
                <ListItemText>Archive this column</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        {/* Content */}
        <ListCards cards={orderedCards} />

        {/* Footer */}
        <Box
          sx={{
            height: (theme) => theme.trello.columnFooterHeight,
            p: 2
          }}
        >
          {!openNewCardForm ? (
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Button
                startIcon={<AddCard sx={{ mb: 0.3 }} />}
                onClick={toggleOpenNewCardForm}
              >
                Add new card
              </Button>
              <Tooltip title="Drag to move" sx={{ cursor: 'pointer' }}>
                <DragHandle />
              </Tooltip>
            </Box>
          ) : (
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <TextField
                label="Enter column title..."
                variant="outlined"
                type="text"
                size="small"
                autoFocus
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                data-no-dnd="true"
                sx={{
                  // chọn thẻ label - phần nhãn label (cũng là placeholder)
                  '& label': { color: 'text.primary' },
                  // chọn thẻ input - phần text search
                  '& input': {
                    color: (theme) => theme.palette.primary.main,
                    bgcolor: (theme) =>
                      theme.palette.mode === 'dark' ? '#333643' : 'white'
                  },
                  // phần nhãn label khi focus
                  '& label.Mui-focused': {
                    color: (theme) => theme.palette.primary.main,
                    fontWeight: 'bold',
                    opacity: 1
                  },
                  '& .MuiInputLabel-root': {
                    opacity: 0.5
                  },
                  // toàn bộ phần thẻ input -> đi vào fieldset là set cho phần bên ngoài của input và xử lý khi hover và khi hover ra
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: (theme) => theme.palette.primary.main
                    },
                    '&:hover fieldset': {
                      borderColor: (theme) => theme.palette.primary.main
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: (theme) => theme.palette.primary.main
                    },
                    '&.MuiOutlinedInput-input': {
                      borderRadius: 1
                    }
                  }
                }}
              />
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  data-no-dnd="true"
                  sx={{
                    boxShadow: 'none',
                    border: '0.5px solid',
                    borderColor: (theme) => theme.palette.success.main,
                    '&:hover': {
                      bgcolor: (theme) => theme.palette.success.main
                    }
                  }}
                  onClick={addNewCard}
                >
                  Add
                </Button>
                <Close
                  fontSize="medium"
                  sx={{
                    color: (theme) => theme.palette.warning.light,
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    toggleOpenNewCardForm()
                    setNewCardTitle('')
                  }}
                />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </div>
  )
}

export default Column
