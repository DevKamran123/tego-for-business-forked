import "../styles/components/DetailsCardPassenger.scss";

export default function DetailsCardPassenger() {
    return (
        <div className="detailsCardPassenger">
            <div className="detailsCardPassenger_image"></div>
            <div className="detailsCardPassenger_layout">
                <div className="detailsCardPassenger_layout_person">
                    <div className="detailsCardPassenger_layout_person_name">
                        Charles Alex
                    </div>
                    <div className="detailsCardPassenger_layout_person_role">
                        Primary passenger
                    </div>
                </div>

                {/* <div className="detailsCardPassenger_layout_car">
                    <div className="detailsCardPassenger_layout_car_type">
                        Toyota Venza, Black
                    </div>
                    <div className="detailsCardPassenger_layout_car_number">
                        ABC-543 CU
                    </div>
                </div> */}
            </div>

        </div>
    )
}