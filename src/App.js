import logo from './logo.png';
import './App.css';

// 1. import react hook that shares data with my UI
import { useQuery, gql } from '@apollo/client'

// 2. Define the query
const GET_LOCATIONS = gql `
  query getLocations {
    locations {
      id
      name
      description
      photo
    }
  }
`;

// 3. Define the component that uses that query
function DisplayLocation() {
  const { loading, error, data } = useQuery(GET_LOCATIONS);

  if (loading) {return <p>Loading....</p>};
  if(error) {return <p>Error</p>};

  return data.locations.map(({id, name, description, photo}) => (
    <div key={id}>
      <h3>{name}</h3>
      <img width="400" height="250" alt="location-reference" src={photo}/>
      <p>{description}</p>
    </div>
  ));

}

// 4. show in app 
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Learning Apollo Client + GraphQL</h1>
        <img width="400" src={logo} alt="logo" />
      </header>
      <body className="App-body">
        <DisplayLocation />
      </body>
    </div>
  );
}

export default App;
