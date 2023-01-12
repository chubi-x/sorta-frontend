import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Compressor from "compressorjs";
import { usePatchCategory, usePostCategory } from "../../api/hooks";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { firebaseStorage } from "../../../firebase";
import { CategoryModalAction } from "../../helpers/Reducers";

import cancelIcon from "../../assets/icons/cancel.svg";
import imageIcon from "../../assets/icons/image.svg";
import { Spinner } from "../../assets/animations";

type CategoryModalProps = {
  action: CategoryModalAction | undefined;
  category: Category | undefined;
  closeModal: () => void;
  user: User;
};

export function CategoryModal({ closeModal, user, action, category }: CategoryModalProps) {
  const navigate = useNavigate();
  const { mutate: postCategory } = usePostCategory();
  const { mutate: patchCategory } = usePatchCategory();
  const [modalClosed, setModalClosed] = useState(false);
  const descriptionMaxLength = 200;
  const colors = [
    "#A4CDE3",
    "#E4D7CF",
    "#FFD166",
    "#FA8F54",
    "#3B71FE",
    "#8BC5E5",
    "#92A5EF",
    "#58C27D",
  ];
  const [categoryForm, setCategoryForm] = useState<Omit<Category, "id" | "image" | "bookmarks">>({
    name: "",
    description: "",
  });
  const [imageFileBlob, setImageFileBlob] = useState<File | Blob>();
  const [thumbnailSrc, setThumbnailSrc] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (imageFileBlob) {
      const thumbnailSrc = URL.createObjectURL(imageFileBlob);
      setThumbnailSrc(thumbnailSrc);
    }
    return () => {
      URL.revokeObjectURL(thumbnailSrc);
    };
  }, [imageFileBlob]);

  function close() {
    setModalClosed(true);
    setTimeout(() => {
      closeModal();
    }, 500);
  }
  function handleImageFile(e: React.ChangeEvent<HTMLInputElement>) {
    const image = e.target.files![0];
    const acceptedTypes = ["image/jpeg", "image/jpg", "image/gif", "image/png"];
    if (!acceptedTypes.includes(image.type)) {
      alert("file must be an image!");
      return;
    } // compress here
    new Compressor(image, {
      checkOrientation: true,
      quality: 0.4,
      success(result) {
        setImageFileBlob(result);
      },
    });
  }
  async function uploadImage(categoryName: string) {
    if (!imageFileBlob || categoryName.length < 1) return;
    const imageRef = ref(firebaseStorage, `images/${user.id}/categories/${categoryName}/image`);
    try {
      const uploadedImage = await uploadBytes(imageRef, imageFileBlob);
      const imageUrl = await getDownloadURL(uploadedImage.ref);
      return imageUrl;
    } catch (e) {
      alert("There was an error uploading your file. Please try again.");
    }
  }
  function handleInputChange(e: React.ChangeEvent<any>) {
    const { name, value } = e.target;
    setCategoryForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }
  function generateBg() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    const randomColor = colors[randomIndex];
    return randomColor;
  }
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    if (action?.createCategory) {
      const imageUrl = await uploadImage(categoryForm.name);
      let categoryImage = "";
      if (imageUrl) categoryImage = imageUrl;
      else categoryImage = generateBg();
      postCategory(
        { ...categoryForm, image: categoryImage },
        {
          onSettled() {
            closeModal();
            setLoading(false);
            navigate("/categories");
          },
        }
      );
    } else {
      const image = await uploadImage(category!.name);
      // console.log(image);
      patchCategory(
        { categoryId: category!.id, body: { ...categoryForm, image } },
        {
          onSettled() {
            closeModal();
            setLoading(false);
          },
        }
      );
    }
  }

  const headerMessage = action?.createCategory ? "Create new category" : "Edit category";
  const ctaMessage = action?.createCategory ? "Create category" : "Save";

  return (
    <div className="category__modal">
      <div
        className={`category__modal__card ${modalClosed ? "category__modal__card__closed" : ""}`}
      >
        <div className="category__modal__card__header">
          <h1>{headerMessage}</h1>
          <div className="category__modal__card__cancel" onClick={close}>
            <img src={cancelIcon} alt="cancel icon" />
          </div>
        </div>
        <form
          className="category__modal__card__form"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="category__modal__card__form__content">
            <div className="category__modal__card__form__image__wrapper">
              <label
                className="category__modal__card__form__image"
                htmlFor="categoryImage"
                style={{
                  backgroundImage: thumbnailSrc ? `url(${thumbnailSrc})` : "",
                }}
              >
                {!thumbnailSrc && <img src={imageIcon} alt="image icon" />}
                <input
                  type="file"
                  id="categoryImage"
                  accept="image/jpg,image/jpeg, image/png, image/gif"
                  onChange={(e) => {
                    handleImageFile(e);
                  }}
                />
              </label>
            </div>
            <p className="category__modal__card__form__image__caption">Add image</p>

            <input
              name="name"
              type="text"
              className="category__modal__card__form__name"
              placeholder="Enter name"
              value={categoryForm.name}
              onChange={(e) => handleInputChange(e)}
              maxLength={30}
              required={action?.createCategory}
            />
            {/* <div className="category__modal__card__form__text"> */}
            <textarea
              name="description"
              className="category__modal__card__form__description"
              placeholder="Description"
              value={categoryForm.description}
              onChange={(e) => handleInputChange(e)}
              maxLength={descriptionMaxLength}
              required={action?.createCategory}
            ></textarea>
            <div className="category__modal__card__form__description__char_count">{`${categoryForm.description.length}/${descriptionMaxLength}`}</div>
            {/* </div> */}
          </div>

          <div className="category__modal__card__form__buttons">
            <button className="primary-btn primary-btn--inverted" onClick={close} type="button">
              Cancel
            </button>
            <button
              className={` primary-btn--medium ${
                loading ? "primary-btn--disabled pr-4" : ""
              } primary-btn flex items-center space-x-2`}
              type="submit"
              disabled={loading ? true : false}
            >
              <span>{ctaMessage}</span>
              {loading && <Spinner />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
