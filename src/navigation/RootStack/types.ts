import { ParamListBase } from '@react-navigation/native';

export type SubNavigator<T extends ParamListBase> = {
  [K in keyof T]: { screen: K; params?: T[K] };
}[keyof T];
