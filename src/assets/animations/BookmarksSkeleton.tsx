export function BookmarksSkeleton() {
  const skeletons = [];
  for (let i = 0; i < 20; i++) {
    skeletons.push(i);
  }
  return (
    <>
      <div className="skeleton__container">
        {skeletons.map((el, index) => (
          <div className="skeleton" key={index}>
            <div className="skeleton__block"></div>
            <div className="skeleton__block"></div>
            <div className="skeleton__block"></div>
          </div>
        ))}
      </div>
    </>
  );
}
