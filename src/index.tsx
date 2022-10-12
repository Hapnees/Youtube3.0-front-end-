import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.scss'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Zoom } from 'react-toastify'

const persistor = persistStore(store)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<BrowserRouter>
		<ToastContainer
			position='top-center'
			autoClose={5000}
			hideProgressBar={false}
			newestOnTop
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
			transition={Zoom}
			limit={3}
			theme='colored'
		/>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<App />
			</PersistGate>
		</Provider>
	</BrowserRouter>
)
