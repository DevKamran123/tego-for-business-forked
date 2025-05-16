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
  className = "max-w-[680px] mx-auto w-full",
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
    <div className="w-full flex items-center relative py-9">
      {showBackBtn && (
        <button
          onClick={goBack}
          className="absolute left-20 xl:left-24 2xl:left-32 size-[25px] md:size-[35px] xl:size-[50px] cursor-pointer"
        >
          <img src={arrowBack} alt="arrow back icon" className="w-full" />
        </button>
      )}

      <div className={className}>
        {typeof title === "string" ? (
          <div className="w-full">
            <h1 className="text-4xl xl:text-5xl font-bold text-grayishBlue">
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
