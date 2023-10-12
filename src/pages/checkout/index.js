import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import HelmetCustom from "../../components/HelmetCustom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { clientRoutes } from "../../routes";
import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import LazyImage from "../../components/LazyImage";
import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../../utils/format";
import { calculatePriceForDiscount } from "../../utils/calculatePrice";

import { toastInfo, toastSuccess } from "../../utils/toast";
import { checkPhoneNumber } from "../../utils/validate";
import { addOrderMe, getOrdersMe } from "../../features/order/orderSlice";
import { setIsLoadingComp } from "../../features/loadingCompSlice";
import FormAddress from "../../components/Form/FormAddress";
import { resetFormAddress } from "../../features/formAddressSlice";
function CheckOut() {
  const { cart, countCartItem, total } = useSelector((store) => store.cart);
  const { address } = useSelector((store) => store.formAddress);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, phoneNumber } = address;
    if (fullName.length < 3) return toastInfo("Họ và tên yêu cầu!");
    if (!checkPhoneNumber(phoneNumber))
      return toastInfo("Định dạng số điện thoại không hợp lệ!");
    const productItems = [];
    const ordersLine = [];
    cart.cartItems.forEach((item) => {
      const orderLine = {
        qty: item.qty,
        productItemId: item.productItemId,
        price: calculatePriceForDiscount(
          item.productItem.product.price,
          item.productItem.product.discount
        ),
      };
      const productItem = {
        image:
          process.env.REACT_APP_BACKEND_URL +
          "/static/uploads/" +
          item.productItem.image,
        qty: item.qty,
        price: calculatePriceForDiscount(
          item.productItem.product.price,
          item.productItem.product.discount
        ),
        colorValue: item.productItem.color.value,
        name: item.productItem.product.name,
        slug: item.productItem.product.slug,
      };
      ordersLine.push(orderLine);
      productItems.push(productItem);
    });
    const inputs = {
      productItems,
      ordersLine,
      address,
    };
    dispatch(setIsLoadingComp(true));
    const { payload } = await dispatch(addOrderMe(inputs));
    if (payload.status === 200) {
      toastSuccess(payload.message);
      dispatch(getOrdersMe());
      navigate(clientRoutes.checkout + "/cam-on/" + payload.data.id);
    }
    dispatch(setIsLoadingComp(false));
    dispatch(resetFormAddress());
  };

  return (
    <div className="vh-100 ">
      <HelmetCustom title="Thanh toán" />
      <div className="container w-70 ">
        <Row>
          <Col md={12} xl={8} className="">
            {/* <FontAwesomeIcon className="icon-size-sm  me-3  " /> */}

            <div className="w-100 flex-center">
              <Link
                to={clientRoutes.home}
                className={`logo d-block fs-4 text-white rounded w-15`}
              >
                <LazyImage src="./logo.png" alt="" />
              </Link>
            </div>
            <Row className="">
              <Col md={12} xl={6}>
                <div className="d-flex justify-content-between">
                  <span className="fw-bold text-size-18 mb-3">
                    Thông tin nhận hàng
                  </span>
                  {/* <Link
                    to={clientRoutes.login}
                    className="text-info fw-bold text-size-14"
                  >
                    <FontAwesomeIcon icon={faUser} className="ms-2" /> Đăng nhập
                  </Link> */}
                </div>
                <FormAddress />
              </Col>
              <Col md={12} xl={6} className="">
                <div className=" mt-sm-5 ">
                  <span className="fw-bold text-size-18 mb-3 d-block">
                    Vận chuyển
                  </span>
                  <div className="d-flex justify-content-between align-items-center p-2 border ">
                    <Form.Check
                      type="radio"
                      label={`Giao hàng tận nơi`}
                      checked={true}
                      className="text-size-14 "
                    />
                    <span className="fw-bold text-size-14">40.000đ</span>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="fw-bold text-size-18">Thanh toán</span>
                  <div className="d-flex justify-content-between align-items-center p-2 border ">
                    <Form.Check
                      type="radio"
                      label={"Thanh toán khi giao hàng (COD)"}
                      checked={true}
                      className="text-size-14 "
                    />
                    <span className="fw-bold text-size-14">
                      <FontAwesomeIcon
                        icon={faMoneyBill}
                        className="text-info"
                      />
                    </span>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
          <Col md={12} xl={4} className="px-0">
            <h6 className=" border-bottom text-size-20 fw-bold py-3 px-4 mb-0">
              Đơn hàng ({countCartItem} sản phẩm)
            </h6>

            <Row>
              <Col md={12} className="ps-5">
                <div>
                  {/* ITEM */}
                  {cart.cartItems.map((item, index) => (
                    <div
                      className="d-flex justify-content-between align-items-center border-bottom py-2"
                      key={index}
                    >
                      <div className="d-flex gap-1 align-items-center">
                        <div className=" position-relative">
                          <LazyImage
                            src={
                              process.env.REACT_APP_BACKEND_URL +
                              "/static/uploads/" +
                              item.productItem.image
                            }
                            alt=""
                            style={{ width: "45px" }}
                            className="border border-info rounded-5"
                          />
                          <div className="px-1 text-size-12 rounded-circle w-5 h-5 d-inline-block position-absolute top--10 right-1 bg-info text-white">
                            4
                          </div>
                        </div>
                        <span className="fw-light text-size-14">
                          {item.productItem.product.name}
                        </span>
                      </div>
                      <div className="fw-light text-size-14">
                        {" "}
                        {formatCurrency(
                          calculatePriceForDiscount(
                            item.productItem.product.price,
                            item.productItem.product.discount
                          )
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Col>
              <Col md={12} className="ps-5">
                <div className="d-flex gap-2 justify-content-between py-3 border-bottom">
                  <FloatingLabel
                    controlId="floatingInputGrid"
                    label="Nhập mã sản phẩm"
                  >
                    <Form.Control type="text" placeholder="name@example.com" />
                  </FloatingLabel>
                  <Button disabled variant="info btn-md">
                    Áp dụng
                  </Button>
                </div>
              </Col>
              <Col md={12} className="ps-5">
                <div className="py-3 border-bottom">
                  <div className="d-flex justify-content-between align-items-center">
                    <span>Tạm tính</span>
                    <span>{formatCurrency(total)}</span>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <span>Phí vận chuyển</span>
                    <span>40.000₫</span>
                  </div>
                </div>
              </Col>
              <Col md={12} className="ps-5 mb-10">
                <div className="">
                  <div className="d-flex justify-content-between align-items-center py-3">
                    <span className="text-size-14">Tổng cộng</span>
                    <span className="text-size-16 fw-bold text-info">
                      {formatCurrency(total + 40000)}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <Link
                      to={clientRoutes.cart}
                      className="text-size-14 text-info"
                    >
                      ❮ Quay về giỏ hàng
                    </Link>
                    <Button
                      variant="info"
                      className="text-size-16 fw-bold btn-md"
                      onClick={handleSubmit}
                    >
                      ĐẶT HÀNG
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default CheckOut;
