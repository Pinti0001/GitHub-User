import { Fragment, useState } from "react";
import "./App.css";
import UserCard from "./components/user-card/user-card";


export default function App() {
  
  const [inputValue, setInputValue] = useState("");

  const [results, setResults] = useState([]);


  function handleOnChange(event) {
    setInputValue(event.target.value);
  }

  async function onSearchSubmit() {
    const results =  await findGithubAccounts(inputValue);
    setResults(results);

  }

  const API_URL = "https://api.github.com";

  async function findGithubAccounts(query) {
    try {
      const response = await fetch(`${API_URL}/search/users?q=${query}`);
      const json = await response.json();
      return json.items || [];
    } catch (e) {
      throw new Error(e);
    }
  }

  return (
      <main className="main">

        <h2 className="h2"> GitHub Account Finder</h2>

        <div className="search-form">

            <input
              placeholder="Enter Username or Email"
              onChange={handleOnChange}
            />
            <button 
              onClick={onSearchSubmit} 
              >Search</button>

        </div>

          <h3>Results Found 👇 </h3>
          <div id="results">
            <Fragment>
              {results.map((user) => (
                <UserCard
                  profileLink={user.avatar_url}
                  accountLink={user.html_url}
                  username={user.login}
                />
              ))}
            </Fragment>
          </div>
      </main>
  );
}