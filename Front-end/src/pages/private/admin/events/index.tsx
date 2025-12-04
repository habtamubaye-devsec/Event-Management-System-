import PageTitle from "../../../../components/pageTitle";
import { Button, message, Table } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteEvents, getEvents } from "../../../../api-services/events-service";
import { getDateTimeFormat } from "../../../../helper";
import { Pen, Trash } from "lucide-react";

function EventsPage() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getEvents({ searchText: "", date: "" });
      setEvents(response.data);
    } catch (error) {
      message.error("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  const deleteEventHandler = async (id: string) => {
    try {
      setLoading(true);
      await deleteEvents(id);
      message.success("Event Deleted Successfully");
      getData();
    } catch (error) {
      message.error("Failed to delete event");
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
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Date & Time",
      dataIndex: "date",
      render: (date: any, row: any) => {
        return getDateTimeFormat(`${date} ${row.time}`);
      },
      key: "date",
    },
    {
      title: " Organizer",
      dataIndex: "organizer",
      key: "organizer",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (date: any) => getDateTimeFormat(date),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text: any, record: any) => (
        <div className="flex gap-5">
          <Trash
            className="cursor-pointer text-red-700"
            size={16}
            onClick={() => deleteEventHandler(record._id)}
          />
          <Pen
            className="cursor-pointer text-blue-400"
            size={16}
            onClick={() => navigate(`/admin/events/edit/${record._id}`)}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center px-2">
        <PageTitle title="Events" />
        <Button type="default" onClick={() => navigate("/admin/events/create")}>
          Create Events
        </Button>
      </div>

      <Table dataSource={events} columns={columns} loading={loading} />
    </div>
  );
}

export default EventsPage;
