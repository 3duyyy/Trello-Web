import ReactDOM from 'react-dom/client'
import App from '~/App.jsx'
// Cấu hình Theme MUI
import CssBaseline from '@mui/material/CssBaseline'
import theme from '~/theme.js'
import { ThemeProvider } from '@mui/material/styles'
// Cấu hình react-toastify
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// Cấu hình MUI Dialog
import { ConfirmProvider } from 'material-ui-confirm'
// Cấu hình Redux Store
import { Provider } from 'react-redux'
import { store } from './redux/store'
// Cấu hình React-router-dom với BrowserRouter
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename="/">
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ConfirmProvider
          defaultOptions={{
            allowClose: false,
            dialogProps: { maxWidth: 'xs' },
            confirmationButtonProps: { color: 'error', variant: 'outlined' },
            cancellationButtonProps: { color: 'inherit' }
            // buttonOrder: ['confirm', 'cancel'] -> đổi chỗ các button nếu cần thiết
            // confirmationKeyword: '3duy' -> phải nhập chữ 3duy thì mới cho nhấn confirm
          }}
        >
          <CssBaseline />
          <App />
          <ToastContainer
            position="bottom-left"
            theme="colored"
            autoClose={3000}
            closeOnClick={true}
          />
        </ConfirmProvider>
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
)
