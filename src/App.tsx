import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'

const ProfilePage = React.lazy(
	() => import(/* webpackChunkName: "ProfilePage" */ './pages/ProfilePage')
)

function App() {
	return (
		<Routes>
			<Route path='/' element={<MainLayout />}>
				<Route path='' element={<HomePage />} />
				<Route
					path='profile'
					element={
						<Suspense fallback={null}>
							<ProfilePage />
						</Suspense>
					}
				/>
			</Route>
		</Routes>
	)
}

export default App
