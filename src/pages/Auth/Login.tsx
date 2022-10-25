import { Navbar } from "../../layouts/Navbar";
import { PrimaryButton } from "../../components/buttons";

export function Login({ authFunction }: { authFunction: any }) {
  return (
    <>
      <Navbar authFunction={authFunction} />
      <div className="login">
        <div className="login__card">
          <div className="login__card__title">
            <h1>Connect Account</h1>
            <p>Hey! Click the button below to connect your twitter account</p>
          </div>

          <lottie-player
            src="https://assets8.lottiefiles.com/packages/lf20_duUhpb7PXY.json"
            mode="bounce"
            background="transparent"
            speed="1"
            class="login__card__animation"
            loop
            autoplay
          ></lottie-player>

          <PrimaryButton authFunction={authFunction} />
        </div>
      </div>
    </>
  );
}

