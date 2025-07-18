import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import ".././index.css";
import api from "../utils/api.js";
import NewCard from "../components/Main/Popup/NewCard/NewCard.jsx";
import Footer from "./Footer/Footer.jsx";
import Register from "./Auth/Register.jsx"; 
import Login from "./Auth/Login.jsx";
import * as auth from "../utils/auth.js";



function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleOpenPopup = (popup) => {
    setPopup(popup);
  };

  const handleClosePopup = () => {
    setPopup(null);
  };

  const handleUpdateUser = async (userData) => {
    try {
      console.log("Enviando datos de usuario a la API:", userData);
      const updateUser = await api.editUser(userData);
      setCurrentUser(updateUser);
      handleClosePopup();
    } catch (error) {
      console.error("Error updating user info", error);
    }
  };

  const handleUpdateAvatar = async ({ avatar }) => {
    try {
      const updatedUser = await api.changeAvatar(avatar);
      setCurrentUser(updatedUser);
      handleClosePopup();
    } catch (error) {
      console.error("Error updating avatar", error);
    }
  };

  const handleCardLike = async (card) => {
    console.log("Like clickeado en:", card);
    try {
      const newCard = await api.likeButton(card._id);

      setCards((prevState) =>
        prevState.map((currentCard) =>
          currentCard._id === card._id
            ? { ...currentCard, isLiked: newCard.isLiked }
            : currentCard
        )
      );
    } catch (error) {
      console.error("Error updating like status", error);
    }
  };

  const handleCardDelete = async (card) => {
    try {
      await api.deleteCard(card._id);
      setCards((state) =>
        state.filter((currentCard) => currentCard._id !== card._id)
      );
    } catch (error) {
      console.error("Error deleting card", error);
    }
  };

  const handleAddPlaceSubmit = async (newCardData) => {
    try {
      const newCard = await api.addCard(newCardData);
      setCards([newCard, ...cards]);
    } catch (error) {
      console.error("Error adding new card", error);
    }
  };

  const handleOpenImage = (name, link) => {
    setSelectedImage({ name, link });
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    api.getUser().then((data) => {
      setCurrentUser(data);
    });

    api.getCards().then((data) => {
      setCards(data);
    });
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser, handleUpdateAvatar }}>
      <div className="page">
        <Header />
        <Main
          onOpenPopup={handleOpenPopup}
          onClosePopup={handleClosePopup}
          popup={popup}
          setPopup={setPopup}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          handleUpdateUser={handleUpdateUser}
          onAddPlaceSubmit={handleAddPlaceSubmit}
          onOpenImage={handleOpenImage}
        />
        <Footer />
        {selectedImage && (
          <div className="image-modal">
            <div className="image-modal-content">
              <img src={selectedImage.link} alt={selectedImage.name} />
              <button onClick={handleCloseImage}></button>
            </div>
          </div>
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
