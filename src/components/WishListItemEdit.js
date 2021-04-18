import React from "react";
import { observer } from "mobx-react";

export const WishListItemEdit = observer(({ item }) => {
  const onNameChange = (e) => item.changeName(e.target.value);
  const onPriceChange = (e) => {
    const price = parseInt(e.target.value);
    if (!isNaN(price)) item.changePrice(parseInt(price));
  };
  const onImageChange = (e) => item.changeImage(e.target.value);

  return (
    <div className="item-edit">
      Thing: <input value={item.name} onChange={onNameChange} />
      <br />
      Price: <input value={item.price} onChange={onPriceChange} />
      <br />
      Image: <input value={item.image} onChange={onImageChange} />
      <br />
    </div>
  );
});
