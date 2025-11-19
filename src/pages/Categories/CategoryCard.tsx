import { useState } from "react";
import { CardDropdown, DropDownItem } from "../../components/dropdowns";
import { MoreButton } from "../../components/buttons";

type CategoryProps = {
  id: string;
  image: string | undefined;
  children: React.ReactNode;
  dropdownItems: DropDownItem[];
};

export function CategoryCard({ id, image, children, dropdownItems }: CategoryProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const isHex = image?.includes("#");

  return (
    <div
      className="category__card"
      style={{
        backgroundImage: !isHex ? `url(${image})` : "",
        backgroundColor: isHex ? image : "",
      }}
    >
      {children}
      <div className="category__card__dropdown">
        <MoreButton showTooltip={setShowTooltip} />
        {showTooltip && (
          <CardDropdown resourceId={id} items={dropdownItems} show={setShowTooltip} />
        )}
      </div>
    </div>
  );
}
