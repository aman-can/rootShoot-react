import { useState } from "react";
import { IoPricetagsSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import {
	useAuth,
	useLoaderOrToast,
	useWishlistAndCart,
} from "../../../../context";
import { displayRazorpay, clearCart as empty } from "../../../../utils";
import { CouponsModal } from "../CouponsModal/CouponsModal";

export const PriceDetails = () => {
	const { cart, setCart } = useWishlistAndCart();
	const { currentUser } = useAuth();
	const { setToastMessage } = useLoaderOrToast();
	const [couponModal, setCouponModal] = useState(false);
	const navigate = useNavigate();
	const [couponDiscount, setCouponDiscount] = useState(0);

	const totalPrice = cart.reduce(
		(acc, curr) => acc + curr.price * curr.qty,
		0
	);
	const deliveryCharge = 199;

	const totalMRP = totalPrice - couponDiscount + deliveryCharge;

	const clearCart = () => empty(cart, setCart, setToastMessage);

	return (
		<div className="card">
			<div className="card-header text-align-center">
				<h3 className="card-title heading-5">
					PRICE DETAILS
					{` (${cart.length} ${
						cart.length > 1 ? "products" : "product"
					})`}
				</h3>
			</div>
			{!couponDiscount && (
				<label>
					<IoPricetagsSharp />
					<input
						onFocus={(e) => {
							e.target.blur();
							setCouponModal(true);
						}}
						type="text"
						placeholder="Coupon Code"
					/>
				</label>
			)}

			<div className="divider-dark-horizontal" />
			<div className="card-body">
				<div className="card-text text-gutterBottom">
					<div className="cart-price-pair">
						<p>Total MRP</p>
						<p>{`₹ ${totalPrice}`}</p>
					</div>
					{!!couponDiscount && (
						<div className="cart-price-pair">
							<div className="price-coupon-remove">
								<p>Discount</p>
								<p
									className="text-caption"
									onClick={() => setCouponDiscount(0)}>
									Remove
								</p>
							</div>
							<p>{`₹ ${couponDiscount}`}</p>
						</div>
					)}
					<div className="cart-price-pair">
						<p>Delivery Charge</p>
						<p>{`₹ ${deliveryCharge}`}</p>
					</div>

					<div className="heading-6 cart-price-pair">
						<p>Total Price</p>
						<p>{`₹ ${totalMRP}`}</p>
					</div>
				</div>
				<div className="divider-dark-horizontal" />
				<div className="card-actions">
					<button
						onClick={() =>
							displayRazorpay(
								currentUser,
								totalMRP,
								navigate,
								clearCart,
								setCouponDiscount,
								setToastMessage
							)
						}
						className="btn-filled-green rootShoot-full-width text-align-center">
						make payment
					</button>
				</div>
			</div>
			{couponModal && (
				<CouponsModal
					totalMRP={totalMRP}
					setCouponDiscount={setCouponDiscount}
					setCouponModal={setCouponModal}
				/>
			)}
		</div>
	);
};
