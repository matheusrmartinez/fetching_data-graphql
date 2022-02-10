import "./App.css";
import {
ApolloProvider
} from "@apollo/client";
import Form from "./components/Form";
import client from "./services/graphql"
import GetUsers from "./components/GetUsers";

function App() {
  return (
    <ApolloProvider client={client}>
      <GetUsers/>
    </ApolloProvider>
  );
}

export default App;
