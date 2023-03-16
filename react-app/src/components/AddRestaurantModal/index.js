import "./AddRestaurant.css"
import React, { useState } from "react";
// import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from 'react-router-dom';
import { addRestaurantThunk } from "../../store/restaurants";



function AddRestaurantModal() {
    const dispatch = useDispatch();
    const history = useHistory();
    // const [user_id, setUser_id] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("$")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [zipcode, setZipcode] = useState("")
    const [country, setCountry] = useState("")
    const [phone_number, setPhone_number] = useState("")
    const [description, setDescription] = useState("")
    const [website, setWebsite] = useState("")
    const [url, setUrl] = useState("")
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
    const sessionUser = useSelector(state => state.session.user)
    // console.log("sessionUser.id", sessionUser.id)


    const handleSubmit = (e) => {
        e.preventDefault();

        const newRestaurant = {
            user_id: sessionUser.id,
            name,
            price,
            address,
            city,
            state,
            zipcode,
            country,
            phone_number,
            description,
            website,
            url

        }



        return dispatch(addRestaurantThunk(newRestaurant))
            .then(createdRestaurantId => { history.push(`/${createdRestaurantId}`); closeModal() })
            .catch(
                async (res) => {
                    const data = await res.json();
                    // console.log("data", data.errors)
                    if (data && data.errors) setErrors(data.errors);
                }
            )
    }


    return (
        <>
            <h2 className="add-restaurant-text">Add Restaurant</h2>

            <form className="add-restaurant-form" onSubmit={handleSubmit}>

                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>


                <label>
                    <span>Name</span>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required

                    />

                </label>

                <label>
                    <span>Price</span>
                    <select
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                    >
                        <option value="$">$</option>
                        <option value="$$">$$</option>
                        <option value="$$$">$$$</option>
                        <option value="$$$$">$$$$</option>
                        <option value="$$$$$">$$$$$</option>

                    </select>

                </label>

                <label>
                    <span>Address</span>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required

                    />

                </label>

                <label>
                    <span>City</span>
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required

                    />

                </label>

                <label>
                    <span>State</span>
                    <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required

                    />

                </label>

                <label>
                    <span>Zipcode</span>
                    <input
                        type="number"
                        value={zipcode}
                        onChange={(e) => setZipcode(e.target.value)}
                        required

                    />

                </label>

                <label>
                    <span>Country</span>
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required

                    />

                </label>

                <label>
                    <span>Phone number</span>
                    <input
                        type="text"
                        value={phone_number}
                        onChange={(e) => setPhone_number(e.target.value)}
                        required

                    />

                </label>




                <label>
                    <span>website</span>
                    <input
                        type="text"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        required

                    />

                </label>

                <label>
                    <span>Preview Image Url</span>
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required

                    />

                </label>

                <label>
                    <span>Description</span>
                    <input
                        type="textarea"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required

                    />

                </label>

                <button type="submit">Add Business</button>
            </form>
        </>
    )


}

export default AddRestaurantModal
