import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions
} from 'react-native'

import { useNavigation } from '@react-navigation/native'

const { width: WIDTH } = Dimensions.get('window')
export default function FavoritePost({ data }) {
  const navigation = useNavigation()
  function handleNavigate() {
    navigation.navigate('Detail', { id: data.id })
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <ImageBackground
        source={{
          uri: `http://10.0.0.8:1337${data?.attributes?.cover?.data?.attributes?.url}`
        }}
        style={styles.cover}
        resizeMode="cover"
        blurRadius={3}
        imageStyle={{ borderRadius: 6, opacity: 0.4 }}
      >
        <Text numberOfLines={1} style={styles.title}>
          {data?.attributes?.title}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginRight: 8
  },
  cover: {
    borderRadius: 4,
    height: 100,
    width: WIDTH - 60,
    justifyContent: 'flex-end',
    backgroundColor: '#232630'
  },
  title: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
    paddingVertical: 8,
    paddingHorizontal: 12,
    textShadowColor: '#121212',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 8
  }
})
