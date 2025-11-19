import help from "../../assets/icons/help.svg";

type Props = {
  children: React.ReactNode;
};
export function DashboardBarText({ children }: Props) {
  return (
    <div className="my-6 flex items-center justify-between text-primary-1 tall:w-auto">
      {children}
      <p className="need-help">
        <img src={help} alt="help icon" width={"20px"} />
        <span className="hidden md:inline">Need Help?</span>
      </p>
    </div>
  );
}
