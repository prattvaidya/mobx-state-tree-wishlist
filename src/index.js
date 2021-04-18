import React from "react";
import ReactDOM from "react-dom";
import { onSnapshot } from "mobx-state-tree";
import "./assets/index.css";
import App from "./components/App";
import { WishList } from "./models/WishList";

let initialState = {
  items: [],
  // [
  //   {
  //     name: "The subtle art of not giving a f***",
  //     price: 29,
  //     // image:
  //     //   "https://upload.wikimedia.org/wikipedia/en/b/bd/The_Subtle_Art_of_Not_Giving_a_F%2Ack_by_Mark_Manson_-_Book_Cover.png",
  //   },
  //   { name: "Finding Neverland", price: 43.3 },
  // ],
};

if (localStorage.getItem("wishlistapp")) {
  const json = JSON.parse(localStorage.getItem("wishlistapp"));
  if (WishList.is(json)) initialState = json;
}

const wishList = WishList.create(initialState);

onSnapshot(wishList, (snapshot) =>
  localStorage.setItem("wishlistapp", JSON.stringify(snapshot))
);

ReactDOM.render(
  <React.StrictMode>
    <App wishList={wishList} />
  </React.StrictMode>,
  document.getElementById("root")
);

// setInterval(() => {
//   wishList.items[0].changePrice(wishList.items[0].price + 1);
// }, 1000);
