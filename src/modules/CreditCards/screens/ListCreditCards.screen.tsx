import { View } from 'react-native'
import React from 'react'
import CreditCard from '../../../design/molecules/CredtiCard'

type Props = {}

const ListCreditCardsScreen = (props: Props) => {
  return (
    <View style={{ marginTop: 50 }}>
      <CreditCard
        balance='$/ 400000'
        cardHolder='Cesar Solano'
        cardNumber='623734'
        cardType='VISA'
        expiryDate='26/30'
      />
    </View>
  )
}

export default ListCreditCardsScreen
