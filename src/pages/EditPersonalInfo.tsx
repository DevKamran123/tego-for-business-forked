import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PageNotFound from "../components/PageNotFound";
import EditName from "../components/personal-dashboard/EditName";
import EditPhoneNumber from "../components/personal-dashboard/EditPhoneNumber";
import EditEmail from "../components/personal-dashboard/EditEmail";
import ContentPageHeader from "../components/personal-dashboard/ContentPageHeader";

type ViewType = {
  title: string;
  subtitle: string;
  render: () => React.ReactNode;
};

type FieldType = "name" | "phone" | "email";

const componentToRender: Record<FieldType, ViewType> = {
  name: {
    title: "Name",
    subtitle: "How would you like to be addressed?",
    render: () => <EditName />,
  },
  phone: {
    title: "Phone Number",
    subtitle:
      "You'll use this number to get notifications, sign in, and recover your account",
    render: () => <EditPhoneNumber />,
  },
  email: {
    title: "Email",
    subtitle:
      "You'll use this email to receive messages, sign in, and recover your account",
    render: () => <EditEmail />,
  },
};

const EditPersonalInfo = () => {
  const [searchParams] = useSearchParams();
  const key = searchParams.get("field") as FieldType | null;

  const [view, setView] = useState<ViewType | null>(null);

  useEffect(() => {
    if (key && componentToRender[key]) {
      setView(componentToRender[key]);
    } else {
      setView(null);
    }
  }, [key]);

  if (!key || !view) return <PageNotFound />;

  const PageHeader = (
    <div className="w-full">
      <h1 className="text-4xl font-bold text-grayishBlue mb-5">
        {view?.title}
      </h1>
      <p className="text-xl text-black font-normal">{view?.subtitle}</p>
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col">
      <ContentPageHeader
        className="max-w-[550px] mx-auto w-full"
        title={PageHeader}
      />

      <div className="max-w-[550px] mx-auto w-full flex flex-col gap-10 mt-6">
        {view?.render()}
      </div>
    </div>
  );
};

export default EditPersonalInfo;
