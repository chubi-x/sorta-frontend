import { Link } from "react-router-dom";
import { MoreButton } from "../../components/buttons";

type CategoryProps = {
  category: Category;
};
export function CategoryCard({ category }: CategoryProps) {
  return (
    <div
      className="category__card"
      style={{ backgroundImage: `url(${category.image})` }}
    >
      <Link to={`/categories/${category.id}`}>
        <div className="category__card__text">
          <h2>{category.name}</h2>
          <p>{category.description}</p>
        </div>
      </Link>

      <MoreButton twStyles="absolute top-4 right-3" />
    </div>
  );
}
