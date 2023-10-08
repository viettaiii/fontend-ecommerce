import navBarSlice from "./navBarSlice";
import authSlice from "./auth/authSlice";
import loadingSlice from "./loadingSlice";
import { combineReducers } from "redux";
import productSlice from "./product/productSlice";
import categorySlice from "./category/categorySlice";
import productFutureLocalSlice from "./productFutureLocal";
import colorSlice from "./color/colorSlice";
import providerSlice from "./provider/providerSlice";
import navSearchSlice from "./navSearchSlice";
import loadingCompSlice from "./loadingCompSlice";
import cartSlice from "./cart/cartSlice";
import orderSlice from "./order/orderSlice";
const rootReducer = combineReducers({
  navBar: navBarSlice,
  auth: authSlice,
  loading: loadingSlice,
  product: productSlice,
  category: categorySlice,
  productFutureLocal: productFutureLocalSlice,
  provider: providerSlice,
  color: colorSlice,
  navSearch: navSearchSlice,
  loadingComp: loadingCompSlice,
  cart: cartSlice,
  order: orderSlice,
});

export default rootReducer;
