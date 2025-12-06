import { useEffect, useState } from "react";
import PageTitle from "../../../components/pageTitle";
import type { UserType } from "../../../interface";
import { Button, Form, Input, message } from "antd";
import { getCurrentUser, updateUserData } from "../../../api-services/users-service";
import { getDateTimeFormat } from "../../../helper";
import { useParams } from "react-router-dom";

function ProfilePage() {
  const [user, setUser] = useState<UserType | null>(null);
  const [editValue, setEditValue] = useState(false);
  const [userData, setUserData] = useState<Partial<UserType>>({});
  const params = useParams<{ id: string }>();

  const getUser = async () => {
    try {
      const response = await getCurrentUser();
      setUser(response.data);
    } catch (error: any) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const renderUserProperty = (label: string, value: any) => (
    <div className="flex flex-col text-sm gap-2">
      <span className="text-gray-500">{label}</span>
      <span className="text-gray-600 font-semibold">{value}</span>
    </div>
  );

  const handleSubmit = async () => {
    try {
      if (!user?._id) return;
      console.log(user?._id)
      await updateUserData(user._id, userData);
      message.success("User updated successfully");
      setEditValue(false);
      getUser();
    } catch (error) {
      message.error("Failed to update user information");
    }
  };

  return (
    <div className="w-full">
      {/* View Mode */}
      <div className={`${editValue ? "hidden" : "grid"}`}>
        <div className=" border border-gray-400 p-10 rounded-2xl">
          <PageTitle title="Profile" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-7">
            {renderUserProperty("User Id", user?._id)}
            {renderUserProperty("Name", user?.name)}
            {renderUserProperty("Email", user?.email)}
            {renderUserProperty(
              "Joined At",
              getDateTimeFormat(user?.createdAt)
            )}
            {renderUserProperty("Role", user?.isAdmin ? "Admin" : "User")}
            <div className="flex items-end">
              <Button
                type="primary"
                onClick={() => {
                  setUserData(user || {});
                  setEditValue(true);
                }}
              >
                Edit Profile
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Mode */}
      <div className={`${editValue ? "grid" : "hidden"}`}>
        <div className="lg:w-3/4 lg:m-auto border border-gray-400 p-10 rounded-2xl">
          <PageTitle title="Edit Profile" />

          <div className=" gap-5 mt-7">
            <Form
              layout="vertical"
              className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-3"
            >
              <Form.Item label="Name">
                <Input
                  placeholder="Name"
                  value={userData.name}
                  onChange={(e) =>
                    setUserData({ ...userData, name: e.target.value })
                  }
                />
              </Form.Item>

              <Form.Item label="Email">
                <Input
                  placeholder="Email"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                />
              </Form.Item>

            </Form>
              <div className="flex items-end justify-between mt-7">
                <Button onClick={() => setEditValue(false)}>
                  Cancel
                </Button>
                <Button type="primary" onClick={() => handleSubmit()}>
                  Save
                </Button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
