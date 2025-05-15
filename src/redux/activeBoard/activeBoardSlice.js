import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { isEmpty } from 'lodash'
import { API_ROOT } from '~/utils/constant'
import { generatePlaceholderCard } from '~/utils/formatters'
import { mapOrder } from '~/utils/sorts'
// Axios Interceptor thay cho Axios
import authorizedAxiosInstance from '~/utils/authorizeAxios'

// Khởi tạo giá trị State của 1 Slice trong Redux
const initialState = {
  currentActiveBoard: null
}

// Các hành động Call API (bất đồng bộ) và update dữ liệu trong redux, dùng Middleware createAsyncThunk đi kèm extraReducers
export const fetchBoardDetailsAPI = createAsyncThunk(
  'activeBoard/fetchBoardDetailsAPI',
  async (boardId) => {
    const response = await authorizedAxiosInstance.get(
      `${API_ROOT}/v1/boards/${boardId}`
    )
    // Lưu ý: axios sẽ trả về kết quả qua property của nó là data
    return response.data
  }
)

// Khởi tạo một Slice trong Redux Store
export const activeBoardSlice = createSlice({
  name: 'activeBoard',
  initialState,
  // Reducers: Nơi xử lý dữ liệu đồng bộ
  reducers: {
    // Lưu ý luôn cần cặp ngoặc nhọn cho func trong reducer cho dù code trong chỉ có 1 dòng (rule của Redux)
    updateCurrentActiveBoard: (state, action) => {
      // action.payload là chuẩn đặt tên dữ liệu vào reducer, ở đây chúng ta gán nó ra 1 biến có nghĩa hơn
      const board = action.payload

      // Xử lý dữ liệu nếu cần thiết...
      // ...

      // Update lại dữ liệu của currentActiveBoard
      state.currentActiveBoard = board
    }
  },
  // extraReducers: nơi xử lý dữ liệu bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(fetchBoardDetailsAPI.fulfilled, (state, action) => {
      // action.payload ở đây chính là response.data ở trên
      let board = action.payload

      // Sắp xếp thứ tự các columns trước khi truyền xuống các component con
      board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')

      board.columns.forEach((column) => {
        // Xử lý kéo thả Card vào 1 column rỗng (tạo PlaceHolderCard cho column rỗng khi call API với dữ liệu đã tạo sẵn từ DB)
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [generatePlaceholderCard(column)._id]
        } else {
          // Sắp xếp dữ liệu cards luôn ở đây trước khi đưa dữ liệu xuống component con
          column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
        }
      })

      // Update lại dữ liệu của currentActiveBoard
      state.currentActiveBoard = board
    })
  }
})

// Actions: là nơi dành cho các components bên dưới gọi bằng dispatch() tới nó để cập nhật lại dữ liệu thông qua reducers (chạy đồng bộ)
// Để ý ở trên thì ko thấy properties actions đâu cả, bởi vì những cái actions này được redux tự động tạo theo tên của reducers
export const { updateCurrentActiveBoard } = activeBoardSlice.actions

// Selectors: là nơi cho các components bên dưới gọi bằng hook useSelector() để lấy dữ liệu trong Redux store ra sử dụng
export const selectCurrentActiveBoard = (state) => {
  return state.activeBoard.currentActiveBoard
}

// Phải export ra là reducer bởi vì để store lấy ra reducer lưu trữ bên Redux store (ko có s ở cuối vì Slice đã tổng hợp các reducers và extraReducers thành 1 prop reducer rồi)
export const activeBoardReducer = activeBoardSlice.reducer
