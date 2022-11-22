type MoreButtonProps = {
  showTooltip?: React.Dispatch<React.SetStateAction<boolean>>;
  twStyles?: string;
};
export function MoreButton({ showTooltip, twStyles }: MoreButtonProps) {
  return (
    <div
      className={`more-btn__container ${twStyles}`}
      onClick={() => showTooltip?.(true)}
    >
      <div className="more-btn">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
