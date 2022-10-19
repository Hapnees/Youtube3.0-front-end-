import React from 'react'
import cl from './Loader.module.scss'

const Loader = () => {
	return (
		<div className='w-full mt-[100px] flex justify-center'>
			<div className='flex flex-col items-center gap-12'>
				<p className={cl.title}>Загрузка...</p>
				<div className={cl.loader}>
					<span></span>
					<span></span>
					<span></span>
				</div>
			</div>
		</div>
	)
}

export default Loader
