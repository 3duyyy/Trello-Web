import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from './formatters'

// Khởi tạo 1 đối tượng Axios (authorizedAxiosInstance) mục đích để custom và cấu hình chung cho dự án
let authorizedAxiosInstance = axios.create()

// Thời gian chờ tối đa của 1 request: ta để 10 phút
authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10

//  withCredentials: sẽ cho phép axios tự động gửi cookie trong mỗi request lên BE (phục vụ việc chúng ta sẽ lưu JWT tokens (refresh & access) vào trong httpOnly Cookie của trình duyệt)
authorizedAxiosInstance.defaults.withCredentials = true

// Cấu hình Interceptors (bộ đánh chặn vào giữa mọi Request & Response)
// Interceptor Request: can thiệp vào giữa các request API
authorizedAxiosInstance.interceptors.request.use(
  (config) => {
    // Kỹ thuật chặn spam click (Ở fomatters trong utils)
    interceptorLoadingElements(true)

    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Interceptor Response: can thiệp vào giữa các response API
authorizedAxiosInstance.interceptors.response.use(
  (response) => {
    // Kỹ thuật chặn spam click (Ở fomatters trong utils)
    interceptorLoadingElements(false)

    return response
  },
  // Mọi mã http status code nằm ngoài 2xx(200->299) sẽ là errors và đều sẽ rơi vào đây
  (error) => {
    // Kỹ thuật chặn spam click (Ở fomatters trong utils)
    interceptorLoadingElements(false)

    // Xử lý tập trung phần hiển thị thông báo lỗi trả về từ mọi API ở đây (viết code 1 lần: Clean Code)
    // log ra thằng error là sẽ thấy cấu trúc data dẫn tới message lỗi như dưới đây
    console.log(error)
    // Mặc định sẽ để 1 cái error
    let errorMessage = error?.message
    if (error.response?.data?.message) {
      errorMessage = error.response?.data?.message
    }

    // Dùng toastify để hiển thị bất kể mọi mã lỗi lên màn hình (Ngoại trừ lỗi 410 - GONE phục vụ việc tự động refresh lại token)
    if (error.response?.status !== 410) {
      toast.error(errorMessage)
    }

    return Promise.reject(error)
  }
)

export default authorizedAxiosInstance
