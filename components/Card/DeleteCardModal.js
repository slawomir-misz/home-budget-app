/* eslint-disable react/prop-types */
import { Button, Modal, Text } from 'native-base';
import React, { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import { CardsContext } from '../../contexts/CardsContext';
import { TransactionsContext } from '../../contexts/TransactionsContext';
import useAxiosInterceptors from '../../hooks/useAxiosInterceptors';
import Result from '../Result/Result';

export default function DeleteCardModal({
  deleteCardModalVisible, setDeleteCardModalVisible, cardNumber,
}) {
  const axios = useAxiosInterceptors();
  const { cards, setCards, setSelectedCard } = useContext(CardsContext);
  const { setTransactions } = useContext(TransactionsContext);
  const [componentState, setComponentState] = useState({
    loading: false,
    error: false,
  });
  const handleDeleteButton = () => {
    setComponentState((prevState) => ({
      ...prevState, loading: true,
    }));
    axios.delete(`/card/delete/${cardNumber}`).then(() => {
      const cardsTmp = [...cards];
      const filteredCards = cardsTmp.filter((card) => card.cardNumber !== cardNumber);
      setCards(filteredCards);
      setTransactions([]);
      setSelectedCard(0);
    }).catch((error) => {
      setComponentState({
        loading: false,
        error: true,
        errorMessage: error.response.data.message,
      });
    });
  };

  return (
    <Modal isOpen={deleteCardModalVisible} onClose={() => setDeleteCardModalVisible(false)}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Deleting Card</Modal.Header>
        {(!componentState.loading && componentState.error)
          ? (
            <Modal.Body>
              <Result error={componentState.error} errorMessage={componentState.errorMessage} />
            </Modal.Body>
          )
          : (
            <>
              <Modal.Body>
                <Text fontSize="2xl">Are you sure u want to delete this card?</Text>
              </Modal.Body>
              <Button
                style={styles.button}
                onPress={handleDeleteButton}
                isLoading={componentState.loading}
                isLoadingText="Deleting..."
              >
                Delete
              </Button>
            </>
          )}
      </Modal.Content>
    </Modal>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: 10,
    backgroundColor: '#f43f5e',
  },
});
