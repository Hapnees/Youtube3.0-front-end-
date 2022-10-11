import React, { forwardRef } from 'react'
import { IField } from './authInput.interface'
import cl from './AuthInput.module.scss'

const AuthInput = forwardRef<HTMLInputElement, IField>(
	({ error, ...props }) => {
		return <input {...props} className={cl.input} />
	}
)

AuthInput.displayName = 'AuthInput'

export default AuthInput
