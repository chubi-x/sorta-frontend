import { MenuButtonProps } from "../../layouts";

export function MenuButton({
  icon,
  text,
  active,
  toggle,
  showText,
}: MenuButtonProps) {
  let menuButtonClass = "";
  if (active && showText) {
    menuButtonClass = "menu__button--active";
  } else if (active) {
    menuButtonClass = "menu__button--collapsed justify-center";
  } else if (showText) {
    menuButtonClass += "justify-start";
  } else {
    menuButtonClass += "justify-center";
  }

  return (
    <div
      className={`menu__button ${menuButtonClass}`}
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

