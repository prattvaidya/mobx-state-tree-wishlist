import React, { useState } from "react";
import { observer } from "mobx-react";
import "../assets/index.css";
import { WishListView } from "./WishListView";

const App = observer(function App({ group }) {
  const [selectedUser, setSelectedUser] = useState(null);

  const selectUser = (e) =>
    setSelectedUser(group.users.find((u) => u.id === e.target.value));

  return (
    <div>
      <header>
        <h1>WishList</h1>
      </header>
      <button onClick={group.reload}>Reload</button>
      <select onChange={selectUser}>
        <option>Select User</option>
        {group.users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
      {selectedUser && <WishListView wishList={selectedUser.wishList} />}
      {selectedUser && (
        <button onClick={selectedUser.getSuggestions}>Suggestions</button>
      )}
    </div>
  );
});

export default App;
