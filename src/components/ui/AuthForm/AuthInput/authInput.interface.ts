import { InputHTMLAttributes } from 'react'
import { FieldError } from 'react-hook-form'

interface IAuthInput {
	error?: FieldError
}

type TypeInputPropsField = InputHTMLAttributes<HTMLInputElement> & IAuthInput

export interface IField extends TypeInputPropsField {}
