import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from '../Pages/SignUp'; 

export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

const AuthStack = createStackNavigator<AuthStackParamList>();

export default class AuthRoutes extends React.Component {
  render() {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen 
          name="SignUp" 
          component={SignUp} />
      </AuthStack.Navigator>
    );
  }
}