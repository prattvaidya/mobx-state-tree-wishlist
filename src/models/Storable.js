import {
  types,
  flow,
  applySnapshot,
  getSnapshot,
  onSnapshot,
} from "mobx-state-tree";

export const Storable = types.model({}).actions((self) => ({
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
