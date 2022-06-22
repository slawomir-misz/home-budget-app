/* eslint-disable react/function-component-definition */
/* eslint-disable react/prop-types */
import React, {
  createContext, useState, useEffect,
} from 'react';
import useAxiosInterceptors from '../hooks/useAxiosInterceptors';

export const CardsContext = createContext('');

export const CardsProvider = ({ children }) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const axios = useAxiosInterceptors();

  const getCards = () => {
    axios.get('/card/get').then((response) => {
      setCards(response.data);
      setLoading(false);
    }).catch((error) => {
      setIsError(error.response.data.message);
      setLoading(false);
    });
  };

  useEffect(() => {
    getCards();
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <CardsContext.Provider value={{
      cards, setCards, loading, isError, getCards,
    }}
    >
      {children}
    </CardsContext.Provider>
  );
};
