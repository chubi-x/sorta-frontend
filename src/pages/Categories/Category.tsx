import { useParams } from "react-router-dom";
export function Category() {
  const params = useParams();
  const { id } = params;

  return <div>a category {id}</div>;
}
