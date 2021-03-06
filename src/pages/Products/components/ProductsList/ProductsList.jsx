import { useFilter } from "../../../../context";
import { CardLayout, EmptyPageHolder, ProductCard } from "../../../components";

export const ProductsList = () => {
	const { filterState } = useFilter();
	return (
		<>
			{filterState.products.length > 0 ? (
				<CardLayout>
					{filterState.products.map((item) => (
						<ProductCard
							cardType="prods"
							key={item._id}
							title={item.name}
							product={item}
						/>
					))}
				</CardLayout>
			) : (
				<div className="flex-center vertical-list">
					<EmptyPageHolder size={300} />
					<p className="heading-4">No products found</p>
				</div>
			)}
		</>
	);
};
