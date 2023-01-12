type Props = {
  error: any;
  resetErrorBoundary: any;
};
export function CategoriesError({ resetErrorBoundary }: Props) {
  return (
    <div>
      Something went wrong while displaying your categories.
      <button className="primary-btn primary-btn--small block" onClick={resetErrorBoundary}>
        Try again
      </button>
    </div>
  );
}
