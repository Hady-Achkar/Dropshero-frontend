//@ts-nocheck

import React, {useEffect, useRef} from 'react'
import {Editor} from '@tinymce/tinymce-react'

interface IProps {
	data: string
	setData: (x: string) => void
}
const TextEditor: React.FC<IProps> = (props) => {
	const {data, setData} = props
	const editorRef = useRef(null)

	useEffect(() => {
		if (editorRef.current) {
			editorRef.current.setContent(data)
		}
	}, [data, editorRef])
	const setEditorContent = () => {
		if (editorRef.current) {
			editorRef.current.setContent(
				'<p><strong>This is the initial content of the editor. rest </strong><span style="background-color: #f1c40f;">asdasd</span></p>'
			)
		}
	}

	return (
		<Editor
			apiKey="30fu80nkgcwnlbm1om8ad1wrfj0ufr1ultv7dxzhuc9l6z38"
			onInit={(evt, editor) => (editorRef.current = editor)}
			onChange={() => setData(editorRef.current.getContent())}
			init={{
				height: 500,
				menubar: false,
				plugins: [
					'advlist autolink lists link image charmap print preview anchor',
					'searchreplace visualblocks code fullscreen',
					'insertdatetime media table paste code help wordcount',
				],
				toolbar:
					'undo redo | formatselect | ' +
					'bold italic backcolor | alignleft aligncenter ' +
					'alignright alignjustify | bullist numlist outdent indent | ' +
					'removeformat | help',
				content_style:
					'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
			}}
		/>
	)
}
export default TextEditor
