import React, { useState } from "react";
import {
  clone as mobxClone,
  getSnapshot,
  applySnapshot,
} from "mobx-state-tree";
import { WishListItemEdit } from "./WishListItemEdit";

export const WishListItemView = ({ item }) => {
  const [editing, setEditing] = useState(false);
  const [clone, setClone] = useState(null);

  const renderEditable = () => (
    <li className="item">
      <WishListItemEdit item={clone} />
      <button onClick={cancel}>Cancel</button>
      <button onClick={save}>Done</button>
    </li>
  );
  kw;
  const edit = () => {
    setEditing(true);
    setClone(mobxClone(item));
  };

  const cancel = () => setEditing(false);

  const save = () => {
    applySnapshot(item, getSnapshot(clone));
    setEditing(false);
    setClone(null);
  };

  return editing ? (
    renderEditable()
  ) : (
    <li className="item">
      {item.image && <img src={item.image} />}
      <h3>{item.name}</h3>
      <span>{item.price}</span>
      <button onClick={edit}>Edit</button>
    </li>
  );
};
