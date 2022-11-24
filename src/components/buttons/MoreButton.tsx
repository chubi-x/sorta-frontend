type MoreButtonProps = {
  showTooltip?: React.Dispatch<React.SetStateAction<boolean>>;
  twStyles?: string;
};
export function MoreButton({ showTooltip, twStyles }: MoreButtonProps) {
  return (
    <div className={`more-btn ${twStyles}`} onClick={() => showTooltip?.(true)}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
