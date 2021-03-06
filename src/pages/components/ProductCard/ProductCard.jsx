import { FaStar } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import {
	useAuth,
	useLoaderOrToast,
	useWishlistAndCart,
} from "../../../context";
import { addToCartOrWishlist, buyNow } from "../../../utils";
import "./productCard.css";

export const ProductCard = ({ cardType, product, title }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const { cart, wishlist, setWishlist, setCart } = useWishlistAndCart();
	const { currentUser } = useAuth();
	const { setIsLoading, setToastMessage } = useLoaderOrToast();
	const { _id, rating, imgUrl, price, type } = product;

	return (
		<div
			className={`card-hover rootShoot-${cardType}-card`}
			onClick={() => {
				if (cardType === "types") {
					return navigate(`/products/type/${_id}`);
				}
				if (cardType === "prods") {
					return navigate(`/products/${_id}`);
				}
			}}>
			<div
				className={`card-body${
					cardType === "prods" ? "-horizontal" : ""
				}`}>
				<div
					className={`card-badge-${
						cardType === "types"
							? "green rootShoot-types-card-badge"
							: "yellow"
					}`}>
					{cardType === "types" ? (
						`${
							title.charAt(0).toUpperCase() + title.slice(1)
						} Plants`
					) : (
						<>
							{rating}&nbsp;
							<FaStar />
						</>
					)}
				</div>
				<img
					src={imgUrl}
					alt={title}
					className={`card-${
						cardType === "prods" ? "side" : "top"
					}-image rootShoot-${cardType}-card-img`}
				/>
				{cardType === "prods" && (
					<div className="card-side-content">
						<h2 className="card-title text-noWrap">
							{`${
								title.charAt(0).toUpperCase() + title.slice(1)
							}`}
						</h2>
						<p className="card-subtitle rootShoot-full-width">{`${type}`}</p>
						<p className="card-title heading-6 rootShoot-full-width">{`₹${price}`}</p>
						<div className="card-actions">
							<div className="card-btns">
								<button
									onClick={(e) => {
										e.stopPropagation();
										if (currentUser?.encodedToken) {
											!cart.some(
												(item) => item._id === _id
											) &&
											!wishlist.some(
												(item) => item._id === _id
											)
												? addToCartOrWishlist(
														"cart",
														product,
														setCart,
														setIsLoading,
														setToastMessage
												  )
												: wishlist.some(
														(item) =>
															item._id === _id
												  )
												? buyNow(
														cart,
														product,
														setCart,
														setIsLoading,
														setToastMessage,
														navigate,
														currentUser
												  )
												: navigate("/cart");
										} else
											navigate("/sign-in", {
												state: {
													from: location.pathname,
												},
											});
									}}
									className="btn-filled-green rootShoot-full-width text-align-center">
									{wishlist.some((item) => item._id === _id)
										? "buy now"
										: cart.some((item) => item._id === _id)
										? "go to cart"
										: "Add to cart"}
								</button>
								<button
									onClick={async (e) => {
										e.stopPropagation();
										if (currentUser?.encodedToken) {
											!wishlist.some(
												(item) => item._id === _id
											)
												? addToCartOrWishlist(
														"wishlist",
														product,
														setWishlist,
														setIsLoading,
														setToastMessage
												  )
												: navigate("/wishlist");
										} else
											navigate("/sign-in", {
												state: {
													from: location.pathname,
												},
											});
									}}
									className="btn-outlined-green rootShoot-full-width text-align-center">
									{!wishlist.some((item) => item._id === _id)
										? "Add to wishlist"
										: "go to wishlist"}
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
