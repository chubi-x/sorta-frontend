import { useRef } from "react";
import { useHideTooltip } from "../../hooks";
import add from "../../assets/icons/add.svg";
import deleteIcon from "../../assets/icons/delete.svg";

type BookmarkTooltipProps = {
  show: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function BookmarkTooltip(props: BookmarkTooltipProps) {
  const wrapperRef = useRef(null);
  useHideTooltip(wrapperRef, props.show);

  return (
    <div ref={wrapperRef} className="bookmark__card__tooltip">
      <div className=" bookmark__card__tooltip__item  bookmark__card__tooltip__item__top">
        <img src={add} alt="add icon" />
        <span>Add to category</span>
      </div>

      <div className="bookmark__card__tooltip__item bookmark__card__tooltip__item__bottom">
        <img src={deleteIcon} alt="delete icon" />
        <span>Delete</span>
      </div>
    </div>
  );
}

