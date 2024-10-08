import React, { useContext, useState } from "react";
import "./reserve.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import useFetch from '../../hooks/useFetch';
import { SearchContext } from "../../context/SearchContext";

import { useNavigate } from "react-router-dom";

const Reserve = ({ setOpen, hotelId }) => {
     const [selectedRooms, setSelectedRooms] = useState([]);
     const [showRooms, setShowRooms] = useState(false);
     // eslint-disable-next-line
     const { data, loading, error, reFetch } = useFetch(`/hotels/room/${hotelId}`);
     const {dates} = useContext(SearchContext);
     const navigate = useNavigate();

     const getDatesInRange = (startDate,endDate ) => {
         const start = new Date(startDate);
         const end = new Date(endDate);
        const date = new Date(start.getTime());
        let list = [];
        while(date <= end) {
           list.push(new Date(date).getTime());
           date.setDate(date.getDate() + 1);
        }
        return list
     };
     const alldates = dates && dates[0] ? getDatesInRange(dates[0].startDate, dates[0].endDate) : [];

     const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some((date) =>
           alldates.includes(new Date(date).getTime())
        );
        return !isFound;
     };
     const handleSelect = (e) => {
        const checked = e.target.checked
        const value = e.target.value;
        setSelectedRooms(
           checked ?
             [...selectedRooms, value]
            : selectedRooms.filter((item)=>item !== value)
        );
     };

     const handleShowRooms = () => {
        setShowRooms(true);
     };

     const handleClick = async () => {
        if (selectedRooms.length === 0) {
           alert("Please select at least one room before reserving.");
           return;
        }
        try {
           await reFetch();
           const selectedRoomsData = data.flatMap(item => 
               item.roomNumbers.filter(roomNumber => 
                   selectedRooms.includes(roomNumber._id)
               )
           );
           
           navigate("/bookings", { 
               state: { 
                   hotelId, 
                   selectedRooms: selectedRoomsData, 
                   dates: alldates,
                   hotelData: data
               } 
           });
        } catch (err) {
           console.error("Error processing reservation:", err);
        }
     };
     return (
         <div className="reserve">
             <div className="rContainer">
                 <FontAwesomeIcon 
                 icon={faCircleXmark} 
                 className="rClose" 
                 onClick={() => setOpen(false)} 
                 />
                 <span>Select your rooms:</span>
                 {!showRooms ? (
                     <button onClick={handleShowRooms} className="rButton">Show Room Options</button>
                 ) : (
                     <>
                         {data && data.map((item) => (
                             <div className="rItem" key={item._id}>
                                 <div className="rItemInfo">
                                     <div className="rTitle">{item.title}</div>
                                     <div className="rDesc">{item.desc}</div>
                                     <div className="rMax"> Max people: <b>{item.maxPeople}</b></div>
                                 <div className="rPrice">${item.price}</div>
                                 </div>
                                 <div className="rSelectRooms">
                                 {item.roomNumbers.map((roomNumber) => (
                                     <div className="room" key={roomNumber._id}>
                                         <label>{roomNumber.number}</label>
                                         <input type="checkbox" value={roomNumber._id} onChange={handleSelect} disabled={!isAvailable(roomNumber)}/>
                                     </div>
                                 ))}
                                 </div>
                             </div> 
                         ))}
                         <button onClick={handleClick} className="rButton">Reserve Now!</button>
                     </>
                 )}
             </div>
         </div>
     )
}

export default Reserve;