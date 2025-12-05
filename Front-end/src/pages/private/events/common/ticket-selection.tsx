import { useState } from "react";
import type { EventType } from "../../../../interface";
import { Button, Input, message, Spin } from "antd";
import { createBooking } from "../../../../api-services/booking-service";
import { useNavigate } from "react-router-dom";

function TicketSelection({ eventData }: { eventData: EventType }) {
  const ticketTypes = eventData.ticketTypes;
  const [selectedTicketType, setSelectedTicketType] = useState<string>("");
  const [selectedTicketCount, setSelectedTicketCount] = useState<number>(1);
  const [maxCount, setMaxCount] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  const selectedTicketPrice = ticketTypes.find(
    (ticketType) => ticketType.name === selectedTicketType
  )?.price;
  
  const navigate = useNavigate()
  const totalAmount = selectedTicketCount * selectedTicketPrice;

  const handleBooking = async () => {
    if (!selectedTicketType) {
      return message.error("Please select a ticket type");
    }
    if (selectedTicketCount > maxCount) {
      return message.error(`Only ${maxCount} tickets available`);
    }

    try {
      setLoading(true);
      const payload = {
        event: eventData._id,
        ticketType: selectedTicketType,
        ticketCount: selectedTicketCount,
        totalAmount: totalAmount,
      };
      const res = await createBooking(payload);
      message.success(res.message || "Booking successful!");
      navigate("/");
    } catch (err: any) {
      message.error(err.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Spin />
      </div>
    );
  }

  return (
    <div>
      <div className="">
        <h1 className="text-sm text-red-700 font-bold">Select tickets type</h1>

        <div className="flex gap-2 mt-3">
          {ticketTypes.map((ticketType, index) => {
            let available = ticketType.available ? ticketType.available : ticketType.limit;
            return (
              <div
                key={index}
                className={`p-2 border border-gray-200 bg-gray-100 w-full cursor-pointer rounded
                    ${
                      selectedTicketType === ticketType.name
                        ? "border-gray-800 border-solid border-2 bg-gray-200"
                        : ""
                    }`}
                onClick={() => {
                  setSelectedTicketType(ticketType.name);
                  setMaxCount(available);
                }}
              >
                <h1 className="text-sm text-gray-700 uppercase">
                  {ticketType.name}
                </h1>
                <div className="flex justify-between">
                  <h1 className="text-sm font-bold">$ {ticketType.price}</h1>
                  <h1 className="text-sm">{ticketType.limit} /{available} left</h1>
                </div>
              </div>
            );
          })}
        </div>

        <h1 className="text-sm text-red-700 font-bold mt-10">
          Select tickets type
        </h1>

        <Input
          type="number"
          value={selectedTicketCount}
          style={{ width: "24rem" }}
          onChange={(e) => setSelectedTicketCount(parseInt(e.target.value))}
          disabled={!selectedTicketType }
          max={maxCount}
          min={0}
        />

        <span className="text-grey-600">
          {selectedTicketCount > maxCount
            ? ` Only ${maxCount} tickets available`
            : ""}
        </span>
        <div className="mt-7 flex justify-between bg-gray-200 rounded border border-gray-400 border-solid p-3">
          <h1 className="text-xs text-gray-500 font-bold">
            Total Amount: ${totalAmount}
          </h1>
          <Button
            type="primary"
            disabled={selectedTicketCount > maxCount || !selectedTicketType}
            onClick={handleBooking}
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TicketSelection;
