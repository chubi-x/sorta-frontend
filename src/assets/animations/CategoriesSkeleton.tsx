export function CategoriesSkeleton() {
  const skeletons = [];
  for (let i = 0; i < 6; i++) {
    skeletons.push(i);
  }
  return (
    <div className="categories__skeleton__container">
      {skeletons.map((el, index) => (
        <div className="categories__skeleton" key={index}></div>
      ))}
    </div>
  );
}
