import { useState } from "react";
// firebase
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage, db } from "../firebase";
// packages
import { v4 as uuidv4 } from "uuid";

const useAddImageToAlbum = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [progress, setProgress] = useState(0);

  // function to add an image to an album
  const addImage = async (id, imageFile) => {
    // create a custom and unique id
    const uuid = uuidv4();
    // reset errors, progress, and loading state
    setError(false);
    setProgress(0);
    setLoading(true);
    // pick up which extension the image is, so we can add to the name
    const extension = imageFile.name.substring(
      imageFile.name.lastIndexOf(".") + 1
    );
    // create reference to where to store the image in storage
    const imageRef = ref(storage, `albums/${id}/${uuid}.${extension}`);

    // attach and observer to the upload and start upload the image
    const upload = uploadBytesResumable(imageRef, imageFile);

    // on every snapshot returned by the resumable we update the progress-state
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
