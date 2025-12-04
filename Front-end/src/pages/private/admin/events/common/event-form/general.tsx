import { useState } from "react";
import type { EventFormsStepProps } from ".";
import { Form, Input, Button, Tag } from "antd";
import { useNavigate } from "react-router-dom";

function General({
  currentStep,
  setCurrentStep,
  eventData,
  setEventData,
}: EventFormsStepProps) {
  
  const navigate = useNavigate();
  const [guestInputValue, setGuestInputValue] = useState("");

  const onGuestAdd = () => {
    const existingGuest = eventData.guest || [];
    const newGuests = guestInputValue.split(",");
    setEventData({ ...eventData, guest: [...existingGuest, ...newGuests] });
    setGuestInputValue("");
  };

  const onGuestRemove = (index: number) => {
    const existingGuests = eventData.guest || [];
    const newGuest = existingGuests.filter(
      (guest: string, i: number) => i !== index
    );
    setEventData({ ...eventData, guest: newGuest });
  };

  return (
    <div className="flex flex-col gap-5 py-5">
      <Form.Item label="Event Name" required>
        <Input
          placeholder="Event Name"
          value={eventData.name}
          onChange={(e) => setEventData({ ...eventData, name: e.target.value })}
        />
      </Form.Item>

      <Form.Item label="Description" required>
        <Input.TextArea
          placeholder="Description"
          value={eventData.description}
          onChange={(e) =>
            setEventData({ ...eventData, description: e.target.value })
          }
        />
      </Form.Item>

      <Form.Item label="Organizer" required>
        <Input
          placeholder="Organizer"
          value={eventData.organizer}
          onChange={(e) =>
            setEventData({ ...eventData, organizer: e.target.value })
          }
        />
      </Form.Item>

      <Form.Item label="Guest list (comma separated)" required>
        <div className="flex gap-5">
          <Input
            placeholder="Guest list (comma separated) Example: messie, neymar"
            value={guestInputValue}
            onChange={(e) => setGuestInputValue(e.target.value)}
          />
          <Button disabled={!guestInputValue} onClick={onGuestAdd}>
            Add
          </Button>
        </div>
      </Form.Item>

      <div className="flex flex-wrap gap-5">
        {eventData.guest?.map((guest: string, index: number) => (
          <Tag key={guest} closable onClose={() => onGuestRemove(index)}>
            {guest}
          </Tag>
        ))}
      </div>

      <div className="flex gap-10">
        <Button onClick={() => navigate("/admin/events")}>Previous</Button>
        <Button type="primary" onClick={() => setCurrentStep(currentStep + 1)}
          disabled={!eventData.name || !eventData.description || !eventData.organizer }>
          Next
        </Button>
      </div>
    </div>
  );
}

export default General;
