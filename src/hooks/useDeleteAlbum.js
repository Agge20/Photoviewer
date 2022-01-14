import { useState } from "react";
// packages
import { useNavigate } from "react-router-dom";
// firebase
import {
  doc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  collection,
} from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "../firebase/index";

// context
import { useAuthContext } from "../context/AuthContext";

const useDeleteAlbum = () => {
  const { user } = useAuthContext();
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

    // get all of the current users albums
    const q = query(
      collection(db, "albums"),
      where("createdBy", "==", user.uid)
    );
    // get all the user albums
    const usersAlbumsData = await getDocs(q);
    const usersAlbums = [];
    // push each albums object data into the userAlbums array
    usersAlbumsData.forEach((doc) => {
      usersAlbums.push(doc.data());
    });

    // loop through each album image and delete it from storage
    for (const img of albumData.images) {
      // create a reference to the file to delete
      const imageRef = ref(storage, img.imagePath);
      const usersImagesPaths = [];
      console.log("new img of albumData.images", img);
      // this code is a little confusing, what it does is checks if there are more than one image
      // using the same imagePath
      // loop through each user album
      usersAlbums.forEach((albumToCheck) => {
        // loop through each image object in the album
        for (let i = 0; i < albumToCheck.images.length; i++) {
          // check if the image path matches the imagepath we want to delete, it true add to array
          if (albumToCheck.images[i].imagePath === img.imagePath) {
            usersImagesPaths.push(albumToCheck.images[i].imagePath);
          }
        }
      });
      // if current image is not used by more than one album delete

      if (usersImagesPaths.length <= 1) {
        try {
          // try to delete the image from storage
          await deleteObject(imageRef);
        } catch (err) {
          setError(err);
        }
      }
    }

    const coverImageRef = ref(storage, albumData.coverPath);
    const albumRef = doc(db, "albums", id);

    try {
      // try to delete the album cover image
      await deleteObject(coverImageRef);
      // try to delete the album document
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
