import "../styles/components/BookRideForm.scss";

export default function BookRideForm() {
    return (
        <div className="bookrideformCont">
            <form>
                <input placeholder="Enter pick up location"/>
                <input placeholder="Enter destination"/>
                <button type="submit" className="bookrideForm_order">Order ride</button>
                <button type="submit" className="bookrideForm_book">Book from previous</button>
            </form>
        </div>
    )
}