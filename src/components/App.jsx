import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import * as auth from "../utils/auth";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import Main from "./Main/Main";
import ProtectedRoute from "./ProtectedRoute";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [userEmail, setUserEmail] = useState("");
  const [cards, setCards] = useState([]);       // Estado para tarjetas
  const [popup, setPopup] = useState(null);     // Estado para popup

  const navigate = useNavigate();

  // Funciones para abrir y cerrar popups
  const onOpenPopup = (popupData) => setPopup(popupData);
  const onClosePopup = () => setPopup(null);

  // Funciones para manejar tarjetas (ejemplos básicos)
  const handleCardLike = (card) => {
    console.log("Like card:", card);
    // Aquí agregar lógica real para dar like a la tarjeta
  };

  const handleCardDelete = (card) => {
    console.log("Delete card:", card);
    // Aquí agregar lógica real para eliminar tarjeta
    setCards(cards.filter(c => c._id !== card._id));
  };

  const handleAddPlaceSubmit = (newCardData) => {
    console.log("Add new card:", newCardData);
    setCards([newCardData, ...cards]); // Agrega al inicio la nueva tarjeta
  };

  const handleUpdateUser = (userData) => {
    console.log("Update user:", userData);
    setCurrentUser(userData);
    onClosePopup();
  };

function handleRegister(email, password) {
  auth.register(email, password)
    .then((res) => {
      console.log("Registro exitoso:", res);
      navigate("/sign-in");
    })
    .catch((err) => {
      console.error("Error en registro:", err);
    });
}

  const handleLogin = ({ email, password }) => {
    auth.login(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setLoggedIn(true);
          return auth.checkToken(data.token);
        } else {
          return Promise.reject("No se recibió token");
        }
      })
      .then((res) => {
        if (res && res.data) {
          setCurrentUser(res.data);
          setUserEmail(res.data.email);
          navigate("/");
        }
      })
      .catch((err) => {
        console.error("Error durante login:", err);
      });
    };

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setCurrentUser({});
    setUserEmail("");
    navigate("/sign-in", { replace: true });
  }

  // Verifica si hay token al cargar la app
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth.checkToken(token)
        .then((userData) => {
          setLoggedIn(true);
          setCurrentUser(userData.data || userData);
          setUserEmail((userData.data || userData).email);
        })
        .catch((err) => {
          console.error("Token inválido o expirado:", err);
          setLoggedIn(false);
        });
    }
  }, []);

useEffect(() => {
  if (loggedIn) {
    api.getCards()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch((err) => {
        console.error("Error al obtener las tarjetas:", err);
      });
  }
}, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Routes>
        <Route
          path="/sign-up"
          element={<Register onRegister={handleRegister} />}
        />
        <Route
          path="/sign-in"
          element={<Login onLogin={handleLogin} />}
        />
        <Route
          path="/"
          element={
            <ProtectedRoute
              element={Main}
              loggedIn={loggedIn}
              currentUser={currentUser}
              cards={cards}
              onOpenPopup={onOpenPopup}
              onClosePopup={onClosePopup}
              popup={popup}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              setPopup={setPopup}
              onAddPlaceSubmit={handleAddPlaceSubmit}
              handleUpdateUser={handleUpdateUser}
              userEmail={userEmail}
              onSignOut={handleSignOut}
            />
          }
        />
      </Routes>
    </div>
    </CurrentUserContext.Provider>
  );
}
export default App;