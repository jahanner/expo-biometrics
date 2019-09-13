import { createAppContainer } from "react-navigation";
import {createStackNavigator} from 'react-navigation-stack'
import Login from "./Login";
import HomePage from "./HomePage";

const navigator = createStackNavigator(
  {
    Login: Login,
    Home: HomePage
  },
  {
    initialRouteName: "Login"
  }
);

export default createAppContainer(navigator);
