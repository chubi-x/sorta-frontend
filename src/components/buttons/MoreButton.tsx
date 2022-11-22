type MoreButtonProps = {
  showTooltip?: React.Dispatch<React.SetStateAction<boolean>>;
};
export function MoreButton({ showTooltip }: MoreButtonProps) {
  return (
    <div className="more-btn__container" onClick={() => showTooltip?.(true)}>
      <div className="more-btn">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
