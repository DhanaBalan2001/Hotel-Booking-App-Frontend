import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import './selectedBookings.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://hotel-booking-app-backend-8e5v.onrender.com/api';

const SelectedBookings = () => {
  const { dates, options } = useContext(SearchContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [confirmedBookings, setConfirmedBookings] = useState([]);

  useEffect(() => {
    if (location.state) {
      const { selectedRooms, hotelData } = location.state;
      const formattedData = selectedRooms.map(room => ({
        _id: room._id,
        hotelName: hotelData[0].title,
        title: `Room ${room.number}`,
        price: hotelData.find(item => item.roomNumbers.some(rn => rn._id === room._id)).price
      }));
      setBookingData(formattedData);
    }
  }, [location.state]);

  const calculateTotalPrice = () => {
    return bookingData.reduce((total, room) => {
      const nights = (new Date(dates[0].endDate).getTime() - new Date(dates[0].startDate).getTime()) / (1000 * 60 * 60 * 24);
      return total + room.price * nights * options.room;
    }, 0);
  };

  const totalAmount = calculateTotalPrice();

  async function onToken(token) {
    setIsProcessing(true);
    try {
      const amountInCents = Math.round(totalAmount * 100);
      const response = await axios.post(`${API_BASE_URL}/bookings/selected`, {
        token,
        amount: amountInCents,
        bookingData,
        dates,
        options
      });
      setPaymentSuccess(true);
      setConfirmedBookings(response.data.bookings || bookingData);
    } catch (error) {
      // Handle payment error (e.g., show error message)
    } finally {
      setIsProcessing(false);
    }
  }

  const handleReturnHome = () => {
    navigate('/');
  };

  return (
    <div className="selected-bookings">
      {paymentSuccess ? (
        <div className="booking-confirmation">
          <h2 className="confirmation-title">Booking Confirmation</h2>
          <p className="confirmation-message">Your payment was successful.</p>
          {confirmedBookings && confirmedBookings.length > 0 ? (
            confirmedBookings.map((item) => (
              <div key={item._id} className="confirmed-booking">
                <h3 className="hotel-name">{item.hotelName}</h3>
                <div className="booking-details">
                  <p><strong>Room:</strong> {item.title}</p>
                  <p><strong>Check-in:</strong> {new Date(dates[0].startDate).toLocaleDateString()}</p>
                  <p><strong>Check-out:</strong> {new Date(dates[0].endDate).toLocaleDateString()}</p>
                  <p><strong>Guests:</strong> {options.adult} Adults, {options.children} Children</p>
                  <p><strong>Rooms:</strong> {options.room}</p>
                  <p><strong>Price per night:</strong> ${item.price}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No confirmed bookings found.</p>
          )}
          <p className="total-amount"><strong>Total Amount Paid:</strong> ${totalAmount}</p>
          <button className="return-home-button" onClick={handleReturnHome}>Return to Home</button>
        </div>
      ) : (
        <>
          <h2 className="bookings-title">Your Selected Hotels and Rooms</h2>
          {bookingData.length === 0 ? (
            <p className="no-bookings">You haven't selected any rooms yet.</p>
          ) : (
            <div className="bookings-grid">
              {bookingData.map((item) => (
                <div key={item._id} className="booking-card">
                  <h3 className="hotel-name">{item.hotelName}</h3>
                  <div className="booking-details">
                    <p><strong>Room:</strong> {item.title}</p>
                    <p><strong>Check-in:</strong> {new Date(dates[0].startDate).toLocaleDateString()}</p>
                    <p><strong>Check-out:</strong> {new Date(dates[0].endDate).toLocaleDateString()}</p>
                    <p><strong>Guests:</strong> {options.adult} Adults, {options.children} Children</p>
                    <p><strong>Rooms:</strong> {options.room}</p>
                    <p className="total-price"><strong>Price per night:</strong> ${item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {bookingData.length > 0 && (
            <div className="payment-section">
              <p className="total-amount"><strong>Total Amount:</strong> ${totalAmount}</p>
              <StripeCheckout
                amount={totalAmount * 100}
                token={onToken}
                currency='USD'
                stripeKey="pk_test_51PofX4JMju3UYc4uD6W6tDJlIUPaFO5FuolZqRUpLpKd075IMhe1KvvqHEXJGFFPJUZqsHHkQGSwrXKvQOk9UMC500pTvtfbsg"
              >
                <button 
                  className="pay-button" 
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Pay Now'}
                </button>
              </StripeCheckout>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SelectedBookings;