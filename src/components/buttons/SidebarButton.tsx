import { SidebarButtonProps } from "../../layouts";

export function SidebarButton({
  icon,
  text,
  active,
  toggle,
  showText,
}: SidebarButtonProps) {
  let sidebarButtonClass = "";
  if (active && showText) {
    sidebarButtonClass = "sidebar__button--active";
  } else if (active) {
    sidebarButtonClass = "sidebar__button--collapsed justify-center";
  } else if (showText) {
    sidebarButtonClass += "justify-start";
  } else {
    sidebarButtonClass += "justify-center";
  }

  return (
    <div
      className={`sidebar__button ${sidebarButtonClass} `}
      tabIndex={1}
      onClick={toggle}
    >
      <div className="sidebar__button__image">
        <img className="sidebar__icon" src={icon} alt="bookmarks icon" />
      </div>
      {showText && <h1>{text}</h1>}
    </div>
  );
}

