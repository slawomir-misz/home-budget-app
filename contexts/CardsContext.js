/* eslint-disable react/function-component-definition */
/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react';
import useAxiosInterceptors from '../hooks/useAxiosInterceptors';

export const CardsContext = createContext('');

export const CardsProvider = ({ children }) => {
  const [cards, setCards] = useState([]);
  const axios = useAxiosInterceptors();

  useEffect(() => {
    axios.get('/card/get').then((response) => {
      setCards(response.data);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <CardsContext.Provider value={{ cards, setCards }}>{children}</CardsContext.Provider>
  );
};
