import React from 'react'
import cl from './Loader.module.scss'

const Loader = () => {
	return (
		<div className='w-full mt-[100px]'>
			<p className={cl.title}>Загрузка...</p>
			<div className={cl.loader}></div>
		</div>
	)
}

export default Loader
