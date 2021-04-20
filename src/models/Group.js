import {
  types,
  flow,
  applySnapshot,
  getSnapshot,
  onSnapshot,
} from "mobx-state-tree";

import { WishList } from "./WishList";

export const User = types
  .model({
    id: types.identifier,
    name: types.string,
    gender: types.enumeration("gender", ["m", "f", "o"]),
    wishList: types.optional(WishList, {}),
    recipient: types.maybeNull(types.reference(types.late(() => User))),
    //   gender: types.union(
    //     types.literal("m"),
    //     types.literal("f"),
    //     types.literal("o")
    //   ),
  })
  .actions((self) => ({
    getSuggestions: flow(function* () {
      const response = yield window.fetch(
        `http://localhost:3001/suggestions_${self.gender}`
      );
      const suggestions = yield response.json();
      self.wishList.items.push(...suggestions);
    }),
    save: flow(function* save() {
      try {
        yield window.fetch(`http://localhost:3001/users/${self.id}`, {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(getSnapshot(self)),
        });
      } catch (error) {
        console.log("Something went wrong" + error);
      }
    }),
    afterCreate() {
      onSnapshot(self, self.save);
    },
  }));

export const Group = types
  .model({
    users: types.array(User),
  })
  .actions((self) => {
    let controller;
    return {
      afterCreate() {
        self.load();
      },
      load: flow(function* load() {
        controller = new window.AbortController();
        try {
          const response = yield window.fetch(`http://localhost:3001/users`, {
            signal: controller.signal,
          });
          applySnapshot(self.users, yield response.json());
        } catch (e) {
          console.log("aborted", e.name);
        }
      }),
      reload() {
        // abort current request
        controller.abort();
        self.load();
      },
      beforeDestroy() {
        if (controller) controller.abort();
      },
      drawLots() {},
    };
  });
