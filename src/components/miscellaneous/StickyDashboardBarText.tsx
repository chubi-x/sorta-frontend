import help from "../../assets/icons/help.svg";

type Props = {
  inView: boolean;
  categoriesActive: boolean;
  activeTab: string;
  bookmarks: Bookmarks;
};
export function StickyDashboardBarText({
  inView,
  activeTab,
  bookmarks,
}: Props) {
  return (
    <div
      className={`my-6 flex items-center text-primary-1 tall:w-auto ${
        !inView ? "w-[auto] justify-end" : "justify-between"
      }`}
    >
      <p className={`font-semibold ${!inView ? "hidden" : ""}`}>
        {activeTab === "bookmarks"
          ? `   ${bookmarks ? bookmarks?.data.length : ""} Tweets`
          : "All Categories"}
      </p>

      <p className="need-help">
        <img src={help} alt="help icon" width={"20px"} />
        <span className="hidden md:inline">Need Help?</span>
      </p>
    </div>
  );
}
