type MoreButtonProps = {
  showTooltip?: React.Dispatch<React.SetStateAction<boolean>>;
};
export function MoreButton({ showTooltip }: MoreButtonProps) {
  return (
    <div className="more-btn" onClick={() => showTooltip?.(true)}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
