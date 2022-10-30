import React, { FC, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { FaPlay } from 'react-icons/fa'
import { BsFillVolumeUpFill } from 'react-icons/bs'
import { BsFillVolumeMuteFill } from 'react-icons/bs'
import { CSSTransition } from 'react-transition-group'
import { IoMdSettings } from 'react-icons/io'
import { BiFullscreen } from 'react-icons/bi'
import { IoMdPause } from 'react-icons/io'
import cl from './VideoPlayer.module.scss'
import { timeFormat } from '../../utils/time.format'
import { HiRewind } from 'react-icons/hi'
import { IVideoGetVideoPage } from '../../models/video/video-get-page.interface'
import { keyDown } from '../../utils/keyDown.util'

interface IState {
  videoData: IVideoGetVideoPage | undefined
}

const VideoPlayer: FC<IState> = ({ videoData }) => {
  const [progress, setProgress] = useState(0)

  const [isLoaded, setIsLoaded] = useState(false)
  const [videoClicked, setVideoClicked] = useState(0)
  const [tempVolume, setTempVolume] = useState(100)
  const [isPaused, setIsPaused] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [volume, setVolume] = useState(100)

  const [isClickedRightArrow, setIsClickedRightArrow] = useState(false)
  const [isClickedLeftArrow, setIsClickedLeftArrow] = useState(false)
  const [isClickedUpOrDownArrow, setIsClickedUpOrDownArrow] = useState(false)

  const getBackgroundSizeVolume = () => {
    return { backgroundSize: `${volume}% 100%` }
  }

  const getBackgroundSizeProgress = () => {
    return { backgroundSize: `${progress / 10}% 100%` }
  }

  const handleClickVolumeIcon = () => {
    if (videoRef.current) {
      setTempVolume(volume)
      setVolume(0)
      videoRef.current.volume = 0
    }
  }

  const handleClickMuteIcon = () => {
    if (videoRef.current) {
      setVolume(tempVolume)
      videoRef.current.volume = tempVolume / 100
    }
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

  const handleClickFullScreen = () => {
    videoRef.current?.requestFullscreen()
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    keyDown(
      videoRef,
      event,
      setVolume,
      isPaused,
      setIsPaused,
      setIsClickedRightArrow,
      setIsClickedLeftArrow,
      setIsClickedUpOrDownArrow
    )
  }

  //Обрабатываем двойной клик
  useEffect(() => {
    if (videoRef.current && videoClicked > 1) {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        videoRef.current.requestFullscreen()
      }
    }

    setTimeout(() => {
      setVideoClicked(0)
    }, 200)
  }, [videoClicked])

  const handleClickVideo = () => {
    handleTogglePlay()
    setVideoClicked(prev => prev + 1)
  }

  return (
    <div className='relative w-full'>
      {isClickedUpOrDownArrow && (
        <div className={cl.volume__notif}>
          <BsFillVolumeUpFill size={70} />
          <p className='text-[40px]'>{volume}%</p>
        </div>
      )}
      {isClickedLeftArrow && (
        <div className={`${cl.rewind} ${cl.rewind__left}`}>
          <HiRewind size={90} />
          <p>10 сек</p>
        </div>
      )}
      {isClickedRightArrow && (
        <div className={`${cl.rewind} ${cl.rewind__right}`}>
          <HiRewind size={90} className='rotate-180' />
          <p>10 сек</p>
        </div>
      )}
      {!isPaused ? (
        <FaPlay className={cl.play} />
      ) : (
        <IoMdPause className={cl.play} />
      )}
      <video
        onLoadedMetadata={() => {
          if (videoRef.current) setIsLoaded(true)
        }}
        id='video'
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
        onClick={handleClickVideo}
      ></video>
      <div className={cl.panel} onClick={handleClickVideo}>
        <div className='relative' onClick={event => event.stopPropagation()}>
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
          <div className={cl.controls}>
            <div>
              <div className='flex items-center'>
                <div onClick={handleTogglePlay}>
                  {isPaused || progress >= 1000 ? (
                    <FaPlay size={17} className='cursor-pointer mr-6' />
                  ) : (
                    <IoMdPause size={23} className='cursor-pointer mr-6' />
                  )}
                </div>
                <div className={cl.volume__container}>
                  {volume > 0 ? (
                    <BsFillVolumeUpFill
                      size={33}
                      className='cursor-pointer pr-3'
                      onClick={handleClickVolumeIcon}
                    />
                  ) : (
                    <BsFillVolumeMuteFill
                      size={33}
                      className='cursor-pointer pr-3 opacity-60'
                      onClick={handleClickMuteIcon}
                    />
                  )}

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
                </div>
                <div>
                  {isLoaded && (
                    <p>
                      {timeFormat(videoRef.current?.currentTime || 0)}/
                      {timeFormat(videoRef.current?.duration || 0)}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className='flex items-center gap-4'>
              <IoMdSettings size={23} className='cursor-pointer' />
              <BiFullscreen
                size={23}
                onClick={handleClickFullScreen}
                className='cursor-pointer'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoPlayer
