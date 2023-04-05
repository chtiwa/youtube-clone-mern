import React, { useEffect } from 'react'
import './messageModal.css'
import { useSelector, useDispatch } from 'react-redux'
import { closeMessageModal } from '../../features/messageModalSlice'

const MessageModal = () => {
	const dispatch = useDispatch()
	const { isMessageModalOpen, success, message } = useSelector(state => state.messageModal)

	useEffect(() => {
		const timer = setTimeout(() => {
			dispatch(closeMessageModal())
			// 3100 ms to let the animation play
		}, [3100])
		return () => clearTimeout(timer)
	}, [dispatch, isMessageModalOpen])

	return (
		<div className={`${isMessageModalOpen ? "message-modal-show" : "message-modal-hide"} ${success ? "success-true" : "success-false"} `} >
			{message}
		</div>
	)
}

export default MessageModal