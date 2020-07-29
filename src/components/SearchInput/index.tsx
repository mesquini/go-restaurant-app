import React, { useState, useCallback, useRef } from 'react';

import { TextInputProps } from 'react-native';

import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
  name?: string;
}

interface IInputValueRef {
  value: string;
}

const SearchInput: React.FC<InputProps> = ({ value = '', ...rest }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const inputElementRef = useRef<any>(null);
  const inputValueRef = useRef<IInputValueRef>({ value: '' });

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!value);
  }, [value]);

  return (
    <Container isFocused={isFocused}>
      <Icon
        name="search"
        size={20}
        color={isFocused || isFilled ? '#C72828' : '#B7B7CC'}
      />

      <TextInput
        ref={inputElementRef}
        placeholderTextColor="#B7B7CC"
        onFocus={handleInputFocus}
        autoCapitalize="sentences"
        onBlur={handleInputBlur}
        value={value}
        onChangeText={valueChange => {
          inputValueRef.current.value = valueChange;
        }}
        testID="search-input"
        {...rest}
      />
    </Container>
  );
};

export default SearchInput;
