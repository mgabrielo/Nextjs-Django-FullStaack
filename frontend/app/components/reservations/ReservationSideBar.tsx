"use client";
import { FC, useState, useEffect } from "react";
import { Range } from "react-date-range";
import { apiService } from "@/app/service/apiService";
import useLoginModal from "@/app/hooks/useLoginModal";
import { differenceInDays, eachDayOfInterval, format } from "date-fns";
import CalendarDatePicker from "../calendar/Calendar";
import { getAccessToken } from "@/app/actions/serverActions";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

export type Property = {
  id: string;
  price_per_night: number;
  guests: number;
};
interface ReservationProps {
  userId: string | null;
  property: Property;
}
const ReservationSideBar: FC<ReservationProps> = ({ property, userId }) => {
  const loginModal = useLoginModal();
  const [fee, setFee] = useState<number>(0);
  const [nights, setNights] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [guests, setGuests] = useState<string>("1");
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [minDate, setMinDate] = useState<Date>(new Date());
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const guestRange = Array.from(
    { length: property?.guests },
    (_, index) => index + 1
  );

  const handleDateRange = (selection: any) => {
    const newStartDate = new Date(selection?.startDate);
    const newEndDate = new Date(selection?.endDate);
    if (newEndDate <= newStartDate) {
      newEndDate.setDate(newStartDate.getDate() + 1);
    }
    setDateRange({
      ...dateRange,
      startDate: newStartDate,
      endDate: newEndDate,
    });
  };

  const performBooking = async () => {
    if (userId) {
      if (dateRange.startDate && dateRange.endDate) {
        const selectedStartDate = format(dateRange.startDate, "yyyy-MM-dd");
        const selectedEndDate = format(dateRange.endDate, "yyyy-MM-dd");
        const formData = {
          guests: guests,
          start_date: selectedStartDate,
          end_date: selectedEndDate,
          number_of_nights: nights.toString(),
          total_price: totalPrice.toString(),
          user_id: userId,
        };
        const response = await apiService.postWithToken(
          `/api/properties/book/${property.id}/`,
          JSON.stringify(formData)
        );
        if (response.success) {
          console.log("success-", response);
        } else {
          console.log("something went wrong");
        }
      }
    } else {
      loginModal.open();
    }
  };

  const getReservations = async () => {
    const reservations = await apiService.getWithToken(
      `/api/properties/reservations/${property.id}/`
    );
    let dates: Date[] = [];
    reservations?.length > 0 &&
      reservations.forEach((reservation: any) => {
        const range = eachDayOfInterval({
          start: new Date(reservation?.start_date),
          end: new Date(reservation?.end_date),
        });
        dates = [...dates, ...range];
      });
    setBookedDates(dates);
  };

  useEffect(() => {
    if (property.id) {
      getReservations();
    }
  }, [property.id]);
  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);
      const _guests = parseInt(guests);
      if (dayCount && property.price_per_night) {
        const calculatedFee =
          ((dayCount * (property.price_per_night * _guests)) / 100) * 5;
        setFee(calculatedFee);
        setTotalPrice(
          dayCount * (property.price_per_night * _guests) + calculatedFee
        );
        setNights(dayCount);
      } else {
        const calculatedFee = ((property.price_per_night * _guests) / 100) * 5;
        setFee(calculatedFee);
        setTotalPrice(property.price_per_night * _guests + calculatedFee);
        setNights(1);
      }
    }
  }, [dateRange, guests]);

  return (
    <>
      {/* use or add higher z-index on layouts to make it acessible above the modal that has lesser z-index */}
      <aside className="p-6 mt-6 mb-4 border flex flex-col col-span-2 border-gray-300 shadow-xl rounded-xl z-0">
        <h2 className="mb-3 text-xl">${property?.price_per_night} Per Night</h2>
        <CalendarDatePicker
          value={dateRange}
          bookedDates={bookedDates}
          onChange={(value) => handleDateRange(value?.selection)}
        />
        <div className="mb-4 px-3 py-2 border border-gray-400 rounded-xl">
          <label className="block font-bold text-xs"> Guests</label>
          <select
            className="w-full ml-1 text-sm py-2 mt-1"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          >
            {guestRange.map((guestNumber) => (
              <option key={guestNumber} value={guestNumber}>
                {guestNumber}
              </option>
            ))}
          </select>
        </div>

        <div
          onClick={performBooking}
          className="w-full mb-4 py-4 text-center text-white bg-airbnb hover:bg-airbnb-dark rounded-xl"
        >
          Book
        </div>
        <div className="mb-4 px-2 flex justify-between items-center">
          <p>
            ${property?.price_per_night} * {guests} Nights
          </p>
          <p>${property?.price_per_night * parseInt(guests)}</p>
        </div>
        <div className="mb-4 px-2 flex justify-between items-center">
          <p>Service Fee:</p>
          <p>${fee}</p>
        </div>
        <hr />
        <div className="mt-3 px-2 flex justify-between items-center">
          <p>Total Price:</p>
          <p>${totalPrice}</p>
        </div>
      </aside>
    </>
  );
};

export default ReservationSideBar;
