import React from "react";
import arrowBack from "../../assets/icons/arrow_back.svg";
import { useNavigate } from "react-router-dom";

interface ContentPageHeaderProps {
  title: string | React.ReactNode;
  fallBackRoute?: string;
  showBackBtn?: boolean;
  className?: string;
}

const ContentPageHeader: React.FC<ContentPageHeaderProps> = ({
  title,
  fallBackRoute = "/personal/dashboard",
  showBackBtn = true,
  className = "max-w-[50%] mx-auto w-full",
}) => {
  const navigate = useNavigate();

  const goBack = () => {
    if (window.history.state?.idx > 0) {
      navigate(-1);
    } else {
      navigate(fallBackRoute);
    }
  };

  return (
    <div
      className={`w-full flex ${
        typeof title === "string" && title.trim() !== ""
          ? "items-center"
          : "items-start"
      } relative py-9`}
    >
      {showBackBtn && (
        <button
          onClick={goBack}
          className="absolute left-[8%] 2xl:left-[10%] size-[30px] 2xl:size-[40px] cursor-pointer"
        >
          <img src={arrowBack} alt="arrow back icon" className="w-full" />
        </button>
      )}

      <div className={className}>
        {typeof title === "string" ? (
          <div className="w-full">
            <h1 className="text-2xl 2xl:text-3xl font-bold text-grayishBlue">
              {title}
            </h1>
          </div>
        ) : (
          title
        )}
      </div>
    </div>
  );
};

export default ContentPageHeader;
