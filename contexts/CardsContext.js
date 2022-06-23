/* eslint-disable react/function-component-definition */
/* eslint-disable react/prop-types */
import React, {
  createContext, useState, useEffect,
} from 'react';
import useAxiosInterceptors from '../hooks/useAxiosInterceptors';

export const CardsContext = createContext('');

export const CardsProvider = ({ children }) => {
  const axios = useAxiosInterceptors();
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(0);
  const [contextState, setContextState] = useState({
    isLoading: true,
    isError: false,
    errorMessage: '',
  });

  const getCards = () => {
    axios.get('/card/get').then((response) => {
      setCards(response.data);
      if (response.data.length > 0 && selectedCard === 0) {
        setSelectedCard(response.data[0].cardNumber);
      }
      setContextState((prevState) => ({
        ...prevState, isLoading: false,
      }));
    }).catch((error) => {
      setContextState({
        isLoading: false,
        isError: true,
        errorMessage: error.response.data.message,
      });
    });
  };

  useEffect(() => {
    getCards();
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <CardsContext.Provider value={{
      cards, setCards, contextState, getCards, selectedCard, setSelectedCard,
    }}
    >
      {children}
    </CardsContext.Provider>
  );
};
