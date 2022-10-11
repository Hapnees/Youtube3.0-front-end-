import React from 'react'
import { useForm } from 'react-hook-form'
import { ILoginFields } from '../../../models/loginFields.interface'
import AuthInput from '../../ui/AuthForm/AuthInput/AuthInput'

const Login = () => {
	const { register } = useForm<ILoginFields>()

	return (
		<div className='absolute'>
			<p>Вход</p>

			<form>
				<AuthInput />
			</form>
		</div>
	)
}

export default Login
