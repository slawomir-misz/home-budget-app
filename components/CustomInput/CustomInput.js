/* eslint-disable react/prop-types */
import React, { } from 'react';
import {
  Input, Icon, Text,
} from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Controller } from 'react-hook-form';
import global from '../../styles/global';

export default function CustomInput({
  control, name, placeholder, iconName, rules, type,
}) {
  return (
    <Controller
      rules={rules}
      control={control}
      name={name}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          <Input
            value={value}
            placeholder={placeholder}
            type={type}
            isInvalid={error}
            onChangeText={onChange}
            onBlur={onBlur}
            style={global.default_input}
            InputLeftElement={(
              <Icon
                as={<MaterialCommunityIcons name={iconName} />}
                size={5}
                ml="2"
                color="#3b82f6"
              />
            )}
          />
          {error && (
            <Text p={1} color="danger.500">
              {error.message}
            </Text>
          )}
        </>
      )}
    />
  );
}
