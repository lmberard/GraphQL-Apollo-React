import React, { useState } from "react";
import logo from './logo.png';
import './App.css';
import { gql, useQuery } from '@apollo/client';

const GET_DOGS = gql`
  query getDogs {
    dogs {
      id
      breed
    }
  }
`;

const GET_DOG_PHOTO = gql`
  query Dog($breed: String!) {
    dog(breed: $breed) {
      id
      displayImage
    }
  }
`;

function Dogs({ onDogSelected }) {
  const { loading, error, data } = useQuery(GET_DOGS);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error}`;

  return (
    <select name='dog' onChange={onDogSelected}>
      {data.dogs.map((dog) => (
        <option key={dog.id} value={dog.breed}>
          {dog.breed}
        </option>
      ))}
    </select>
  );
}

function DogPhoto({breed}) {
  const { loading, error, data } = useQuery(GET_DOG_PHOTO, {
    variables: { breed }
  });

  if (loading) return null;
  if (error) return `Error! ${error}`;

  return (
    <img src={data.dog.displayImage} alt="dog" style={{ height: 300}}/>
  );
  
}

function FirstDog({ onDogSelected }) {
  const { loading, error, data } = useQuery(GET_DOGS);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  // console.log();
  return (
    <p>First in the array: {data.dogs[0].breed}</p>
  );
}

function App() {
  const [selectedDog, setSelectedDog] = useState(null);

  function onDogSelected({target}){
    setSelectedDog(target.value);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Learning Apollo Client + GraphQL</h1>
        <img width="400" src={logo} alt="logo" />
        <h2>Queries</h2>
      </header>

      <body className="App-body">
        <Dogs onDogSelected={onDogSelected}/>
        <FirstDog />
        {selectedDog && <DogPhoto breed={selectedDog}/>}
      </body>

    </div>
  );
}

export default App;
