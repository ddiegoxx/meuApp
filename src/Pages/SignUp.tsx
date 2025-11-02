import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Alert } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';

import {
  Background,
  Container,
  AreaInput,
  Input,
  SubmitButton,
  SubmitText,
} from './styles';

type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

type Props = StackScreenProps<AuthStackParamList, 'SignUp'>;

export default function SignUp({ navigation }: Props) {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isFormValid = () => {
    return (
      nome.trim().length >= 3 &&
      email.includes('@') &&
      email.includes('.') &&
      password.length >= 6 &&
      password === confirmPassword
    );
  };
  const clearForm = () => {
    setNome('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleSignUp = () => {
    if (isFormValid()) {
      console.log('Cadastrando usuário:');
      Alert.alert("Cadastro realizado com sucesso!");
      clearForm();
      navigation.navigate('SignIn');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <Background>
        <Container>
          

          <AreaInput>
            <Input
              placeholder="Nome completo"
              autoCorrect={false}
              autoCapitalize="words"
              value={nome}
              onChangeText={setNome}
            />
          </AreaInput>

          <AreaInput>
            <Input
              placeholder="Email"
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </AreaInput>

          <AreaInput>
            <Input
              placeholder="Senha"
              autoCorrect={false}
              autoCapitalize="none"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
          </AreaInput>

          <AreaInput>
            <Input
              placeholder="Confirmar senha"
              autoCorrect={false}
              autoCapitalize="none"
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </AreaInput>

          <SubmitButton 
            onPress={handleSignUp}
            disabled={!isFormValid()}
            style={{
              opacity: isFormValid() ? 1 : 0.6
            }}
          >
            <SubmitText>Cadastrar</SubmitText>
          </SubmitButton>
        </Container>
      </Background>
    </KeyboardAvoidingView>
  );
}