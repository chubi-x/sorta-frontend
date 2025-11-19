import { MenuButtonProps } from ".";

export function MenuButton({
  icon,
  text,
  active,
  toggle,
  // showText,
  mobileClass,
}: MenuButtonProps) {
  let menuButtonClass = "";
  if (active) {
    menuButtonClass = "menu__button--active";
  }

  return (
    <div className={`menu__button ${menuButtonClass} ${mobileClass} `} onClick={toggle}>
      <div className="menu__button__image">
        <img className="menu__icon" src={icon} alt="bookmarks icon" />
      </div>
      <h1 className={`hidden lg:block`}>{text}</h1>
    </div>
  );
}
