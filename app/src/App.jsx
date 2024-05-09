/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchResults from "./components/SearchResults";

export const DATA_URL = "http://localhost:9000";

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [selectedBtn, setSelectedBtn] = useState("all");

  useEffect(() => {
    const fetchFood = async () => {
      setLoading(true);
      try {
        const response = await fetch(DATA_URL);
        const json = await response.json();
        setData(json);
        setFilteredData(json);
        setLoading(false);
      } catch (error) {
        setError("Unable to fetch the data!!");
      }
    };

    fetchFood();
  }, []);

  const searchFood = (e) => {
    const searchValue = e.target.value;

    if (searchValue === "") {
      setFilteredData(null);
    }

    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    setFilteredData(filter);
  };

  const filterFood = (type) => {
    if (type === "all") {
      setFilteredData(data);
      setSelectedBtn("all");
      return;
    }

    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilteredData(filter);
    setSelectedBtn(type);
  };

  const filterBtns = [
    {
      name: "All",
      type: "all",
    },
    {
      name: "Breakfast",
      type: "breakfast",
    },
    {
      name: "Lunch",
      type: "lunch",
    },
    {
      name: "Dinner",
      type: "dinner",
    },
  ];

  if (error) return <div>{error}</div>;
  if (loading) return <div>Loading....</div>;

  return (
    <>
      <Container>
        <TopContainer>
          <div className="logo">
            <img src="/logo.svg" alt="logo" />
          </div>
          <div className="searchBar">
            <input
              onChange={searchFood}
              type="text"
              placeholder="search food..."
            />
          </div>
        </TopContainer>

        <FilterContainer>
          {filterBtns.map((value) => (
            <Button
              isSelected={selectedBtn === value.type}
              key={value.name}
              onClick={() => filterFood(value.type)}
            >
              {value.name}
            </Button>
          ))}
        </FilterContainer>
      </Container>

      <SearchResults data={filteredData} />
    </>
  );
};

export default App;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const TopContainer = styled.div`
  height: 120px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;

  .searchBar {
    input {
      background: transparent;
      border: 1px solid red;
      color: white;
      border-radius: 5px;
      height: 35px;
      font-size: 16px;
      padding: 10px;

      &::placeholder {
        color: #ffff;
      }
    }
  }

  @media (0 < width < 600px) {
    flex-direction: column;
    height: 100px;
  }
`;

const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding: 20px;
`;

export const Button = styled.button`
  background: ${({ isSelected }) => (isSelected ? "#ee3232" : "#ff4343")};
  outline: 1px solid ${({ isSelected }) => (isSelected ? "#ffff" : "#ff4343")};
  border-radius: 5px;
  border: none;
  padding: 6px 12px;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #ee3232;
  }
`;
