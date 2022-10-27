export function Bookmark({ bookmark }: { bookmark: Bookmark }) {
  return (
    <div className="m-16">
      <h1>{bookmark.text}</h1>
    </div>
  );
}
