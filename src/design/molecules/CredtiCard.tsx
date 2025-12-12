import { View, Text, StyleSheet } from 'react-native'
import React, { FC } from 'react'

type Props = {
    balance: string,
    cardNumber: string,
    cardHolder: string,
    expiryDate: string,
    cardType: 'VISA' | 'MASTERCARD',
}

const CreditCard: FC<Props> = ({ balance, cardNumber, cardHolder, expiryDate, cardType }) => {
  return (
        <View style={stylesCard.card}>
            <View style={stylesCard.gradientContainer}>
                <View style={[stylesCard.gradientLayer, stylesCard.layerBlank]} />
                <View style={[stylesCard.gradientLayer, stylesCard.layerLight]} />
                <View style={[stylesCard.gradientLayer, stylesCard.layerMedium]} />
                <View style={[stylesCard.gradientLayer, stylesCard.layerDark]} />
            </View>
            <View style={stylesCard.sectionTop}>
                <Text style={[stylesCard.text, { fontSize: 24 }]}>{balance}</Text>
                <Text style={[stylesCard.text, { fontSize: 26 }]}>{cardType}</Text>
            </View>
            <View style={stylesCard.sectionMiddle}>
                <Text style={[stylesCard.text, stylesCard.textCardNumber]}>****</Text>
                <Text style={[stylesCard.text, stylesCard.textCardNumber]}>****</Text>
                <Text style={[stylesCard.text, stylesCard.textCardNumber]}>****</Text>
                <Text style={[stylesCard.text, stylesCard.textCardNumber]}>{cardNumber}</Text>
                <View style={{ flex: 0.3 }} />
            </View>
            <View style={stylesCard.sectionBottom}>
                <View>
                    <Text style={stylesCard.labelBottom}>Card Holder</Text>
                    <Text style={[stylesCard.text]}>{cardHolder}</Text>
                </View>
                <View>
                    <Text style={stylesCard.labelBottom}>Expires</Text>
                    <Text style={[stylesCard.text]}>{expiryDate}</Text>
                </View>
            </View>
        </View>
  )
}

const stylesCard = StyleSheet.create({
  text: {
    color: '#fff'
  },
  card: {
    borderRadius: 18,
    backgroundColor: '#dedede',
    margin: 'auto',
    paddingVertical: 40,
    paddingHorizontal: 15,
    overflow: 'hidden',
    width: '80%',
    height: 209,
    justifyContent: 'space-between',
    boxShadow: '0 10px 20px 0 rgba(0, 0, 0, 0.2)'
  },

  sectionTop: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  sectionMiddle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20
  },
  gradientContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  gradientLayer: {
    position: 'absolute',
    width: '150%',
    height: '100%',
    transform: [{ rotate: '-50deg' }]
  },
  layerBlank: {
    backgroundColor: '#DDDDDD',
    left: '-40%',
    top: 0
  },
  layerLight: {
    backgroundColor: '#C5C5C5',
    left: '-20%',
    top: 0
  },
  layerMedium: {
    backgroundColor: '#4A4A4A',
    left: '20%',
    top: 20
  },
  layerDark: {
    backgroundColor: '#000000',
    left: '60%',
    top: 20
  },
  sectionBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textCardNumber: {
    fontSize: 18
  },
  labelBottom: {
    color: 'rgba(255,255,255,0.5)'
  }

})
export default CreditCard
