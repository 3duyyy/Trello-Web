import Column from './Column/Column'
import { Box, Button, InputAdornment, TextField } from '@mui/material'
import { Add, Close, Search } from '@mui/icons-material'
import {
  SortableContext,
  horizontalListSortingStrategy
} from '@dnd-kit/sortable'
import { useState } from 'react'
import { toast } from 'react-toastify'

const ListColumns = ({
  columns,
  createNewColumn,
  createNewCard,
  deleteColumnDetails
}) => {
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const [newColumnTitle, setNewColumnTitle] = useState('')

  const toggleOpenNewColumnForm = () => {
    setOpenNewColumnForm(!openNewColumnForm)
  }

  // Xử lý tạo mới 1 Column
  const addNewColumn = () => {
    if (!newColumnTitle) {
      toast.error('Please Enter Column Title!')
      return
    }

    // Tạo dữ liệu để gọi API
    const newColumnData = {
      title: newColumnTitle
    }

    /**
     * Chưa học Redux nên phải làm cách này, gọi lên props func createNewColumn ở component cha _id.jsx khi này sẽ
    có thể Call luôn API thay vì phải gọi ngược lên các component cha ở bên trên (component con càng sâu càng khổ)
     */
    createNewColumn(newColumnData)

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
          <Column
            key={column._id}
            column={column}
            createNewCard={createNewCard}
            deleteColumnDetails={deleteColumnDetails}
          />
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
