import "../assets/index.css";
import { WishListView } from "./WishListView";

function App({ wishList }) {
  return (
    <div>
      <header>
        <h1>WishList</h1>
      </header>
      <WishListView wishList={wishList} />
    </div>
  );
}

export default App;
