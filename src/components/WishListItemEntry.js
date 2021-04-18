import React, { useState } from "react";
import { observer } from "mobx";
import { WishListItemEdit } from "./WishListItemEdit";
import { WishListItem } from "../models/WishList";

export const WishListItemEntry = ({ wishList }) => {
  const emptyEntry = () =>
    WishListItem.create({
      name: "",
      price: 0,
    });
  const [entry, setEntry] = useState(emptyEntry());

  const add = () => {
    wishList.add(entry);
    setEntry(emptyEntry());
  };

  return (
    <div>
      <WishListItemEdit item={entry} />
      <button onClick={add}>Add</button>
    </div>
  );
};
