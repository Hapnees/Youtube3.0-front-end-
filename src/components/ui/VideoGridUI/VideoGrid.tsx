/* eslint-disable no-mixed-spaces-and-tabs */
import React, { FC } from 'react'
import { useLocation } from 'react-router-dom'
import { IAuthSlice } from '../../../models/auth/auth.interface'
import { IUserGet } from '../../../models/user/user-get.interface'
import { IVideoGetHomePage } from '../../../models/video/video-get-hpage.interface'
import { IVideoGet } from '../../../models/video/video-get.interface'
import VideoCard from '../../VideoCard/VideoCard'
import VideoCardHomePage from '../../VideoCardHomePage/VideoCardHomePage'

interface IVideoGrid {
	videos?: IVideoGet[]
	videosHomePage?: IVideoGetHomePage[]
	user?: IUserGet | IAuthSlice
}

const VideoGrid: FC<IVideoGrid> = ({ videos, user, videosHomePage }) => {
	const location = useLocation()
	return (
		<div className='grid grid-cols-4 gap-4'>
			{videos &&
				location.pathname !== '/' &&
				user &&
				videos.map(video => (
					<VideoCard key={video.id} user={user} video={video} />
				))}
			{videosHomePage &&
				videosHomePage.map(video => (
					<VideoCardHomePage key={video.id} video={video} />
				))}
		</div>
	)
}

export default VideoGrid
