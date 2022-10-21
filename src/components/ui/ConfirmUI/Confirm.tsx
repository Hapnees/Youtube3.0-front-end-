import React, { FC } from 'react'

interface IConfirm {
	message: string
}

const Confirm: FC<IConfirm> = ({ message }) => {
	return (
		<div className='flex gap-1 flex-col'>
			<p>{message}</p>
			{/* <button className='border px-2 self-end'>Отмена</button> */}
		</div>
	)
}

export default Confirm
