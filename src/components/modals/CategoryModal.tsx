import cancelIcon from "../../assets/icons/cancel.svg";
import imageIcon from "../../assets/icons/image.svg";
type CategoryModalProps = {
  closeModal: () => void;
};

export function CategoryModal({ closeModal }: CategoryModalProps) {
  const descriptionMaxLength = 200;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }
  return (
    <div className="category__modal">
      <div className="category__modal__card">
        <div className="category__modal__card__header">
          <h1>Create new category</h1>
          <div className="category__modal__card__cancel" onClick={closeModal}>
            <img src={cancelIcon} alt="cancel icon" />
          </div>
        </div>
        <form
          action=""
          className="category__modal__card__form"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="category__modal__card__form__content">
            <div className="category__modal__card__form__image__wrapper">
              <div className="category__modal__card__form__image">
                <img src={imageIcon} alt="image icon" />
              </div>

              <p className="category__modal__card__form__image__caption">
                Add image
              </p>
            </div>
            <div className="category__modal__card__form__text">
              <input
                id="name"
                type="text"
                className="category__modal__card__form__name"
                placeholder="Enter name"
              />
              <textarea
                name="description"
                id="description"
                className="category__modal__card__form__description"
                placeholder="Description"
                maxLength={descriptionMaxLength}
              ></textarea>
            </div>
          </div>
          <div className="category__modal__card__form__buttons">
            <button
              className="primary-btn primary-btn--inverted"
              onClick={closeModal}
              type="button"
            >
              Cancel
            </button>
            <button className="primary-btn primary-btn--medium" type="submit">
              Create Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
