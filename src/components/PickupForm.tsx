import "../styles/components/PickupForm.scss";

export default function PickupForm() {
    return (
        <div className="pickupformCont">
            <form>
                <input placeholder="Enter pick up location"/>
                <input placeholder="Enter destination"/>
                <button type="submit">Next</button>
                <div className="pickupformCont_text">Go anywhere with RidetEGO.. Request a ride, hop in, and go</div>
            </form>
        </div>
    )
}