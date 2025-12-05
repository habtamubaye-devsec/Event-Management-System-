import { useEffect, useState } from "react";
import type { EventType } from "../../../interface";
import { useParams } from "react-router-dom";
import { getEventsById } from "../../../api-services/events-service";
import { message, Spin, Image } from "antd";
import { MapPin, Timer } from "lucide-react";
import {
  getDateFormat,
  getDateTimeFormat,
} from "../../../helper";
import TicketSelection from "./common/ticket-selection";

function EventDetail() {
  const [eventData, setEventData] = useState<EventType | null>(null);
  const [loading, setLoading] = useState(false);
  const params: any = useParams();

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getEventsById(params.id);
      setEventData(response.data);
    } catch (error) {
      message.error("Failed to fetch event");
    } finally {
      setLoading(false);
    }
  };

  const renderEventProperty = (lable: string, value: any) => {
    return (
      <div className="flex flex-col text-sm">
        <span className="text-gray-500">{lable}</span>
        <span className="text-gray-700 font-semibold">{value}</span>
      </div>
    );
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Spin />
      </div>
    );
  }

  return (
    eventData && (
      <div>
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-bold text-gray-600">{eventData?.name}</h1>
          <div className="flex gap-10">
            <div className="flex gap-1 text-gray-500 items-center">
              <MapPin size={12} />
              <span className="text-gray-500 text-xs">
                {eventData?.address} {eventData?.city} {eventData?.pincode}
              </span>
            </div>

            <div className="flex gap-1 text-gray-500 items-center">
              <Timer size={12} />
              <span className="text-gray-500 text-xs items-center">
                {getDateTimeFormat(`${eventData?.date} ${eventData?.time}`)}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
          {eventData?.media.map((media, index) => (
            <Image
              src={media}
              height={220}
              className="object-cover rounded"
              key={index}
            />
          ))}
        </div>

        <div className="mt-7">
          <p className="text-gray-600 text-sm">{eventData?.description}</p>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 p-3 bg-gray-200 mt-7 gap-5">
          {renderEventProperty("Organizer", eventData?.organizer)}
          {renderEventProperty("Address", eventData?.address)}
          {renderEventProperty("City", eventData?.city)}
          {renderEventProperty("Pincode", eventData?.pincode)}
          {renderEventProperty("Date", getDateFormat(eventData.date))}
          {renderEventProperty("Time", eventData?.time)}
        </div>

        <div className=" bg-gray-200 mt-7 gap-5 p-3">
          {renderEventProperty(
            "Guest",
            eventData?.guest[0] ? eventData?.guest.join(", ") : " no guest"
          )}
        </div>

          <div className="mt-3">
            <TicketSelection eventData={eventData}/>
          </div>
        
      </div>
    )
  );
}

export default EventDetail;
  