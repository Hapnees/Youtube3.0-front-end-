import React from 'react'

export interface IMainMenuCategories {
	id: number
	menuElement: () => React.ReactNode
	isChecked: boolean
}
