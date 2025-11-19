type Props = {
  error: any;
  resetErrorBoundary: any;
};
export function BookmarksError({ resetErrorBoundary }: Props) {
  return (
    <div>
      Something went wrong while displaying your bookmarks.
      <button className="primary-btn primary-btn--small block" onClick={resetErrorBoundary}>
        Try again
      </button>
    </div>
  );
}
