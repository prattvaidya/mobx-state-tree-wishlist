import React from "react";
import { observer } from "mobx-react";
import { WishListItemView } from "./WishListItemView";
import { WishListItemEntry } from "./WishListItemEntry";

export const WishListView = observer(({ wishList }) => {
  return (
    <div className="list">
      <ul>
        {wishList.items.map((item, idx) => (
          <WishListItemView key={idx} item={item} />
        ))}
      </ul>
      Total: {wishList.totalPrice}
      <WishListItemEntry wishList={wishList} />
    </div>
  );
});
