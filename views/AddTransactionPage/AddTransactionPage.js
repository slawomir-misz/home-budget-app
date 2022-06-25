/* eslint-disable react/no-unstable-nested-components */
import { Text } from 'native-base';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import AddIcomingTransactionForm from './AddIncomingTransactionForm';
import AddOutgoingTransactionForm from './AddOutgoingTransactionForm';

export default function AddTransactionPage() {
  const renderScene = SceneMap({
    outgoing: () => <AddOutgoingTransactionForm />,
    incoming: () => <AddIcomingTransactionForm />,
  });
  const renderTabBar = (props) => (
    <TabBar
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      style={{ backgroundColor: '#fff' }}
      renderLabel={({ route }) => (
        <Text style={{ color: 'black' }}>{route.title}</Text>
      )}
    />
  );
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'outgoing', title: 'Outgoing' },
    { key: 'incoming', title: 'Incoming' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />

  );
}
