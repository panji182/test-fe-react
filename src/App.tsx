import React from 'react';
import 'App.scss';
import { useQuery, gql } from "@apollo/client";

const POKEMON_QUERY = gql`
  {
    getAllPokemon {
      color
      num
    }
  }
`;

function App() {
  const { data } = useQuery(POKEMON_QUERY);

  console.log(18, data);

  return (
    <div className="App">
      Test
    </div>
  );
}

export default App;
