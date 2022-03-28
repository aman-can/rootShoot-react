import { useNavigate } from "react-router-dom";
import { useFilter } from "../../../context";

export const SearchResults = ({ searchOpen, setSearchOpen }) => {
    const { filterState } = useFilter();
    const navigate = useNavigate();

    return (
        <div
            className={`search-results vertical-list ${
                filterState.searchResults.length > 0 &&
                searchOpen &&
                "search-results-show"
            }`}
        >
            {filterState.searchResults.length > 0 &&
                filterState.searchResults.map((item) => (
                    <div
                        key={item._id}
                        className="card search-result"
                        onClick={() => {
                            setSearchOpen(false);
                            console.log("asassa");
                            navigate(`/products/${item._id}`);
                        }}
                    >
                        <div className="card-badge-green">{item.type[0]}</div>
                        <div className="card-body-horizontal">
                            <img
                                src={item.imgUrl}
                                alt={item.name}
                                className="card-side-image search-result-img"
                            />
                            <div className="card-side-content">
                                <h3 className="card-title text-noWrap">
                                    {item.name}
                                </h3>
                                <p className="card-text">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Ea enim eligendi eos nam
                                    esse quisquam necessitatibus dolorem odio
                                    animi doloremque, quia suscipit repellendus
                                    ipsum fugiat vel molestiae. Officiis eum
                                    illo quis facere deleniti distinctio nam
                                    praesentium asperiores iste. Cumque,
                                    impedit.
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
};