import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Loader from './components/ui/LoaderUI/Loader'
import MainLayout from './layouts/MainLayot/MainLayout'
import HomePage from './pages/HomePage/HomePage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'

const ProfilePage = React.lazy(
	() =>
		import(
			/* webpackChunkName: "ProfilePage" */ './pages/ProfilePage/ProfilePage'
		)
)

const ProfileEditPage = React.lazy(
	() =>
		import(
			/* webpackChunkName: "ProfileEditPage" */ './pages/ProfileEditPage/ProfileEditPage'
		)
)

function App() {
	return (
		<Routes>
			<Route path='/' element={<MainLayout />}>
				<Route path='' element={<HomePage />} />
				<Route path='*' element={<NotFoundPage />} />
				<Route path='test' element={<Loader />} />
				<Route
					path='profile'
					element={
						<Suspense fallback={<Loader />}>
							<ProfilePage />
						</Suspense>
					}
				/>
				<Route
					path='profile/edit'
					element={
						<Suspense fallback={<Loader />}>
							<ProfileEditPage />
						</Suspense>
					}
				/>
			</Route>
		</Routes>
	)
}

export default App
