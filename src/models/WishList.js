import { types, getParent, destroy } from "mobx-state-tree";

export const WishListItem = types
  .model({
    name: types.string,
    price: types.number,
    image: "",
  })
  .actions((self) => ({
    changeName: (newName) => (self.name = newName),
    changePrice: (newPrice) => (self.price = newPrice),
    changeImage: (newImage) => (self.image = newImage),
    remove: () => getParent(self, 2).remove(self), // two levels up in the state tree
  }));

export const WishList = types
  .model({
    items: types.optional(types.array(WishListItem), []),
  })
  .actions((self) => ({
    add: (item) => self.items.push(item),
    remove: (item) => {
      destroy(item);

      // alternate way
      //self.items.splice(self.items.indexOf(item), 1)}
    },
  }))
  .views((self) => ({
    get totalPrice() {
      return self.items.reduce((sum, entry) => sum + entry.price, 0);
    },
  }));
