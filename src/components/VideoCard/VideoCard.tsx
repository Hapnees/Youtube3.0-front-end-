import React, { FC, useState } from 'react'
import testAvatar from '../../assets/img/profile.png'
import { dateAgoFormat } from '../../utils/dateAgo.format'
import cl from './VideoCard.module.scss'
import { numberFormat } from '../../utils/number.format'
import { Link, useNavigate } from 'react-router-dom'
import { IVideoCard } from '../../models/video/video-get-VideoCard.interface'
import { viewsFormat } from '../../utils/views.format'
import {
  useDeleteVideoMutation,
  useUpdateViewsMutation
} from '../../api/video.api'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { CSSTransition } from 'react-transition-group'
import { MdModeEdit } from 'react-icons/md'
import { BsFillTrashFill } from 'react-icons/bs'
import { useActions } from '../../hooks/useActions'
import { toast } from 'react-toastify'

interface VideoCardProps {
  video: IVideoCard
}

const VideoCard: FC<VideoCardProps> = ({ video }) => {
  const {
    user: { token, username }
  } = useTypedSelector(state => state.auth)
  const [updateViews] = useUpdateViewsMutation()
  const navigate = useNavigate()
  const handleClickAvatar = (event: any) => {
    event.preventDefault()
    event.stopPropagation()
    navigate(`/user/${video.user.username}`)
  }
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const { setIsOpenModalWindow } = useActions()

  const [deleteVideo] = useDeleteVideoMutation()

  const handleClickEdit = (event: any) => {
    event.preventDefault()
    setIsOpenModalWindow({ isOpen: true, type: 'edit', data: video })
  }

  const handleClickDelete = async (event: any) => {
    event.preventDefault()
    const timer = setTimeout(() => {
      deleteVideo({ id: video.id, token: token || '' }).unwrap()
    }, 4700)
    toast.info(`Видео ${video.title} будет удалено. Кликните для отмены`, {
      autoClose: 4000,
      onClick: () => clearTimeout(timer),
      pauseOnHover: false
    })
  }
  return (
    <Link
      to={`/video/${video.id}`}
      replace={true}
      onClick={() => updateViews(video.id)}
    >
      <div className={cl.container}>
        <div className={cl.thumbnail__container}>
          <div
            className='w-full h-full flex items-center justify-center'
            onMouseEnter={() => setIsOpenMenu(true)}
            onMouseLeave={() => setIsOpenMenu(false)}
          >
            <img
              src={video.thumbnail_path}
              alt=''
              className='object-cover h-full w-full rounded-t-md'
            />
            <div className={cl.duration}>{video.duration}</div>
            {username === video.user.username && (
              <CSSTransition
                in={isOpenMenu}
                timeout={300}
                unmountOnExit
                classNames='auth'
              >
                <div className='absolute flex gap-2'>
                  <MdModeEdit
                    size={50}
                    className={cl.edit}
                    onClick={event => handleClickEdit(event)}
                  />
                  <BsFillTrashFill
                    size={50}
                    className={cl.delete}
                    onClick={event => handleClickDelete(event)}
                  />
                </div>
              </CSSTransition>
            )}
          </div>
        </div>

        <div className='flex gap-2 px-3'>
          <img
            src={video.user.avatar_path || testAvatar}
            alt=''
            className='rounded-full p-1 w-[55px] h-[55px] border-2 border-zinc-400 hover:border-dashed hover:border-blue-400 hover:scale-110 duration-300'
            onClick={handleClickAvatar}
          />
          <div className='overflow-hidden mt-1'>
            <div>
              <p className={cl.title}>{video.title}</p>
              <p className='text-zinc-400 w-full whitespace-nowrap overflow-hidden text-ellipsis'>
                {video.user.username}
              </p>

              <div className='flex gap-2 text-zinc-400 whitespace-nowrap'>
                <div className='flex gap-1'>
                  <p className='max-w-[40px] overflow-hidden text-ellipsis'>
                    {numberFormat(video.views)}
                  </p>
                  <p>просмотров</p>
                </div>
                <p>{dateAgoFormat(video.created_at)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default VideoCard
