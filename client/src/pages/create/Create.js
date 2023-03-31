import React, { useState, useRef, useEffect } from 'react'
import './create.css'
import { MdUpload } from 'react-icons/md'
// import { AiOutlineCheck } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { openMessageModal } from '../../features/messageModalSlice'
import { useDispatch, useSelector } from 'react-redux'
import { createVideo, createVideoNext } from '../../features/videosSlice'
import Loader from '../../components/loader/Loader'

const Create = () => {
  const { createLoading, videoId, firstStepCompleted, secondStepCompleted } = useSelector(state => state.videos)
  const { theme } = useSelector(state => state.users)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const tagInputRef = useRef()
  const [form, setForm] = useState({ title: "", description: "" })
  const [fileVideo, setFileVideo] = useState("")
  const [fileDataVideo, setFileDataVideo] = useState("")
  const [fileImage, setFileImage] = useState("")
  const [fileDataImage, setFileDataImage] = useState("")
  const [tags, setTags] = useState([])
  const [tag, setTag] = useState("")
  const [textareaError, setTextareaError] = useState(false)
  const [textareaBlur, setTextareaBlur] = useState(false)
  const [tagInputError, setTagInputError] = useState(false)
  const [showTagInputError, setShowTagInputError] = useState(false)
  const [isDragOverVideo, setIsDragOverVideo] = useState(false)
  const [isDragLeaveVideo, setIsDragLeaveVideo] = useState(false)
  const [isDropVideo, setIsDropVideo] = useState(false)
  const [isDragOverImage, setIsDragOverImage] = useState(false)
  const [isDragLeaveImage, setIsDragLeaveImage] = useState(false)
  const [isDropImage, setIsDropImage] = useState(false)
  const [fileUrlVideo, setFileUrlVideo] = useState("")
  const [fileUrlImage, setFileUrlImage] = useState("")
  const [showFileUrlVideo, setShowFileUrlVideo] = useState("")
  const [showFileUrlImage, setShowFileUrlImage] = useState("")
  const [step, setStep] = useState(1)

  useEffect(() => {
    if (firstStepCompleted) {
      setStep(step => step + 1)
    }
    if (secondStepCompleted) {
      navigate(`watch/${videoId}`)
    }
  }, [firstStepCompleted, secondStepCompleted, navigate, videoId, setStep])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleBlur = () => {
    setTextareaBlur(true)
    if (form.description.length < 5 || form.description.length > 300) {
      setTextareaError(true)
    } else {
      setTextareaError(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (step === 1) {
      const formData = new FormData()
      formData.append("description", form.description)
      formData.append("title", form.title)
      formData.append("image", fileDataImage)
      dispatch(createVideo(formData))
    } else if (step === 2) {
      const formData = new FormData()
      formData.append("video", fileDataVideo)
      formData.append("tags", tags)
      if (tags.length > 3) {
        dispatch(openMessageModal({ message: "There must be atleast 3 tags!", success: false }))
      } else {
        dispatch(createVideoNext({ videoId, formData }))
      }
    }
  }

  const handleFileChange = (e, type) => {
    if (type === "video") {
      setFileVideo(e.target.value)
      setFileDataVideo(e.target.files[0])
    } else {
      setFileImage(e.target.value)
      setFileDataImage(e.target.files[0])
    }
    showFile(e.target.files[0], type)
  }

  const handleDragLeave = (type) => {
    if (type === "video") {
      setIsDragLeaveVideo(true)
      setIsDragOverVideo(false)
      setIsDropVideo(false)
    } else {
      setIsDragLeaveImage(true)
      setIsDragOverImage(false)
      setIsDropImage(false)
    }
  }

  const handleDragOver = (e, type) => {
    e.preventDefault()
    if (type === "video") {
      setIsDragLeaveVideo(false)
      setIsDragOverVideo(true)
      setIsDropVideo(false)
    } else {
      setIsDragLeaveImage(false)
      setIsDragOverImage(true)
      setIsDropImage(false)
    }
  }

  const handleFileDrop = (e, type) => {
    e.preventDefault()
    if (type === "video") {
      setFileDataVideo(e.dataTransfer.files[0])
      setIsDragLeaveVideo(false)
      setIsDragOverVideo(false)
      setIsDropVideo(true)
    } else {
      setFileDataImage(e.dataTransfer.files[0])
      setIsDragLeaveImage(false)
      setIsDragOverImage(false)
      setIsDropImage(true)
    }
    showFile(e.dataTransfer.files[0], type)
  }

  const showFile = (fileData, type) => {
    if (type === "video") {
      setIsDropVideo(false)
      if (fileData.size / 1000000 >= 100) {
        dispatch(openMessageModal({ message: "The video size must not exceed 100mb!", success: false }))
        setFileDataVideo("")
        setFileUrlVideo("")
        return
      }
      let fileType = fileData?.type
      let validExtensions = ["video/mp4", "video/mov", "video/webm"]
      if (validExtensions.includes(fileType)) {
        setShowFileUrlVideo(false)
        let fileReader = new FileReader()
        fileReader.readAsDataURL(fileData)
        fileReader.onload = () => {
          let fileUrl = fileReader.result
          setFileUrlVideo(fileUrl)
          // when the url is changed then show the video
          setShowFileUrlVideo(true)
          // let media = new Audio(fileUrl)
          // media.onloadedmetadata = () => {
          // setVideoDuration(media.duration)
          // }
          //    if ((media.duration / 60) <= 0.1) {
          // }
        }
      } else {
        dispatch(openMessageModal({ message: "This video format is not accepted", success: false }))
      }
    } else {
      setIsDropImage(false)
      if (fileData.size / 1000000 >= 100) {
        dispatch(openMessageModal({ message: "The Image size must not exceed 100mb!", success: false }))
        setFileDataImage("")
        setFileUrlImage("")
        return
      }
      let fileType = fileData?.type
      let validExtensions = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
      if (validExtensions.includes(fileType)) {
        setShowFileUrlImage(false)
        let fileReader = new FileReader()
        fileReader.readAsDataURL(fileData)
        fileReader.onload = () => {
          let fileUrl = fileReader.result
          setFileUrlImage(fileUrl)
          // when the url is changed then show the video
          setShowFileUrlImage(true)
        }
      } else {
        dispatch(openMessageModal({ message: "This image format is not accepted", success: false }))
      }
    }
  }

  const handleTagChange = (e) => {
    e.preventDefault()
    setTag(e.target.value)
  }

  const handleAddTag = (e) => {
    if (tags.length > 20) {
      setTagInputError("Tags exceeded the maximum length!")
      setShowTagInputError(true)
      setTimeout(() => {
        setShowTagInputError(false)
      }, [3000]);
      return
    }
    if (e.key === "Enter" && tag.length >= 3 && tag.length <= 20) {
      setTags([...tags, tag])
      setTag("")
    }
  }

  const handleRemoveTag = (index) => {
    setTags(tags.filter((tag, i) => i !== index))
  }

  const handleKeyUp = (e) => {
    console.log(e.key)
    if (e.key === "Enter") {
      e.preventDefault()
    }
  }

  if (createLoading) {
    return <Loader />
  }

  return (
    <div className='create' data-theme={`${theme}`}>
      {step === 1 && (
        <form onSubmit={handleSubmit} className="create-form">
          <div className="form-control-wrapper">
            <div className="form-control">
              <h2>Create a video</h2>
              <b>Step {step}/2</b>
            </div>
            <div className="form-control">
              <input type="text" placeholder='Title' name="title" value={form.title || ""} onChange={handleChange} className="create-title-input" pattern='[a-zA-Z0-9 ]{5,50}' spellCheck="false" required />
              <span className='title-error-message'>Title must be from 5 to 300 characters long and doesn't containt any special characters!</span>
            </div>
            <div className="form-control">
              <textarea type="text" name="description" placeholder='Description' value={form.description || ""} onChange={handleChange} onBlur={handleBlur} className={`${textareaBlur && textareaError ? "red-box-shadow" : "create-description-input"} `} style={{ boxShadow: `${textareaBlur && !textareaError ? "0 0 0 1px var(--blue)" : ""}` }} spellCheck="false" required />
              {textareaBlur && textareaError && (
                <span style={{ display: "block" }} className='description-error-message'>Description must be from 5 to 300 characters long and doesn't contain any special characters!</span>
              )}
            </div>
            <div className="form-control form-control-file" onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleFileDrop}>
              {isDragOverImage ? (
                <span className="create-span" >Release to upload an thumbnail</span>
              ) : (
                <>
                  <span className="create-span" >Drag and drop to upload a thumbnail</span>
                  <h4>Or</h4>
                  <label htmlFor="image">
                    <MdUpload className="form-icon" /> Browse
                  </label>
                </>)}
              {fileUrlImage !== "" && !isDropImage && !isDragOverImage && showFileUrlImage && (
                <img src={fileUrlImage} alt="" />
              )}
              <input type="file" id="image" onChange={handleFileChange} name="image" className="create-file-input" />
              <span className="file-error-message">
                No file was seleted
              </span>
            </div>
            <button type="submit" >Create</button>
          </div>
        </form>
      )}
      {step === 2 && !createLoading && (
        <form className="create-form">
          <div className="form-control-wrapper">
            <div className="form-control">
              <h2>Create video</h2>
              <b>Step {step}/2</b>
            </div>
            <div className="form-control form-control-file" onDragOver={(e) => handleDragOver(e, "video")} onDragLeave={() => handleDragLeave("video")} onDrop={(e) => handleFileDrop(e, "video")}>
              {isDragOverVideo ? (
                <span className="create-span" >Release to upload a video</span>
              ) : (
                <>
                  <span className="create-span" >Drag and drop to upload a video</span>
                  <h4>Or</h4>
                  <label htmlFor="video">
                    <MdUpload className="form-icon" /> Browse
                  </label>
                </>)}
              {fileUrlVideo !== "" && !isDropVideo && !isDragOverVideo && showFileUrlVideo && (
                < video src={fileUrlVideo} />
              )}
              <input type="file" id="video" onChange={(e) => handleFileChange(e, "video")} name="video" className="create-file-input" required />
              {/* <span className="file-error-message">
              No file was seleted
            </span> */}
            </div>
            <div className="form-control">
              <h3>Add tags</h3>
              <ul className="create-tags-list" onKeyDown={handleAddTag} onClick={() => tagInputRef.current.focus()} >
                {tags.map((tag, index) => {
                  return (
                    <li className="create-tags-item" key={index}>
                      <p>{tag}</p>
                      <div className="tags-item-delete" onClick={() => handleRemoveTag(index)} >
                        &#9747;
                      </div>
                    </li>
                  )
                })}
                <input type="text" onChange={handleTagChange} onKeyUp={handleKeyUp} value={tag || ""} className="create-tags-input" pattern='[a-zA-z0-9]{3,20}' spellCheck="false" ref={tagInputRef} min="3" max="20" placeholder='Add tags...' />
              </ul>
              {showTagInputError && (
                <p className="tag-input-error-message">
                  The tag must be from 3 to 20 characters long!
                </p>
              )}
            </div>
            <button onClick={handleSubmit} >Create</button>
          </div>
        </form>
      )}
    </div>
  )
}

export default Create