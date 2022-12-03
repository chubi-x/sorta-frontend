import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePatchCategory, usePostCategory } from "../../hooks";
import Compressor from "compressorjs";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { firebaseStorage } from "../../../firebase";

import cancelIcon from "../../assets/icons/cancel.svg";
import imageIcon from "../../assets/icons/image.svg";
import { CategoryModalAction } from "../../App";
import { Spinner } from "../../assets/animations";

type CategoryModalProps = {
  action: CategoryModalAction | undefined;
  idToUpdate: string | undefined;
  closeModal: () => void;
  user: User;
};

export function CategoryModal({ closeModal, user, action, idToUpdate }: CategoryModalProps) {
  const navigate = useNavigate();
  const { mutate: postCategory } = usePostCategory();
  const { mutate: patchCategory } = usePatchCategory();

  const descriptionMaxLength = 200;

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
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const image = await uploadImage(categoryForm.name);
    if (action === CategoryModalAction.CREATE) {
      postCategory(
        { ...categoryForm, image },
        {
          onSettled() {
            closeModal();
            setLoading(false);
            navigate("/categories");
          },
        }
      );
    } else {
      patchCategory(
        { categoryId: idToUpdate!, body: { ...categoryForm, image } },
        {
          onSettled() {
            closeModal();
            setLoading(false);
          },
        }
      );
    }
  }

  const headerMessage =
    action === CategoryModalAction.CREATE ? "Create new category" : "Edit category";
  const ctaMessage = action === CategoryModalAction.CREATE ? "Create new category" : "Save";

  return (
    <div className="category__modal">
      <div className="category__modal__card">
        <div className="category__modal__card__header">
          <h1>{headerMessage}</h1>
          <div className="category__modal__card__cancel" onClick={closeModal}>
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

              <p className="category__modal__card__form__image__caption">Add image</p>
            </div>
            <div className="category__modal__card__form__text">
              <input
                name="name"
                type="text"
                className="category__modal__card__form__name"
                placeholder="Enter name"
                value={categoryForm.name}
                onChange={(e) => handleInputChange(e)}
                maxLength={30}
                required={action === CategoryModalAction.CREATE}
              />
              <textarea
                name="description"
                className="category__modal__card__form__description"
                placeholder="Description"
                value={categoryForm.description}
                onChange={(e) => handleInputChange(e)}
                maxLength={descriptionMaxLength}
                required={action === CategoryModalAction.CREATE}
              ></textarea>
              <div className="category__modal__card__form__description__char_count">{`${categoryForm.description.length}/${descriptionMaxLength}`}</div>
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
