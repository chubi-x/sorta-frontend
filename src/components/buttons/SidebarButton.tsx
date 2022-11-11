import { SidebarButtonProps } from "../../layouts";

export function SidebarButton({
  icon,
  text,
  active,
  toggle,
}: SidebarButtonProps) {
  return (
    <div
      className={`sidebar__button ${active ? "sidebar__button--active" : ""}`}
      tabIndex={1}
      onClick={toggle}
    >
      <div className="sidebar__button__image">
        <img className="sidebar__icon" src={icon} alt="bookmarks icon" />
      </div>
      <h1>{text}</h1>
    </div>
  );
}

