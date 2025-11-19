import Lottie from "lottie-react";
import loadingAnimation from "../../assets/animations/loading.json";

export function LoadingModal() {
  return (
    <div className="bookmarks__loading__modal">
      <Lottie
        animationData={loadingAnimation}
        loop={true}
        autoplay={true}
        style={{ width: "100px" }}
      />
    </div>
  );
}
