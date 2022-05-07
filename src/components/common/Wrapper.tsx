import React from 'react'

interface IProps {
	loading?: boolean
	children?: React.ReactNode
	classes?: string
	[x: string]: any
}
const Wrapper: React.FC<IProps> = ({loading, children}, restProp) => {
	if (loading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 my-5"/>
			</div>
		)
	}
	return <div>{children}</div>
}

export default Wrapper
