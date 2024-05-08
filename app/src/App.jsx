import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchResults from "./components/SearchResults";

export const DATA_URL = "http://localhost:9000";

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFood = async () => {
      setLoading(true);
      try {
        const response = await fetch(DATA_URL);
        const json = await response.json();
        setData(json);
        setLoading(false);
      } catch (error) {
        setError("Unable to fetch the data!!");
      }
    };

    fetchFood();
  }, []);

  if (error) return <div>{error}</div>;
  if (loading) return <div>Loading....</div>;

  return (
    <Container>
      <TopContainer>
        <div className="logo">
          <img src="/logo.svg" alt="logo" />
        </div>
        <div className="searchBar">
          <input type="text" placeholder="search food..." />
        </div>
      </TopContainer>

      <FilterContainer>
        <Button>All</Button>
        <Button>Breakfast</Button>
        <Button>Lunch</Button>
        <Button>Dinner</Button>
      </FilterContainer>

      <SearchResults data={data}/>
    </Container>
  );
};

export default App;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const TopContainer = styled.div`
  min-height: 120px;
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
    }
  }
`;

const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding: 20px;
`;

const Button = styled.button`
  background: #ff4343;
  border-radius: 5px;
  border: none;
  padding: 6px 12px;
  color: white;
`;
