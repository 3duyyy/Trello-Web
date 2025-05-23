import { API_ROOT } from '~/utils/constant'
// Axios Interceptor thay cho Axios
import authorizedAxiosInstance from '~/utils/authorizeAxios'

/**
 * Lưu ý: Đối với việc sử dụng axios thì việc try catch sẽ làm dư thừa catch lỗi rất nhiều. Mà thằng axios lại có giải pháp
catch lỗi tập trung rất Clean Code bởi 1 thằng cực kì mạnh mẽ đó là Interceptors.
 * Interceptors: hiểu đơn giản là chúng ta sẽ đánh chặn vào giữa req hoặc res để xử lý logic mà chúng ta muốn.
 */

// ======================Boards=====================
// Get board details - Đã move to Redux
// export const fetchBoardDetailsAPI = async (boardId) => {
//   const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
//   // Lưu ý: axios sẽ trả về kết quả qua property của nó là data
//   return response.data
// }
// Update Board khi kéo thả Column
export const updateBoardDetailsAPI = async (boardId, updataData) => {
  const response = await authorizedAxiosInstance.put(
    `${API_ROOT}/v1/boards/${boardId}`,
    updataData
  )
  // Lưu ý: axios sẽ trả về kết quả qua property của nó là data
  return response.data
}
// Kéo card giữa các column
export const moveCardToDifferentColumnAPI = async (updataData) => {
  const response = await authorizedAxiosInstance.put(
    `${API_ROOT}/v1/boards/supports/moving_card`,
    updataData
  )
  // Lưu ý: axios sẽ trả về kết quả qua property của nó là data
  return response.data
}

// =====================Columns=======================
// Create new Column
export const createNewColumnAPI = async (newColumnData) => {
  const response = await authorizedAxiosInstance.post(
    `${API_ROOT}/v1/columns`,
    newColumnData
  )
  return response.data
}
// Update Column khi kéo thả Card trong 1 Column
export const updateColumnDetailsAPI = async (columnId, updataData) => {
  const response = await authorizedAxiosInstance.put(
    `${API_ROOT}/v1/columns/${columnId}`,
    updataData
  )
  // Lưu ý: axios sẽ trả về kết quả qua property của nó là data
  return response.data
}
// DeleteColumn
export const deleteColumnDetailsAPI = async (columnId) => {
  const response = await authorizedAxiosInstance.delete(
    `${API_ROOT}/v1/columns/${columnId}`
  )
  // Lưu ý: axios sẽ trả về kết quả qua property của nó là data
  return response.data
}

// ===================Cards====================
// Create new Card
export const createNewCardAPI = async (newCardData) => {
  const response = await authorizedAxiosInstance.post(
    `${API_ROOT}/v1/cards`,
    newCardData
  )
  return response.data
}
