import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";

import store from "./redux/store";
import TopicsMenu from "./components/TopicsMenu";
import CardsArea from "./components/CardsArea";

import "./styles/App.css"; // Import the CSS file

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <div className="App">
          <TopicsMenu className="TopicsMenu" /> {/* Add className here */}
          <CardsArea className="CardsArea" /> {/* Add className here */}
        </div>
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
