import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import api from '../../services/api'
import CategoryItem from '../../components/CategoryItem'
import { getFavorite, setFavorite } from '../Search/favorite'

export default function Home() {
  const navigation = useNavigation()

  const [categories, setCategories] = useState([])

  useEffect(() => {
    async function loadData() {
      const category = await api.get('/api/categories?populate=icon')
      setCategories(category.data.data)
    }
    loadData()
  }, [])

  async function handleFavorite(id) {
    const response = await setFavorite(id)

    console.log(response)
    alert('Categoria adicionada aos favoritos')
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>DevBlog</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Feather name="search" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        contentContainerStyle={{ paddingRight: 12 }}
        style={styles.categories}
        data={categories}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <CategoryItem data={item} favorite={() => handleFavorite(item.id)} />
        )}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232630'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 18,
    marginBottom: 24
  },
  name: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold'
  },
  categories: {
    maxHeight: 115,
    backgroundColor: '#EFEFEF',
    marginHorizontal: 18,
    borderRadius: 8,
    zIndex: 9
  }
})