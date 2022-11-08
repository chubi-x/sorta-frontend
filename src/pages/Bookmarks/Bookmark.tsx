import { useState } from "react";
import BookmarkTooltip from "../../components/tooltips/BookmarkTooltip";
import verified from "../../assets/icons/verified.svg";
export function Bookmark({
  bookmark,
  index,
}: {
  bookmark: Bookmark;
  index: number;
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  function convertDate(date_string: string) {
    let date = new Date(date_string);
    return `${date.getDate()} ${
      [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ][date.getMonth()]
    } ${date.getFullYear()}`;
  }

  return (
    <div className={`bookmark__card ${index == 0 ? "rounded-t-md" : ""}`}>
      <div className="flex space-x-4">
        <div className="bookmark__card__author__img">
          <img
            src={bookmark?.value?.authorPfp}
            alt="bookmark tweet author profile picture"
            loading="eager"
          />
        </div>
        <div className="bookmark__card__details">
          <div className="bookmark__card__author__details">
            <h1 className="max-w-[200px] font-semibold">
              {bookmark?.value?.authorName}
            </h1>

            {bookmark?.value?.authorVerified && (
              <img src={verified} alt="twitter verified icon" />
            )}
            <p className="text-xs text-neutral-2 underline">
              @{bookmark?.value?.authorUsername}
            </p>
            <span className="block h-1 w-1 rounded-full bg-neutral-4"></span>
            <p className="text-xs text-neutral-2">
              {convertDate(bookmark?.value?.createdAt)}
            </p>
          </div>
          <h1 className="relative z-[0]">{bookmark?.value?.text}</h1>
        </div>
      </div>
      <div
        className="bookmark__card__more__btn"
        onClick={() => setShowTooltip(true)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      {showTooltip && <BookmarkTooltip show={setShowTooltip} />}
    </div>
  );
}

