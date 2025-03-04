import "../styles/components/BookRideForm.scss";
import { FormEvent, useState } from "react";

export default function BookRideForm() {
    const [pickupLocation, setPickupLocation] = useState("");
    const [destination, setDestination] = useState("");

    const handleOrderRide = (e: FormEvent) => {
        e.preventDefault();
        console.log("Order ride:", {
            pickupLocation,
            destination
        });
    };

    const handleBookFromPrevious = (e: FormEvent) => {
        e.preventDefault();
        console.log("Book from previous");
    };

    return (
        <div className="bookrideformCont">
            <form onSubmit={handleOrderRide}>
                <input 
                    placeholder="Enter pick up location"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                />
                <input 
                    placeholder="Enter destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                />
                <button 
                    type="submit" 
                    className="bookrideformCont_order"
                >
                    Order ride
                </button>
                <button 
                    type="button" 
                    className="bookrideformCont_book"
                    onClick={handleBookFromPrevious}
                >
                    Book from previous
                </button>
            </form>
        </div>
    );
}