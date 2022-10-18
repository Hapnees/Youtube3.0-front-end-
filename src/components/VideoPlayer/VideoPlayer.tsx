import React, { useEffect, useRef, useState } from 'react'
import { FaPlay } from 'react-icons/fa'
import { BsFillVolumeUpFill } from 'react-icons/bs'
import { BsFillVolumeMuteFill } from 'react-icons/bs'
import { CSSTransition } from 'react-transition-group'
import { IoMdSettings } from 'react-icons/io'
import { BiFullscreen } from 'react-icons/bi'
import { IoMdPause } from 'react-icons/io'
import { useGetVideoByIdQuery } from '../../api/user.api'
import { useParams } from 'react-router-dom'
import cl from './VideoPlayer.module.scss'
import { timeFormat } from '../../utils/time.format'
import { HiRewind } from 'react-icons/hi'

const VideoPlayer = () => {
	const params: any = useParams()
	const [isClickedRightArrow, setIsClickedRightArrow] = useState(false)
	const [isClickedLeftArrow, setIsClickedLeftArrow] = useState(false)
	const [isPaused, setIsPaused] = useState(true)
	const videoRef = useRef<HTMLVideoElement>(null)
	const [volume, setVolume] = useState(100)
	const [progress, setProgress] = useState(0)
	const [isShowVolume, setIsShowVolume] = useState(false)
	const { data: videoData, isLoading: isVideoLoading } = useGetVideoByIdQuery(
		params.id
	)
	const getBackgroundSizeVolume = () => {
		return { backgroundSize: `${volume}% 100%` }
	}

	const getBackgroundSizeProgress = () => {
		return { backgroundSize: `${progress / 10}% 100%` }
	}

	const handleClickVolumeIcon = () => {
		setVolume(0)
	}

	const handleClickMuteIcon = () => {
		setVolume(100)
	}

	const handleTogglePlay = () => {
		if (isPaused) {
			videoRef?.current?.play()
			setIsPaused(false)
		} else {
			videoRef.current?.pause()
			setIsPaused(true)
		}
	}

	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (videoRef.current) {
			if (event.key === 'ArrowRight') {
				videoRef.current.currentTime += 10
				setIsClickedRightArrow(true)
				setTimeout(() => {
					setIsClickedRightArrow(false)
				}, 200)
			} else if (event.key === 'ArrowLeft') {
				videoRef.current.currentTime -= 10
				setIsClickedLeftArrow(true)
				setTimeout(() => {
					setIsClickedLeftArrow(false)
				}, 200)
			} else if (event.key === ' ' || event.key === 'Enter') {
				event.preventDefault()
				if (isPaused) {
					videoRef?.current?.play()
					setIsPaused(false)
				} else {
					videoRef.current?.pause()
					setIsPaused(true)
				}
			}
		}
	}

	return (
		<div className='relative w-full'>
			{isClickedLeftArrow && <HiRewind className={cl.rewind} />}
			{isClickedRightArrow && <HiRewind className={cl.rewind__rotate} />}
			{!isPaused ? (
				<FaPlay className={cl.play} />
			) : (
				<IoMdPause className={cl.play} />
			)}
			<video
				onKeyDown={event => handleKeyDown(event)}
				ref={videoRef}
				src={videoData?.video_path}
				className={cl.player}
				onTimeUpdate={event =>
					setProgress(
						(Math.ceil(event.currentTarget.currentTime) * 1000) /
							event.currentTarget.duration
					)
				}
				onClick={handleTogglePlay}
			></video>
			<div className='absolute bottom-0 right-0 flex flex-col w-full'>
				<div className='relative'>
					<div className={cl.progress__container}>
						<input
							type='range'
							min={0}
							max={1000}
							className={cl.progress}
							style={getBackgroundSizeProgress()}
							value={progress}
							onChange={event => {
								if (videoRef.current)
									videoRef.current.currentTime =
										(parseInt(event.target.value) / 1000) *
										videoRef.current.duration
								setProgress(parseInt(event.target.value))
							}}
						/>
					</div>
					<div
						className={cl.controls}
						onMouseLeave={() => setIsShowVolume(false)}
					>
						<div>
							<div className='flex items-center'>
								<div onClick={handleTogglePlay}>
									{isPaused || progress >= 1000 ? (
										<FaPlay size={17} className='cursor-pointer mr-6' />
									) : (
										<IoMdPause size={23} className='cursor-pointer mr-6' />
									)}
								</div>
								<div
									className={cl.volume__container}
									onMouseEnter={() => setIsShowVolume(true)}
								>
									{volume > 0 ? (
										<BsFillVolumeUpFill
											size={33}
											className='cursor-pointer pr-3'
											onClick={handleClickVolumeIcon}
										/>
									) : (
										<BsFillVolumeMuteFill
											size={33}
											className='cursor-pointer pr-3'
											onClick={handleClickMuteIcon}
										/>
									)}

									<CSSTransition
										in={isShowVolume}
										timeout={300}
										unmountOnExit
										classNames='volume'
									>
										<div className={cl.volume__body}>
											<input
												type='range'
												min={0}
												max={100}
												className={cl.volume}
												value={volume}
												onChange={event => {
													setVolume(parseInt(event.target.value))
													if (videoRef.current)
														videoRef.current.volume =
															parseInt(event.target.value) / 100
												}}
												style={getBackgroundSizeVolume()}
											/>
										</div>
									</CSSTransition>
								</div>
								<div>
									<p>
										{timeFormat(videoRef.current?.currentTime || 0)}/
										{timeFormat(videoRef.current?.duration || 0)}
									</p>
								</div>
							</div>
						</div>

						<div className='flex items-center gap-4'>
							<IoMdSettings size={23} className='cursor-pointer' />
							<BiFullscreen size={23} />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default VideoPlayer
