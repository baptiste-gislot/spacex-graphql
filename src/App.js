/* eslint-disable react-hooks/rules-of-hooks */
import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  gql,
  ApolloProvider,
  useQuery,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.spacex.land/graphql",
  cache: new InMemoryCache(),
});

const MISSIONS = gql`
  query getFiveMissions {
    launches(limit: 5) {
      id
      launch_date_utc
      launch_success
      rocket {
        rocket_name
      }
      links {
        video_link
      }
      details
    }
  }
`;

const GetLaunches = () => {
  const { loading, error, data } = useQuery(MISSIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return data.launches.map((launch) => (
    <div key={launch.id}>
      <h5>Launch: #{launch.id}</h5>
      <p>{launch.details}</p>
      <p>Rocket: {launch.rocket.rocket_name}</p>
      <a href={launch.links.video_link}>Youtube</a>
    </div>
  ));
};

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <GetLaunches />
      </div>
    </ApolloProvider>
  );
}

export default App;
