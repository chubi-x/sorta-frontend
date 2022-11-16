import { useState } from "react";
import BookmarkTooltip from "../../components/tooltips/BookmarkTooltip";
import verified from "../../assets/icons/verified.svg";
export function Bookmark({
  bookmark,
  index,
  bookmarksLength,
}: {
  bookmark: Bookmark;
  index: number;
  bookmarksLength: number | undefined;
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  function convertDate(date_string: string) {
    let date = new Date(date_string);
    return `${date.getDate()}/${[date.getMonth()]}/${date.getFullYear()}`;
  }
  let roundedBorder = "";
  if (index == 0) {
    roundedBorder = "rounded-t-xl";
  } else if (index == bookmarksLength! - 1) {
    roundedBorder += "rounded-b-xl";
  }

  return (
    <div className={`bookmark__card ${roundedBorder}`}>
      <div className="flex w-[90%]">
        <div className="bookmark__card__author__img">
          <img
            src={bookmark?.author_pfp}
            alt="bookmark tweet author profile picture"
            loading="eager"
          />
        </div>
        <div className="bookmark__card__details">
          <div className="bookmark__card__author__details">
            <div className="bookmark__card__author__names__container">
              <h1 className="bookmark__card__author__name">
                {bookmark?.author_name}
              </h1>

              {bookmark?.author_verified && (
                <img
                  className="self-center"
                  src={verified}
                  alt="twitter verified icon"
                />
              )}
              <p className="bookmark__card__author__username">
                @{bookmark?.author_username}
              </p>
            </div>

            <div className="flex space-x-1">
              <div className="h-[2px] w-[2px] self-center rounded-full bg-neutral-4"></div>
              <p className="bookmark__card__date text-xs text-neutral-2">
                {convertDate(bookmark?.created_at)}
              </p>
            </div>
          </div>
          <h1 className="bookmark__card__text">{bookmark?.text}</h1>
        </div>
      </div>
      <div
        className="bookmark__card__more__btn__container"
        onClick={() => setShowTooltip(true)}
      >
        <div className="bookmark__card__more__btn">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      {showTooltip && <BookmarkTooltip show={setShowTooltip} />}
    </div>
  );
}

