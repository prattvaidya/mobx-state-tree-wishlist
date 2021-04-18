import { getSnapshot, onSnapshot, onPatch } from "mobx-state-tree";
import { WishList, WishListItem } from "./WishList";
import { reaction } from "mobx";

it("can create an instance of a model", () => {
  const item = WishListItem.create({
    name: "The subtle art of not giving a f***",
    price: 29.99,
    // image:
    //   "https://upload.wikimedia.org/wikipedia/en/b/bd/The_Subtle_Art_of_Not_Giving_a_F%2Ack_by_Mark_Manson_-_Book_Cover.png",
  });

  expect(item.price).toBe(29.99);
  expect(item.image).toBe("");
  item.changeName("Kafka on the Shore");
  expect(item.name).toBe("Kafka on the Shore");
});

it("can create a wishlist", () => {
  const list = WishList.create({
    items: [{ name: "The subtle art of not giving a f***", price: 29.99 }],
  });

  expect(list.items.length).toBe(1);
  expect(list.items[0].price).toBe(29.99);
});

it("can add new items", () => {
  const list = WishList.create();

  const states = [];
  onSnapshot(list, (snapshot) => states.push(snapshot));

  list.add({
    name: "South of the Border, West of the Sun",
    price: 25,
  });

  expect(list.items.length).toBe(1);
  expect(list.items[0].name).toBe("South of the Border, West of the Sun");
  list.items[0].changeName("Maximum City");
  expect(list.items[0].name).toBe("Maximum City");

  expect(getSnapshot(list)).toEqual({
    items: [
      {
        name: "Maximum City",
        price: 25,
        image: "",
      },
    ],
  });

  expect(getSnapshot(list)).toMatchSnapshot();
  expect(states).toMatchSnapshot();
});

it("can add new items - 2", () => {
  const list = WishList.create();

  const patches = [];
  onPatch(list, (patch) => patches.push(patch));

  list.add({
    name: "South of the Border, West of the Sun",
    price: 25,
  });

  list.items[0].changeName("Maximum City");

  expect(patches).toMatchSnapshot();
});

it("can calculate the total price of a wishlist", () => {
  const list = WishList.create({
    items: [
      { name: "The subtle art of not giving a f***", price: 29 },
      { name: "Finding Neverland", price: 43.3 },
    ],
  });

  expect(list.totalPrice).toBe(72.3);

  let changed = 0;

  reaction(
    () => list.totalPrice,
    () => changed++
  );

  expect(changed).toBe(0);
  console.log(list.totalPrice);
  list.items[0].changeName("Test");
  expect(changed).toBe(0);
  list.items[0].changePrice(10);
  expect(changed).toBe(1);
});
