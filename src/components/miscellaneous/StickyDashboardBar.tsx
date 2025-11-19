type Props = {
  inView: boolean;
  categoriesActive: boolean;
  children: React.ReactNode;
};
export function StickyDashboardBar({ inView, categoriesActive, children }: Props) {
  return (
    <div
      className={`dashboard-header-btn-container ${
        !inView ? "dashboard-header-btn-container--stuck" : ""
      }`}
      style={{ width: `${categoriesActive ? "100%" : ""}` }}
    >
      {children}
    </div>
  );
}
