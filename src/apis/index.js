import axios from 'axios'
import { API_ROOT } from '~/utils/constant'

/**
 * Lưu ý: Đối với việc sử dụng axios thì việc try catch sẽ làm dư thừa catch lỗi rất nhiều. Mà thằng axios lại có giải pháp
catch lỗi tập trung rất Clean Code bởi 1 thằng cực kì mạnh mẽ đó là Interceptors.
 * Interceptors: hiểu đơn giản là chúng ta sẽ đánh chặn vào giữa req hoặc res để xử lý logic mà chúng ta muốn.
 */

// ======================Boards=====================
// Get board details
export const fetchBoardDetailsAPI = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  // Lưu ý: axios sẽ trả về kết quả qua property của nó là data
  return response.data
}
// Update Board khi kéo thả
export const updateBoardDetailsAPI = async (boardId, updataData) => {
  const response = await axios.put(
    `${API_ROOT}/v1/boards/${boardId}`,
    updataData
  )
  // Lưu ý: axios sẽ trả về kết quả qua property của nó là data
  return response.data
}
// Kéo card giữa các column
export const moveCardToDifferentColumnAPI = async (updataData) => {
  const response = await axios.put(
    `${API_ROOT}/v1/boards/supports/moving_card`,
    updataData
  )
  // Lưu ý: axios sẽ trả về kết quả qua property của nó là data
  return response.data
}

// =====================Columns=======================
// Create new Column
export const createNewColumnAPI = async (newColumnData) => {
  const response = await axios.post(`${API_ROOT}/v1/columns`, newColumnData)
  return response.data
}
// Update Column khi kéo thả
export const updateColumnDetailsAPI = async (columnId, updataData) => {
  const response = await axios.put(
    `${API_ROOT}/v1/columns/${columnId}`,
    updataData
  )
  // Lưu ý: axios sẽ trả về kết quả qua property của nó là data
  return response.data
}
// DeleteColumn
export const deleteColumnDetailsAPI = async (columnId) => {
  const response = await axios.delete(`${API_ROOT}/v1/columns/${columnId}`)
  // Lưu ý: axios sẽ trả về kết quả qua property của nó là data
  return response.data
}

// ===================Cards====================
// Create new Card
export const createNewCardAPI = async (newCardData) => {
  const response = await axios.post(`${API_ROOT}/v1/cards`, newCardData)
  return response.data
}
