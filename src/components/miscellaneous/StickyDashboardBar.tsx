type Props = {
  inView: boolean;
  categoriesActive: boolean;
  children: React.ReactNode;
};
export function StickyDashboardBar({
  inView,
  categoriesActive,
  children,
}: Props) {
  return (
    <div
      className={`new-category-container ${
        !inView ? "new-category-container--stuck" : ""
      }`}
      style={{ width: `${categoriesActive ? "100%" : ""}` }}
    >
      {children}
    </div>
  );
}
