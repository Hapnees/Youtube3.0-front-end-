import React, { forwardRef } from 'react'
import { IField } from './authInput.interface'
import cl from './AuthInput.module.scss'
import { BiErrorCircle } from 'react-icons/bi'

const AuthInput = forwardRef<HTMLInputElement, IField>(
	({ error, ...props }, ref) => {
		return (
			<div>
				<input {...props} className={cl.input} ref={ref} />
				{error?.message && (
					<div className='flex items-center gap-1 mt-1'>
						<BiErrorCircle color='#e84545' size={18} />
						<p className='text-[#e84545] font-medium tracking-wide'>
							{error.message}
						</p>
					</div>
				)}
			</div>
		)
	}
)

AuthInput.displayName = 'AuthInput'

export default AuthInput
