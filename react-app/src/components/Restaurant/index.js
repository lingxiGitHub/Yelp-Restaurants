import "./Restaurant.css"

function Restaurant({ restaurant }) {
    return (
        <div className="restaurant-card">
            <img className="square" src={restaurant.previewImage} alt="" />
            <div className="summary">
                <div>{restaurant.name}</div>
                <div>{restaurant.avgRating}</div>
                <div>{restaurant.price}</div>
            </div>


        </div>
    )
}

export default Restaurant
