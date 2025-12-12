import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ProductsScreen from '../modules/Products/screens/Products.screen'
import DetailProductScreen from '../modules/Products/screens/DetailProduct.screen'
import Product from '../modules/Products/models/IProduct'
import ListCreditCardsScreen from '../modules/CreditCards/screens/ListCreditCards.screen'

export type RootStackParamList = {
  Products: undefined
  DetailProduct: { product: Product }
  ListCreditCard: undefined
}

const Stack = createStackNavigator<RootStackParamList>()

const RootStack = () => {
  return (
   <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007AFF'
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold'
          }
        }}
      >
        <Stack.Screen
          name='ListCreditCard'
          component={ListCreditCardsScreen}
           options={{ title: 'Tarjetas de crédito' }}
        />
        <Stack.Screen
          name='Products'
          component={ProductsScreen}
          options={{ title: 'Productos' }}
        />
        <Stack.Screen
          name='DetailProduct'
          component={DetailProductScreen}
          options={{ title: 'Detalle de producto' }}
        />
      </Stack.Navigator>
  )
}

export default RootStack
