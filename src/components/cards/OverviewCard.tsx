import React from "react";
import Stack from "../stack/Stack"
import "../../styles/components/cards/OverviewCard.scss";
import CardWrapper from "./CardWrapper";

interface OverviewCardProps {
  title: string;
  value: React.ReactNode; // Changed type from string to React.ReactNode
  icon: React.ReactNode;
}

const OverviewCard: React.FC<OverviewCardProps> = (props) => {
  return (
    <CardWrapper className="overview_card">
      <Stack gap={14} classnames="overview_card_title_wrapper">
        {props.icon}
        <p className="overview_card_title">{props.title}</p>
      </Stack>
      <p className="overview_card_value">{props.value}</p>
    </CardWrapper>
  );
};

export default OverviewCard;
