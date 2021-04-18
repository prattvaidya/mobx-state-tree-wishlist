import { types } from "mobx-state-tree";

import { WishList } from "./WishList";

export const User = types.model({
  id: types.identifier,
  name: types.string,
  gender: types.enumeration("gender", ["m", "f", "o"]),
  wishList: types.optional(WishList, {}),
  //   gender: types.union(
  //     types.literal("m"),
  //     types.literal("f"),
  //     types.literal("o")
  //   ),
});

export const Group = types.model({
  users: types.array(User),
});
