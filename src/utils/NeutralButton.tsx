export default function NeutralButton(props: { forNav: boolean }) {
  return (
    <div
      className={`neutral__btn neutral__btn__medium ${
        props.forNav ? "hidden lg:block" : ""
      }`}
    >
      Connect Twitter
    </div>
  );
}
