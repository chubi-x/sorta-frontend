import loading from "../../assets/lotties/loading.json";
import Lottie from "lottie-react";
export function Loading() {
  return (
    <div className="mx-auto flex h-full w-full items-center justify-center bg-neutral-6">
      <Lottie
        animationData={loading}
        loop={true}
        autoplay={true}
        style={{ width: "200px" }}
      />
    </div>
  );
}

