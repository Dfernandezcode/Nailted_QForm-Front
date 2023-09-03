import { Icon } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { GlobalProps } from "../models/types";
import AnimatedCircularProgress from "./AnimatedCircularProgress/AnimatedCircularProgress";

const GlobalResult = ({ global }: GlobalProps): React.JSX.Element => {
  const value = parseFloat(((global.points * 100) / global.maxPoints).toFixed(1));
  let color: string = "";

  if (value >= 0 && value <= 30) {
    color = "#d9444d";
  } else if (value >= 31 && value <= 50) {
    color = "#edbd0d";
  } else if (value >= 51 && value <= 100) {
    color = "#0fae6c";
  }

  return (
    <div className="results-page">
      <h1 className="results-page__global-header">GLOBAL</h1>
      <div className="results-page__global-feedback">
        <AnimatedCircularProgress size="150px" targetValue={(global.points * 100) / global.maxPoints} color={color} />
        <div className="results-page__global">
          {global.globalFeedback.map((text) => {
            return (
              <div className="results-page__box" key={text}>
                <Icon as={ChevronRightIcon} marginRight="5px" color="fontColors.secondaryFont" />
                <p key={text} className="results-page__box-text">
                  {text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GlobalResult;
