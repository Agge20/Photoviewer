import { useState } from "react";
// packages
import { useNavigate } from "react-router-dom";
// firebase
import { doc, deleteDoc, getDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "../firebase/index";

const useDeleteAlbum = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  // function to delete an album-document and its respective images in storage
  const deleteAlbum = async (id) => {
    setError(null);
    // get the album doc ref
    const docRef = doc(db, "albums", id);
    // get the album
    const album = await getDoc(docRef);
    // get the album-data
    const albumData = album.data();

    // loop through each album image and delete it from storage
    for (const img of albumData.images) {
      // create a reference to the file to delete
      const imageRef = ref(storage, img.imagePath);

      try {
        // try to delete the image from storage
        await deleteObject(imageRef);
      } catch (err) {
        setError(err);
      }
    }

    const albumRef = doc(db, "albums", id);
    // try to delete the album document
    try {
      await deleteDoc(albumRef);
      navigate("/albums");
    } catch (err) {
      setError(err);
    }
  };
  return {
    deleteAlbum,
    error,
  };
};

export default useDeleteAlbum;
