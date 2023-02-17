import "./AddPhoto.css"
import React, {  useState } from "react";
// import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { addPhoto } from "../../store/RestaurantPhoto";
// import { useParams } from 'react-router-dom';

function AddPhotoModal({ restaurantId }) {
    const dispatch = useDispatch();
    // const { restaurantId } = useParams()
    // console.log("restaurantId at add photo modal", restaurantId)
    const [url, setUrl] = useState("");
    const [preview, setPreview] = useState(false);
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal()

    const newPhoto = {
        preview,
        url,

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(addPhoto(newPhoto, restaurantId));
        if (data) {
            // console.log("data",data)
            setErrors(data);
        } else {
            closeModal()
        }
    }

    return (
        <>
            <h1>Add Photo</h1>

            <form onSubmit={handleSubmit}>

                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>

                <label>
                    url
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required

                    />

                </label>

                <label>
                    preview
                    <input
                        type="text"
                        value={preview}
                        onChange={(e) => setPreview(e.target.value)}
                        required

                    />

                 </label>
                <button type="submit">Add Photo</button>
            </form>
        </>
    )


}

export default AddPhotoModal
