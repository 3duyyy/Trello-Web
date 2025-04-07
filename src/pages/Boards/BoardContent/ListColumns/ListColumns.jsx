import Column from './Column/Column'
import { Box, Button, InputAdornment, TextField } from '@mui/material'
import { Add, Close, Search } from '@mui/icons-material'
import {
  SortableContext,
  horizontalListSortingStrategy
} from '@dnd-kit/sortable'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { createNewColumnAPI } from '~/apis'
import { generatePlaceholderCard } from '~/utils/formatters'
import { cloneDeep } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCurrentActiveBoard,
  updateCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'

const ListColumns = ({ columns }) => {
  const dispatch = useDispatch()
  const board = useSelector(selectCurrentActiveBoard)

  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const toggleOpenNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)
  const [newColumnTitle, setNewColumnTitle] = useState('')

  // Xử lý tạo mới 1 Column
  const addNewColumn = async () => {
    if (!newColumnTitle) {
      toast.error('Please Enter Column Title!')
      return
    }

    // Tạo dữ liệu để gọi API
    const newColumnData = {
      title: newColumnTitle
    }

    // Func có nhiệm vụ call API tạo mới Column và làm lại dữ liệu State board
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id
    })

    // Xử lý thêm placeholder Card cho Column vừa tạo mới để xử lý kéo thả
    createdColumn.cards = [generatePlaceholderCard(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]

    // Cập nhật lại State Board: ta set lại State để Component re-render thay vì call lại API fetchBoardDetailsAPI
    /**Lưu ý: cách làm này tùy đặc thù dự án, có thể có dự án BE sẽ support trả về luôn toàn bộ Board đầy đủ dù có
    là API tạo Column hay Card đi nữa. */
    /** Fix bug:
     * Đoạn này dính lỗi "Object is not extensible" bởi vì dù đã copy/clone ra giá trị newBoard nhưng bản chất của spread operator là Shallow Copy/Clone, nên dính phải rules Imutablelity trong Redux Toolkit không được dùng hàm PUSH (chỉnh sửa giá trị trực tiếp). Cách đơn giản nhất là Deep Copy/Clone
     */
    const newBoard = cloneDeep(board)
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)

    // Cách 2: Dùng Array.concat để merge mảng cần thêm vào mảng ban đầu
    // const newBoard = { ...board }
    // newBoard.columns = newBoard.columns.concat([createdColumn])
    // newBoard.columnOrderIds = newBoard.columnOrderIds.concat([
    //   createdColumn._id
    // ])

    // Cập nhật dữ liệu Board vào Redux Store
    dispatch(updateCurrentActiveBoard(newBoard))

    // Đóng trạng thái add new column và clear input
    toggleOpenNewColumnForm()
    setNewColumnTitle('')
  }

  return (
    <SortableContext
      items={columns?.map((column) => column._id)}
      strategy={horizontalListSortingStrategy}
    >
      <Box
        sx={{
          bgcolor: 'inherit',
          width: '100%',
          height: '100%',
          display: 'flex',
          overflowX: 'auto',
          overflowY: 'hidden',
          '&::-webkit-scrollbar-track': { m: 2 }
        }}
      >
        {columns?.map((column) => (
          <Column key={column._id} column={column} />
        ))}

        {/* Add new Column CTA  */}
        {!openNewColumnForm ? (
          <Box
            sx={{
              minWidth: 250,
              maxWidth: 250,
              mx: 2,
              borderRadius: '6px',
              height: 'fit-content',
              bgcolor: '#ffffff3d'
            }}
            onClick={toggleOpenNewColumnForm}
          >
            <Button
              startIcon={<Add sx={{ color: 'white' }} />}
              sx={{
                color: 'white',
                width: '100%',
                justifyContent: 'flex-start',
                pl: 2.5,
                py: 1
              }}
            >
              Add new column...
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              minWidth: 250,
              maxWidth: 250,
              mx: 2,
              p: 1,
              borderRadius: '6px',
              height: 'fit-content',
              bgcolor: '#ffffff3d',
              display: 'flex',
              flexDirection: 'column',
              gap: 1
            }}
          >
            <TextField
              label="Enter column title..."
              variant="outlined"
              type="text"
              size="small"
              autoFocus
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              sx={{
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
                sx={{
                  boxShadow: 'none',
                  border: '0.5px solid',
                  borderColor: (theme) => theme.palette.success.main,
                  '&:hover': { bgcolor: (theme) => theme.palette.success.main }
                }}
                onClick={addNewColumn}
              >
                Add Column
              </Button>
              <Close
                fontSize="medium"
                sx={{
                  color: 'white',
                  cursor: 'pointer',
                  '&:hover': { color: (theme) => theme.palette.warning.light }
                }}
                onClick={() => {
                  toggleOpenNewColumnForm()
                  setNewColumnTitle('')
                }}
              />
            </Box>
          </Box>
        )}
      </Box>
    </SortableContext>
  )
}

export default ListColumns
