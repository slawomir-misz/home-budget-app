/* eslint-disable react/prop-types */
import React, {
  createContext, useEffect, useState, useContext,
} from 'react';
import useAxiosInterceptors from '../hooks/useAxiosInterceptors';
import { CardsContext } from './CardsContext';

export const TransactionsContext = createContext('');

export function TransactionsProvider({ children }) {
  const { selectedCard } = useContext(CardsContext);
  const axios = useAxiosInterceptors();
  const [transactions, setTransactions] = useState([]);
  const [contextState, setContextState] = useState({
    isLoading: false,
    isError: false,
    errorMessage: '',
  });

  useEffect(() => {
    if (selectedCard > 0) {
      setContextState((prevState) => ({
        ...prevState, isLoading: true,
      }));
      axios.get(`/transaction/get/${selectedCard}?page=0`).then((response) => {
        setTransactions(response.data);
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
    }
  }, [selectedCard]);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <TransactionsContext.Provider value={{
      transactions, contextState, setTransactions,
    }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
