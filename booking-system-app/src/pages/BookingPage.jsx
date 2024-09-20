import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import BookingDates from "../BookingDates";

export default function BookingPage() {
    const {id} = useParams();
    const [booking,setBooking] = useState(null);
    useEffect(() => {
        if(id){
            axios.get('/bookings').then(response => {
                const foundBooking = response.data.find(({_id}) => _id === id );
                if(foundBooking){
                    setBooking(foundBooking);
                }
            });
        }
    },[]);

    if(!booking){
        return '';
    }
    return(
        <div className="my-8">
            <h1 className="text-3xl">{booking.place.title}</h1>
            <AddressLink>{booking.place.address}</AddressLink>
            <div className="shadow shadow-gray-400 rounded-2xl p-6 my-6 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold mb-4">Your booking information</h2>
                    <BookingDates booking={booking} />
                </div>
                <div className="bg-primary p-6 rounded-2xl text-center">
                    <div>Total price </div>
                    <div className="text-2xl ">₹{booking.price}</div>
                </div>
            </div>

            <PlaceGallery place={booking.place} />
        </div>
    );
}