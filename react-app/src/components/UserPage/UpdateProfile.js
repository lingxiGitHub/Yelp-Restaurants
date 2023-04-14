
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { editProfileThunk, getProfileThunk } from '../../store/userprofile'
import { useModal } from '../../context/Modal.js'
import './UpdateProfile.css'

export default function UpdateProfile({user}){
  const dispatch = useDispatch()
  const history = useHistory()
  const { closeModal } = useModal()
  // console.log("user from UserProfilePage", user)
  const [username, setUsername] = useState(user.username)
  const [portrait, setPortrait] = useState(user.portrait)
  const [errors, setErrors] = useState([])


  const handleUpdate = async (e) => {
    e.preventDefault();
    const newUser = {
      username,
      portrait
    }

    const updatedUserProfile = await dispatch(editProfileThunk(newUser, user.id))

    if (typeof(updatedUserProfile) == "number"){
      dispatch(getProfileThunk(user.id))
        .then(closeModal())
    }else{
      setErrors(updatedUserProfile)
    }
    // history.push('/')
  }
  return (
    <div className='update-profile-container'>
      <h2>update profile</h2>
      <div>
        <form className='update-profile-form' onSubmit={handleUpdate}>

        {/* <ul className='errors-container'>
          {errors.map((error, idx) => (
              <li  className='update-profile-errors-item' key={idx}>{error}</li>
          ))}
        </ul> */}

          <lable className='update-profile-item'>
            <span>username:</span>
            <input
              type="string"
              value={username}
              onChange = {(e) => setUsername(e.target.value)}
            />
          </lable>

          <lable className='update-profile-item'>
            <span>portrait:</span>
            <input
              type="string"
              value={portrait}
              onChange = {(e) => setPortrait(e.target.value)}
            />
          </lable>

          <button className='update-profile-button' type="submit"> Submit </button>
        </form>
      </div>

    </div>

  )
}
