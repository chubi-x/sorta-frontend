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
    sidebarButtonClass = "menu__button--active";
  } else if (active) {
    sidebarButtonClass = "menu__button--collapsed justify-center";
  } else if (showText) {
    sidebarButtonClass += "justify-start";
  } else {
    sidebarButtonClass += "justify-center";
  }

  return (
    <div
      className={`menu__button ${sidebarButtonClass}`}
      tabIndex={1}
      onClick={toggle}
    >
      <div className="menu__button__image">
        <img className="menu__icon" src={icon} alt="bookmarks icon" />
      </div>
      {showText && <h1 className="hidden lg:block">{text}</h1>}
    </div>
  );
}

