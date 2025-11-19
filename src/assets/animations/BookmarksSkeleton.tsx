export function BookmarksSkeleton() {
  const skeletons = [];
  for (let i = 0; i < 20; i++) {
    skeletons.push(i);
  }
  return (
    <>
      <div className="bookmarks__skeleton__container">
        {skeletons.map((el, index) => (
          <div className="bookmarks__skeleton" key={index}>
            <div className="bookmarks__skeleton__block"></div>
            <div className="bookmarks__skeleton__block"></div>
            <div className="bookmarks__skeleton__block"></div>
          </div>
        ))}
      </div>
    </>
  );
}
