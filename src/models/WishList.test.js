import { WishList, WishListItem } from "./WishList";

it("can create an instance of a model", () => {
  const item = WishListItem.create({
    name: "The subtle art of not giving a f***",
    price: 29.99,
    // image:
    //   "https://upload.wikimedia.org/wikipedia/en/b/bd/The_Subtle_Art_of_Not_Giving_a_F%2Ack_by_Mark_Manson_-_Book_Cover.png",
  });

  expect(item.price).toBe(29.99);
  expect(item.image).toBe("");
});

it("can create a wishlist", () => {
  const list = WishList.create({
    items: [{ name: "The subtle art of not giving a f***", price: 29.99 }],
  });

  expect(list.items.length).toBe(1);
  expect(list.items[0].price).toBe(29.99);
});
