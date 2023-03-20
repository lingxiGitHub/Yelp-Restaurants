import "./NotFound.css"
import NotFoundPhoto from "./yelp-not-found.svg";
import NotFoundPic from "./not-found-ss.png"

export default function NotFound() {

    return (
        <div className="not-found-container">
            <div className="not-found-text">
                <div className="sorry">We’re sorry. We can’t find the page you’re looking for.</div>
                <p>Please try a new <span><a href="/" className="not-found-span"> restaurant</a></span>.</p>
            </div>

            <img className="not-found-pic" src={NotFoundPhoto}></img>
        </div>

    )
}