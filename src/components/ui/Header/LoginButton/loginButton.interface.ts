import { HTMLAttributes } from 'react'

interface DetailButton {
	isClickedLoginButton: boolean
}

type TypeButtonPropsField = HTMLAttributes<HTMLDivElement> & DetailButton

export interface ILoginButton extends TypeButtonPropsField {}
