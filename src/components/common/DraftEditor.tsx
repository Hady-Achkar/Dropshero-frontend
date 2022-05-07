import React, {useState} from 'react'
import {EditorState, ContentState, convertToRaw} from 'draft-js'
import {Editor} from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

interface IProps {
	data: string
	setData: (x: string) => void
}
const DraftEditor: React.FC<IProps> = (props) => {
	const [headline, setHeadline] = useState<string>('')
	const [editorState, setEditorState] = useState<EditorState>(
		EditorState.createEmpty()
	)

	const {data, setData} = props

	return (
		<div>
			<Editor
				editorState={editorState}
				toolbarClassName="toolbarClassName"
				wrapperClassName="border"
				editorClassName="editorClassName"
				toolbarStyle={{direction: 'ltr'}}
				onEditorStateChange={(newState) => {
					setEditorState(newState)
					setData(draftToHtml(convertToRaw(newState.getCurrentContent())))
				}}
			/>
		</div>
	)
}

export default DraftEditor
