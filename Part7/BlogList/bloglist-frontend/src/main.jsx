import ReactDOM from 'react-dom/client'
import App from './App'
import { NotificationContextProvider } from './reducers/NotificationContext'
import { QueryClient,QueryClientProvider } from '@tanstack/react-query'
import { LoggedInUserContextProvider } from './reducers/loggedInUserContext'

const queryClient=new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
      <LoggedInUserContextProvider>
        <App />
      </LoggedInUserContextProvider>
    </NotificationContextProvider>
  </QueryClientProvider>
)
