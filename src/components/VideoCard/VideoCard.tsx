import React from 'react'
import testThumbnail from '../../assets/img/chanell_header.png'
import testAvatar from '../../assets/img/ava.jpg'
import cl from './VideoCard.module.scss'

const VideoCard = () => {
	return (
		<div className={cl.container}>
			<div className={cl.thumbnail__container}>
				<img
					src={testThumbnail}
					alt=''
					className='object-cover h-full w-full rounded-t-md'
				/>
				<div className={cl.duration}>01:08</div>
			</div>

			<div className='flex gap-2 px-3'>
				<img
					src={testAvatar}
					alt=''
					width={55}
					className='rounded-full p-1 border border-zinc-400 h-full'
				/>
				<div className='overflow-hidden mt-1'>
					<div>
						<p className={cl.title}>
							РЕАКЦИЯ ЗУБАРЕВА: ЦИТАТЫ ЗЛОГО КАК СМЫСЛ ЖИЗНИ И фываловыф фывфыв
						</p>
						<p className='text-zinc-400 w-full whitespace-nowrap overflow-hidden text-ellipsis'>
							Thomas Anderson
						</p>

						<div className='flex gap-2 text-zinc-400 whitespace-nowrap'>
							<div className='flex gap-1'>
								<p className='max-w-[40px] overflow-hidden text-ellipsis'>
									1.5
								</p>
								<p>тыс. просмотров</p>
							</div>
							<p>3 недели назад</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default VideoCard
