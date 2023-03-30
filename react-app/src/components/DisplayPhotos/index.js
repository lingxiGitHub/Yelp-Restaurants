import "./DisplayPhotos.css";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantPhotos, deletePhotoThunk } from "../../store/RestaurantPhoto";
import { useEffect } from "react";
import { useState } from "react";
import { useModal } from "../../context/Modal";
// import { IconName } from "react-icons/fa"；
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHeart } from '@fortawesome/free-regular-svg-icons';
import trashCan from "./trash-can.svg"


export default function DisplayPhotos({ singleRestaurant }) {

    console.log("@@@@@@", singleRestaurant.id)
    const { closeModal } = useModal()
    const [isLoaded, setIsLoaded] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    useEffect(async () => {
        await dispatch(getRestaurantPhotos(singleRestaurant.id))
        setIsLoaded(true)
    }, [dispatch])


    const allResPhotoState = useSelector((state) => {
        return state.photos
    })
    let allResPhotoObj;
    if (allResPhotoState) {
        allResPhotoObj = allResPhotoState.allPhotos
    }

    let allResPhotoArray;
    if (allResPhotoObj) {
        allResPhotoArray = Object.values(allResPhotoObj)
    }

    // console.log("---->", allResPhotoArray)

   

    return (
        isLoaded && (
            <>
                <h2 className="display-h2">Photos for {singleRestaurant.name}</h2>
                <ul className="photo-container">

                    {allResPhotoArray.map(photo => {
                        // console.log(photo)
                        return (

                            <li className="photo-li">
                                <img className="indi-photo" src={photo.url}></img>
                                {sessionUser && +photo.createdByUserId === +sessionUser.id ? (
                                    <button
                                        className="delete-photo"
                                        onClick={async () => {
                                            await dispatch(deletePhotoThunk(photo.id, photo.restaurant_id));
                                            // await closeModal();
                                            getRestaurantPhotos()
                                        }}
                                    >
                                        {/* <img className="trash-can" src={trashCan} alt=""></img> */}
                                        <i class="fa-regular fa-trash-can"></i>
                                        Remove Photo</button>
                                ):(
                                    <div className="empty-holder"></div>
                                )}
                            </li>
                        )


                    })}
                </ul>
            </>
        )
    )
}