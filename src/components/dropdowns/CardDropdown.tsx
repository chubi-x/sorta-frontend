// LIBRARIES
import { useRef } from "react";
// HOOKS
import { useHideDropdown } from "../../hooks";

export type DropDownItem = {
  text: string;
  icon: string;
  itemFunction?: Function;
};
type DropdownProps = {
  show: React.Dispatch<React.SetStateAction<boolean>>;
  items: DropDownItem[];
  resourceId: string | undefined;
};
export function CardDropdown({ show, items, resourceId }: DropdownProps) {
  const wrapperRef = useRef(null);
  useHideDropdown(wrapperRef, show);

  return (
    <div ref={wrapperRef} className="dropdown">
      {items?.map(({ icon, text, itemFunction }, index) => (
        <div
          className=" dropdown__item"
          key={index}
          onClick={() => {
            itemFunction?.(resourceId);
          }}
        >
          <img src={icon} alt={`${text} icon`} />
          <span
            className={`${text.toLowerCase().includes("delete") ? "dropdown__item--delete " : ""}`}
          >
            {text}
          </span>
        </div>
      ))}
    </div>
  );
}
