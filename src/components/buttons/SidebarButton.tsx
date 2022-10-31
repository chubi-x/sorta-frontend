export function SidebarButton({
  icon,
  toggle,
  active,
  text,
}: {
  icon: any;
  toggle?: any;
  active?: boolean;
  text: string;
}) {
  return (
    <div
      className={`sidebar__button ${active ? "sidebar__button--active" : ""}`}
      onClick={toggle}
    >
      <img className="sidebar__icon" src={icon} alt="bookmarks icon" />
      <h1>{text}</h1>
    </div>
  );
}
