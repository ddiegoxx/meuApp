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
  ErrorText,
} from './styles';

type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

type Props = StackScreenProps<AuthStackParamList, 'SignUp'>;

export default function SignUp({ navigation }: Props) {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');


  const [hasTriedSubmit, setHasTriedSubmit] = useState(false);


  const getErroCampo = (campo: string, valor: string) => {
    switch (campo) {
      case 'nome':
        return valor.trim().length < 3 ? 'Nome deve ter 3+ caracteres' : '';
      case 'email':
        return !valor.includes('@') || !valor.includes('.') ? 'Email inválido' : '';
      case 'senha':
        return valor.length < 6 ? 'Senha deve ter 6+ caracteres' : '';
      case 'confirmarSenha':
        return valor !== senha ? 'Senhas não conferem' : '';
      default:
        return '';
    }
  };

  const isFormularioValido = () => {
    return (
      getErroCampo('nome', nome) === '' &&
      getErroCampo('email', email) === '' &&
      getErroCampo('senha', senha) === '' &&
      getErroCampo('confirmarSenha', confirmarSenha) === ''
    );
  };

  const handleSignUp = () => {
    setHasTriedSubmit(true);

    if (isFormularioValido()) {
      setNome('');
      setEmail('');
      setSenha('');
      setConfirmarSenha('');
      setHasTriedSubmit(false);
      console.log('Usuário cadastrado:', { nome, email });
      Alert.alert('Sucesso!', 'Cadastro realizado!');
    }
  };

  const botaoDesabilitado = hasTriedSubmit ? !isFormularioValido() : false;

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Background>
        <Container>
          
          <AreaInput>
            <Input
              placeholder="Nome completo"
              value={nome}
              onChangeText={setNome}
            />
            {hasTriedSubmit && getErroCampo('nome', nome) ? (
              <ErrorText>{getErroCampo('nome', nome)}</ErrorText>
            ) : null}
          </AreaInput>

          <AreaInput>
            <Input
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            {hasTriedSubmit && getErroCampo('email', email) ? (
              <ErrorText>{getErroCampo('email', email)}</ErrorText>
            ) : null}
          </AreaInput>

          <AreaInput>
            <Input
              placeholder="Senha (6+ caracteres)"
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
            />
            {hasTriedSubmit && getErroCampo('senha', senha) ? (
              <ErrorText>{getErroCampo('senha', senha)}</ErrorText>
            ) : null}
          </AreaInput>

          <AreaInput>
            <Input
              placeholder="Confirmar senha"
              secureTextEntry
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
            />
            {hasTriedSubmit && getErroCampo('confirmarSenha', confirmarSenha) ? (
              <ErrorText>{getErroCampo('confirmarSenha', confirmarSenha)}</ErrorText>
            ) : null}
          </AreaInput>

          <SubmitButton 
            onPress={handleSignUp}
            disabled={botaoDesabilitado}
            style={{ opacity: botaoDesabilitado ? 0.6 : 1 }}
          >
            <SubmitText>Cadastrar</SubmitText>
          </SubmitButton>
        </Container>
      </Background>
    </KeyboardAvoidingView>
  );
}