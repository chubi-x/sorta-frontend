import { useRef } from "react";
import { useHideTooltip } from "../../hooks";
import add from "../../assets/icons/add.svg";
import deleteIcon from "../../assets/icons/delete.svg";

export default function BookmarkTooltip(props: any) {
  const wrapperRef = useRef(null);
  useHideTooltip(wrapperRef, props.show);

  return (
    <div ref={wrapperRef} className="bookmark__card__tooltip">
      <div>
        <img src={add} alt="add icon" />
        <span>Add to category</span>
      </div>
      <div>
        <img src={deleteIcon} alt="delete icon" />
        <span>Delete</span>
      </div>
    </div>
  );
}
