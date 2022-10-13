import React, { ButtonHTMLAttributes, HTMLAttributes } from 'react'

interface DetailButton {
	isSpecial: boolean
	children: React.ReactNode
}

type TypeDivPropsField = ButtonHTMLAttributes<HTMLButtonElement> & DetailButton

export interface IAuthButton extends TypeDivPropsField {}
