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
import FavoritePost from '../../components/FavoritePost'

export default function Home() {
  const navigation = useNavigation()

  const [categories, setCategories] = useState([])
  const [favCategory, setfavCategory] = useState([])

  useEffect(() => {
    async function loadData() {
      const category = await api.get('/api/categories?populate=icon')
      setCategories(category.data.data)
    }
    loadData()
  }, [])

  useEffect(() => {
    async function favorite() {
      const response = await getFavorite()
      setfavCategory(response)
    }

    favorite()
  }, [])

  async function handleFavorite(id) {
    const response = await setFavorite(id)

    setfavCategory(response)
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

      <View style={styles.main}>
        {favCategory.length > 0 && (
          <FlatList
            style={{ marginTop: 50, maxHeight: 100, paddingStart: 18 }}
            contentContainerStyle={{ paddingEnd: 18 }}
            data={favCategory}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => <FavoritePost data={item} />}
          />
        )}
      </View>
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
  },

  main: {
    backgroundColor: '#FFF',
    flex: 1,
    marginTop: -30
  }
})
