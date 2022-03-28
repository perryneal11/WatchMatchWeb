import "./App.css";
import { Auth } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Header from "./Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieCards from './movieCards'

function App() {
  const signOut = () => {
    Auth.signOut()
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div className="App">
          <Header></Header>

          <Router>
            <Routes>
              <Route
                path="/profile"
                element={<h>hello from profile screen</h>}
              />
              <Route path="/" element={<MovieCards></MovieCards>} />
              <Route
                path="/friends"
                element={<h>hello from friends screen</h>}
              />
            </Routes>
          </Router>

          {/* cards */}
          {/* buttons */}

          {/* friends screen */}
          {/* watchmatch screen */}


        </div>
      )}
    </Authenticator>
  );
}

export default App;
