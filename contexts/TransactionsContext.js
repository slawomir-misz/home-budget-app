/* eslint-disable react/function-component-definition */
/* eslint-disable react/prop-types */
import React, {
  createContext, useState, useEffect,
} from 'react';
import useAxiosInterceptors from '../hooks/useAxiosInterceptors';

export const TransactionsContext = createContext('');

export const TransactionsProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const axios = useAxiosInterceptors();

  useEffect(() => {
    axios.get(`/transaction/get/${selectedCard}`).then((response) => {
      setTransactions(response.data);
      setLoading(false);
    }).catch((error) => {
      setIsError(error.response.data.message);
      setLoading(false);
    });
  }, [selectedCard]);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <TransactionsContext.Provider value={{
      transactions, setLoading, loading, isError, selectedCard, setSelectedCard,
    }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};
