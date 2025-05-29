import React from "react";
import { Avatar, Card, Descriptions, Typography, Spin, Button } from "antd"; // Assuming Ant Design is used, similar to Wallet.tsx
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  IdcardOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import useAppStore from "../store/AppStore"; // Assuming this is the correct path for AppStore
import { UserData } from "../types"; // Assuming UserData type includes all profile info
// import '../styles/pages/ProfilePage.scss'; // Optional: if you have specific styles

const { Title, Text } = Typography;

const ProfilePage: React.FC = () => {
  const { session } = useAppStore((state) => state);
  const sessionJson: UserData | null = session ? JSON.parse(session) : null;
  const profile = sessionJson?.profile;

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spin size="large" tip="Loading profile..." />
      </div>
    );
  }

  // Mask SSN for display, e.g., show only last 4 digits
  const maskedSSN = profile.socialSecurityNumber
    ? `***-**-${profile.socialSecurityNumber.slice(-4)}`
    : "N/A";

  return (
    <div className="space-y-6">
      <Title level={2}>User Profile</Title>

      <Card title="Account Information" bordered={false} className="shadow-lg">
        {/* Avatar removed from here, the surrounding div is also removed as Descriptions can be a direct child */}
        <div className="flex gap-8">
          <Avatar
            size={150} // Increased size
            src={profile.profileImage || undefined}
            icon={!profile.profileImage && <UserOutlined />}
            className="border-4 border-blue-500 flex-shrink-0" // Increased border thickness
          />
          <Descriptions
            column={1}
            bordered={false}
            labelStyle={{ fontWeight: "bold" }}
          >
            <Descriptions.Item
              label={
                <>
                  <UserOutlined className="mr-2" />
                  Full Name
                </>
              }
            >
              {profile.firstName} {profile.lastName}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <>
                  <MailOutlined className="mr-2" />
                  Email
                </>
              }
            >
              {profile.email}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <>
                  <PhoneOutlined className="mr-2" />
                  Phone Number
                </>
              }
            >
              {/* {profile?.phoneNumber || "N/A"} */}
              {"N/A"}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <>
                  <SafetyCertificateOutlined className="mr-2" />
                  Account Status
                </>
              }
            >
              <Text className="capitalize font-semibold">
                {profile.status || "N/A"}
              </Text>
            </Descriptions.Item>
          </Descriptions>
        </div>
        {/* Removed the closing div tag that previously wrapped Avatar and Descriptions */}
      </Card>

      <Card title="Address Information" bordered={false} className="shadow-lg">
        <Descriptions
          column={{ xs: 1, sm: 1, md: 2 }}
          bordered
          labelStyle={{ fontWeight: "bold" }}
        >
          <Descriptions.Item
            label={
              <>
                <HomeOutlined className="mr-2" />
                Residential Address
              </>
            }
          >
            {profile.residentialAddress || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="City">
            {profile.city || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="State">
            {profile.state || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Postal Code">
            {profile.postalCode || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Country" span={2}>
            {profile.country || "N/A"}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="Security Information" bordered={false} className="shadow-lg">
        <Descriptions column={1} bordered labelStyle={{ fontWeight: "bold" }}>
          <Descriptions.Item
            label={
              <>
                <IdcardOutlined className="mr-2" />
                Social Security Number
              </>
            }
          >
            {maskedSSN}
          </Descriptions.Item>
          {/* Add other security related info if necessary */}
        </Descriptions>
      </Card>

      {/* 
        Placeholder for an Edit Profile button. 
        Actual navigation/modal logic would be implemented later.
      */}
      <div className="text-right mt-6">
        <Button
          type="primary"
          size="large"
          onClick={() => alert("Edit profile functionality to be implemented.")}
        >
          Edit Profile
        </Button>
      </div>
    </div>
  );
};

export default ProfilePage;
