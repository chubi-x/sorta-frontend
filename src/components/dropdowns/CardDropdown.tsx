// LIBRARIES
import { useRef } from "react";
// HOOKS
import { useHideDropdown } from "../../hooks";

export type DropDownItem = {
  text: string;
  icon: string;
};
type DropdownProps = {
  show: React.Dispatch<React.SetStateAction<boolean>>;
  items: DropDownItem[];
};
export function CardDropdown({ show, items }: DropdownProps) {
  const wrapperRef = useRef(null);
  useHideDropdown(wrapperRef, show);

  return (
    <div ref={wrapperRef} className="dropdown">
      {items.map((item, index) => (
        <div className=" dropdown__item" key={index}>
          <img src={item.icon} alt={`${item.text} icon`} />
          <span>{item.text}</span>
        </div>
      ))}
    </div>
  );
}

