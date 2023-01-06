import { useState } from "react";
import { CardDropdown } from "../../components/dropdowns";
import { MoreButton } from "../../components/buttons";
import { dropdownItems } from ".";

type CategoryProps = {
  id: string;
  image: string | undefined;
  children: React.ReactNode;
};

export function CategoryCard({ id, image, children }: CategoryProps) {
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
