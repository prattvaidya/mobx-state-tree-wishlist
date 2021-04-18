import React, { useState } from "react";
import "../assets/index.css";
import { WishListView } from "./WishListView";

function App({ group }) {
  const [selectedUser, setSelectedUser] = useState(null);

  const selectUser = (e) =>
    setSelectedUser(group.users.find((u) => u.id === e.target.value));

  return (
    <div>
      <header>
        <h1>WishList</h1>
      </header>
      <select onChange={selectUser}>
        <option>Select User</option>
        {group.users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
      {selectedUser && <WishListView wishList={selectedUser.wishList} />}
    </div>
  );
}

export default App;
