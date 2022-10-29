export function Bookmark({ bookmark }: { bookmark: Bookmark }) {
  return (
    <div className="bookmark rounded-md border border-neutral-6 py-10 px-12">
      <h1>{bookmark?.value?.text}</h1>
    </div>
  );
}

