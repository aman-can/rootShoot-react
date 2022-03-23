import axios from "axios";

export const deleteFromWishlist = async (
    product,
    setWishlist,
    setIsLoading
) => {
    try {
        setIsLoading(true);
        const res = await axios.delete(`/api/user/wishlist/${product._id}`, {
            headers: {
                authorization: localStorage.getItem("token"),
            },
        });
        if (res.status === 200) {
            setWishlist(res.data.wishlist);
            setIsLoading(false);
        }
    } catch (err) {
        console.log(err, "Error while deleting the product from wishlist");
    }
};