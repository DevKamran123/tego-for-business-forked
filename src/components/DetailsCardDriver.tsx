import "../styles/components/DetailsCardDriver.scss";

export default function DetailsCardDriver() {
    return (
        <div className="detailsCardDriver">
            <div className="detailsCardDriver_image"></div>
            <div className="detailsCardDriver_layout">
                <div className="detailsCardDriver_layout_person">
                    <div className="detailsCardDriver_layout_person_name">
                        Charles Alex
                    </div>
                    <div className="detailsCardDriver_layout_person_role">
                        Driver
                    </div>
                </div>

                <div className="detailsCardDriver_layout_car">
                    <div className="detailsCardDriver_layout_car_type">
                        Toyota Venza, Black
                    </div>
                    <div className="detailsCardDriver_layout_car_number">
                        ABC-543 CU
                    </div>
                </div>
            </div>

        </div>
    )
}