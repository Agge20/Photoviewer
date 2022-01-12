import { useState } from "react";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage, db } from "../firebase";
import { v4 as uuidv4 } from "uuid";

const useAddImageToAlbum = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [progress, setProgress] = useState(0);

  const addImage = async (id, imageFile) => {
    const uuid = uuidv4();
    setError(false);
    setProgress(0);
    setLoading(true);
    const extension = imageFile.name.substring(
      imageFile.name.lastIndexOf(".") + 1
    );
    // create reference to where to store the image in storage
    const imageRef = ref(storage, `albums/${id}/${uuid}.${extension}`);
    // try to upload the image to the album

    // attach and observer to the upload
    const upload = uploadBytesResumable(imageRef, imageFile);

    upload.on(
      "state_changed",
      (snap) => {
        setProgress(
          Math.round((snap.bytesTransferred / snap.totalBytes) * 100)
        );
      },
      (err) => {
        setError(err);
      },
      async () => {
        // get the download url for the newly created image
        const downURL = await getDownloadURL(imageRef);
        // create a ref to the album where the image should be stored
        const albumRef = doc(db, "albums", id);
        // add the new image object to the image array
        updateDoc(albumRef, {
          images: arrayUnion({
            downUrl: downURL,
            id: uuid,
            imagePath: `albums/${id}/${uuid}.${extension}`,
          }),
        });
        setLoading(false);
      }
    );
  };

  return {
    loading,
    error,
    addImage,
    progress,
  };
};

export default useAddImageToAlbum;
