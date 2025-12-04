import { useEffect, useState } from "react";
import PageTitle from "../../../../components/pageTitle";
import type { BookingType } from "../../../../interface";
import { message, Table } from "antd";
import {
  cancelBookings,
  getAllBooking,
  getUserBooking,
} from "../../../../api-services/booking-service";
import { getDateTimeFormat } from "../../../../helper";

function AdminBooking() {
  const [bookings, setBooking] = useState<BookingType[]>([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getAllBooking();
      setBooking(response.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      title: "Event Name",
      dataIndex: "event",
      key: "event",
      render: (event: any) => event.name,
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      render: (user: any) => user.name,
    },
    {
      title: "Date and Time",
      dataIndex: "event",
      key: "event",
      render: (event: any) => getDateTimeFormat(`${event.date} ${event.time}`),
    },
    {
      title: "Ticket Type",
      dataIndex: "ticketType",
      key: "ticketType",
    },
    {
      title: "Ticket Count",
      dataIndex: "ticketCount",
      key: "ticketCount",
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
    },
    {
      title: "Booked ON",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => getDateTimeFormat(createdAt),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => status.toUpperCase(),
    },
  ];

  return (
    <div>
      <PageTitle title="Bookings" />

      <Table
        dataSource={bookings}
        columns={columns}
        loading={loading}
        rowKey="_id"
        pagination={false}
      />
    </div>
  );
}

export default AdminBooking;
