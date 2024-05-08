/* eslint-disable react/prop-types */
import styled from "styled-components";
import { DATA_URL } from "../App";

const SearchResults = ({ data }) => {
  return (
    <CardContainer>
      <FoodCards>
        {data?.map((food) => (
          <Card key={food.name}>
            <div className="food_image">
                <img src={DATA_URL + food.image} alt="FoodImage" />
            </div>
            <div className="food_info"></div>
          </Card>
        ))}
      </FoodCards>
    </CardContainer>
  );
};

export default SearchResults;

const CardContainer = styled.section`
  height: calc(100vh - 190px);
  background-image: url("/bg.png");
  background-size: cover;
`;

const FoodCards = styled.div``;
const Card = styled.div``;
