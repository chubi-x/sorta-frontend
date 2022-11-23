// LIBRARIES
import { useState } from "react";
// COMPONENTS
import { BookmarkDropdown } from "../../components/dropdowns";
import { MoreButton } from "../../components/buttons";

// ASSETS
import verifiedIcon from "../../assets/icons/verified.svg";

type BookmarkProps = {
  bookmark: Bookmark;
  index: number;
  bookmarksLength: number | undefined;
};
export function Bookmark({ bookmark, index, bookmarksLength }: BookmarkProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  function convertDate(date_string: string) {
    let date = new Date(date_string);
    return `${date.getDate()}/${[date.getMonth()]}/${date.getFullYear()}`;
  }
  function openOnTwitter(bookmark: Bookmark) {
    const url = `https://twitter.com/${bookmark.author_username}/status/${bookmark.id}`;
    window.open(url, "_blank");
  }
  function showAuthorProfileOnTwitter(bookmark: Bookmark) {
    const url = `https://twitter.com/${bookmark.author_username}`;
    window.open(url, "_blank");
  }

  let roundedBorder = "";
  if (index == 0) {
    roundedBorder = "rounded-t-xl";
  } else if (index == bookmarksLength! - 1) {
    roundedBorder += "rounded-b-xl";
  }

  return (
    <div className={`bookmark__card ${roundedBorder}`}>
      <div className="bookmark__card__author__img">
        <img
          src={bookmark?.author_pfp}
          alt="bookmark tweet author profile picture"
          loading="eager"
        />
      </div>
      <div className=" bookmark__card__text__wrapper ">
        <div className="bookmark__card__details">
          <div className="bookmark__card__author__details">
            <div className="bookmark__card__author__names__container">
              <div className="bookmark__card__author__name">
                <h2>
                  {bookmark?.author_name}
                  {bookmark?.author_verified && (
                    <img
                      className="bookmark__card__author__verified"
                      src={verifiedIcon}
                      alt="twitter verified icon"
                    />
                  )}
                </h2>
              </div>
              <div
                className="bookmark__card__author__username"
                onClick={() => {
                  showAuthorProfileOnTwitter(bookmark);
                }}
              >
                <p>@{bookmark?.author_username}</p>
              </div>
            </div>

            <div className="bookmark__card__date__container">
              <div className="h-[2px] w-[2px] self-center rounded-full bg-neutral-4"></div>
              <p className="bookmark__card__date">
                {convertDate(bookmark?.created_at)}
              </p>
            </div>
            <MoreButton showTooltip={setShowTooltip} />
          </div>
          <h1
            className="bookmark__card__text"
            onClick={() => {
              openOnTwitter(bookmark);
            }}
          >
            {bookmark?.text}
          </h1>

          {showTooltip && <BookmarkDropdown show={setShowTooltip} />}
        </div>
      </div>
    </div>
  );
}

