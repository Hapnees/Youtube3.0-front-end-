import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Loader from './components/ui/LoaderUI/Loader'
import MainLayout from './layouts/MainLayot/MainLayout'
import HomePage from './pages/HomePage/HomePage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import VideoPage from './pages/VideoPage/VideoPage'

const ProfilePage = React.lazy(
	() =>
		import(
			/* webpackChunkName: "ProfilePage" */ './pages/ProfilePage/ProfilePage'
		)
)

const ProfileByUsernamePage = React.lazy(
	() =>
		import(
			/* webpackChunkName: "ProfileByUsernamePage" */ './pages/ProfileByUsernamePage/ProfileByUsernamePage'
		)
)

const ProfileEditPage = React.lazy(
	() =>
		import(
			/* webpackChunkName: "ProfileEditPage" */ './pages/ProfileEditPage/ProfileEditPage'
		)
)

const videoPage = React.lazy(
	() =>
		import(/* webpackChunkName: "VideoPage" */ './pages/VideoPage/VideoPage')
)

function App() {
	return (
		<Routes>
			<Route path='/' element={<MainLayout />}>
				<Route path='' element={<HomePage />} />
				<Route path='*' element={<NotFoundPage />} />
				<Route
					path='/user/:username'
					element={
						<Suspense fallback={<Loader />}>
							<ProfileByUsernamePage />
						</Suspense>
					}
				/>
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
				<Route
					path='video/:id'
					element={
						<Suspense fallback={<Loader />}>
							<VideoPage />
						</Suspense>
					}
				/>
			</Route>
		</Routes>
	)
}

export default App
