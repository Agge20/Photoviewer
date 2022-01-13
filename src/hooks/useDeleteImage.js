import { useState } from "react";
// firebase
import {
  doc,
  getDoc,
  getDocs,
  query,
  where,
  collection,
  updateDoc,
} from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "../firebase/index";
import { useAuthContext } from "../context/AuthContext";

// hook to delete a single image from an album
const useDeleteImage = () => {
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  const deleteImage = async (id, albumId) => {
    const albumRef = doc(db, "albums", albumId);
    const album = await getDoc(albumRef);
    const albumData = album.data();
    // loop through the album-images and check which image has a matched id
    const imageToDelete = albumData.images.filter((img) => img.id === id);
    const imageRef = ref(storage, imageToDelete[0].imagePath);

    // get all of the current users albums
    const q = query(
      collection(db, "albums"),
      where("createdBy", "==", user.uid)
    );
    const usersAlbumsData = await getDocs(q);
    const usersAlbums = [];
    usersAlbumsData.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      usersAlbums.push(doc.data());
    });

    const usersImagesPaths = [];
    usersAlbums.forEach((album) => {
      for (let i = 0; i < album.images.length; i++) {
        usersImagesPaths.push(album.images[i].imagePath);
      }
    });
    console.log("usersImages: ", usersImagesPaths);
    // return all the images that shall remain
    const newAlbumImages = albumData.images.filter((img) => img.id !== id);
    // here we check if the image we are trying to delete are present in more than one album
    // if it is then we ONLY delete in the document and not in storage
    // if it is NOT present in more than one album then we delete the doc and the image in storage
    if (usersImagesPaths.length > 1) {
      try {
        // try and delete only the image from the document
        await updateDoc(albumRef, {
          images: [...newAlbumImages],
        });
      } catch (err) {
        setError(err);
      }
    }
    // if the image is only present in one album then delete it from storage
    else {
      try {
        await deleteObject(imageRef);
        await updateDoc(albumRef, {
          images: [...newAlbumImages],
        });
      } catch (err) {
        setError(err);
        console.log(err);
      }
    }
  };

  return {
    deleteImage,
    error,
  };
};

export default useDeleteImage;
