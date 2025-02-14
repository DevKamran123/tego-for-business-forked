import ride from "../assets/icons/ride.png";
import bag from "../assets/icons/bag.png";
import coupon from "../assets/icons/coupon.png";

export const totalCardItems = [
    {
        image: ride,
        text: "TOTAL RIDES COMPLETED",
        total: 14
    },

    {
        image: coupon,
        text: "TOTAL USED COUPONS",
        total: 4
    },

    {
        image: bag,
        text: "TOTAL REFERRAL POINTS",
        total: 120
    },
]



export interface DeliveryDetails {
    id: number;
    pickupAddress: string;
    couponApplied: string;
    destinationAddress: string;
    distanceInKm: number;
}

export const deliveryDetails: DeliveryDetails = {
    pickupAddress: "235 Palm Street, Detroit",
    couponApplied: "Coupon",
    destinationAddress: "35 Main street, Detroit",
    distanceInKm: 15,
    id: Math.random(),
};

export const deliveryData: DeliveryDetails[] = [
    {
        pickupAddress: "235 Palm Street, Detroit",
        couponApplied: "Coupon",
        destinationAddress: "35 Main street, Detroit",
        distanceInKm: 15,
        id: Math.random(),
    },
    {
        pickupAddress: "235 Palm Street, Hudson",
        couponApplied: "Coupon",
        destinationAddress: "35 Main street, Hudson",
        distanceInKm: 15,
        id: Math.random(),
    },
    {
        pickupAddress: "235 Palm Street, Hertfordshire",
        couponApplied: "Coupon",
        destinationAddress: "35 Main street, Hertfordshire",
        distanceInKm: 15,
        id: Math.random(),
    },
    {
        pickupAddress: "235 Palm Street, Detroit",
        couponApplied: "Coupon",
        destinationAddress: "35 Main street, Detroit",
        distanceInKm: 15,
        id: Math.random(),
    },
]