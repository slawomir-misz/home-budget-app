/* eslint-disable react/prop-types */
import React, { } from 'react';
import { Icon, Select } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Controller } from 'react-hook-form';
import global from '../../styles/global';

export default function CustomSelect({
  control, name, iconName, defaultValue, inputValues,
}) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({
        field: { value, onChange },
      }) => (
        <Select
          name={name}
          selectedValue={value}
          onValueChange={(itemValue) => onChange(itemValue)}
          style={global.default_input}
          InputLeftElement={(
            <Icon
              as={<MaterialCommunityIcons name={iconName} />}
              size={5}
              ml="2"
              color="#3b82f6"
            />
             )}
        >
          {inputValues.map((item) => (
            <Select.Item label={item.label} value={item.value} key={item.label} />
          ))}
        </Select>
      )}
    />
  );
}
