/* eslint-disable react/prop-types */
import React, {
  createContext, useState,
} from 'react';
import useAxiosInterceptors from '../hooks/useAxiosInterceptors';

export const TransactionsContext = createContext('');

export function TransactionsProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const axios = useAxiosInterceptors();

  const getTransactions = (cardNumber) => {
    setLoading(true);
    axios.get(`/transaction/get/${cardNumber}`).then((response) => {
      setTransactions(response.data);
      setLoading(false);
    }).catch((error) => {
      setIsError(error.response.data.message);
      setLoading(false);
    });
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <TransactionsContext.Provider value={{
      transactions, setLoading, loading, isError, setTransactions, getTransactions,
    }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
