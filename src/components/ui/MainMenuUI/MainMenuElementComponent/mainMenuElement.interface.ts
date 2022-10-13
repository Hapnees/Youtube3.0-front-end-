import React from 'react'

export interface IMainMenuElement {
	id: number
	title: string
	icon: React.ReactNode
	isChecked: boolean
	onClick: (id: number) => void
}
