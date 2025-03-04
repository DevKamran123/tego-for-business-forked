import "../styles/components/OrderRide.scss";

export default function OrderRide() {
    return (
        <div className="orderRide">
            <form>
                <input placeholder="Enter pick up location"/>
                <input placeholder="Enter destination"/>
                <button type="submit" className="order">Order ride</button>
                <button type="submit" className="book">Book from previous</button>
            </form>
        </div>
    )
}