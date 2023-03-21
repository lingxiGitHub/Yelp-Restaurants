import "./DisplayPhotos.css";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantPhotos } from "../../store/RestaurantPhoto";
import { useEffect } from "react";
import { useState } from "react"

export default function DisplayPhotos({ singleRestaurant }) {

    console.log("@@@@@@", singleRestaurant.id)

    const [isLoaded, setIsLoaded] = useState(false);

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

    console.log("---->", allResPhotoArray)


    return (
        isLoaded && (
            <>
            <h2>Photos for {singleRestaurant.name}</h2>
                <ul className="photo-container">

                    {allResPhotoArray.map(photo => {

                        return (

                            <li className="photo-li">
                                <img className="indi-photo" src={photo.url}></img>
                            </li>
                        )


                    })}
                </ul>
            </>
        )
    )
}