// LIBRARIES
import { useRef } from "react";
// HOOKS
import { useHideDropdown } from "../../hooks";
// ASSETS
import add from "../../assets/icons/add.svg";
import deleteIcon from "../../assets/icons/delete.svg";

type BookmarkDropdownProps = {
  show: React.Dispatch<React.SetStateAction<boolean>>;
};
export function BookmarkDropdown(props: BookmarkDropdownProps) {
  const wrapperRef = useRef(null);
  useHideDropdown(wrapperRef, props.show);

  return (
    <div ref={wrapperRef} className="bookmark__card__dropdown">
      <div className=" bookmark__card__dropdown__item  bookmark__card__dropdown__item__top">
        <img src={add} alt="add icon" />
        <span>Add to category</span>
      </div>

      <div className="bookmark__card__dropdown__item bookmark__card__dropdown__item__bottom">
        <img src={deleteIcon} alt="delete icon" />
        <span>Delete</span>
      </div>
    </div>
  );
}

