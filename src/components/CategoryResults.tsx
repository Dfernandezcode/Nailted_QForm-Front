import { Icon } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import "../styles/components/CategoryResults.scss";
import { CategoryProps } from "../models/types";
import AnimatedCircularProgress from "./AnimatedCircularProgress/AnimatedCircularProgress";

const CategoryResult = ({ feedback, name, points, maxPoints }: CategoryProps): React.JSX.Element => {
  const value = parseFloat(((points * 100) / maxPoints).toFixed(1));
  let color: string = "";

  if (value >= 0 && value <= 30) {
    color = "#d9444d";
  } else if (value >= 31 && value <= 50) {
    color = "#edbd0d";
  } else if (value >= 51 && value <= 100) {
    color = "#0fae6c";
  }

  return (
    <div className="category-results">
      <h1 className="category-results__header">{name}</h1>
      <div className="category-results__box">
        <AnimatedCircularProgress size="100px" targetValue={(points * 100) / maxPoints} color={color} />
        <div className="category-results__textarea">
          {feedback.shortText.map((text: string) => {
            return (
              <div key={text} className="category-results__textarea-div">
                <Icon as={ChevronRightIcon} marginRight="5px" color="fontColors.secondaryFont" />
                <p className="category-results__textarea-text">{text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryResult;
