import React, { useLayoutEffect, useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import api from '../../services/api'
import PostItem from '../../components/PostItem'

export default function CategoryPost() {
  const navigation = useNavigation()
  const route = useRoute()
  const [posts, setPosts] = useState([])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle:
        route.params?.title === '' ? 'Categorias' : route.params?.title
    })
  }, [navigation])

  useEffect(() => {
    async function loadPosts() {
      const response = await api.get(
        `api/categories/${route.params?.id}?fields=name&populate=posts.cover`
      )
      setPosts(response.data?.data?.attributes?.posts?.data)
    }

    loadPosts()
  }, [])

  function handleBack() {
    navigation.goBack()
  }
  return (
    <View style={styles.container}>
      {posts.length === 0 && (
        <View style={styles.warningContainer}>
          <Text style={styles.warning}>Nenhum post encontrado</Text>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.textButton}>Encontrar Posts</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        data={posts}
        keyExtractor={post => String(post.id)}
        renderItem={({ item }) => <PostItem data={item} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: '#fff'
  },
  warningContainer: {
    alignItems: 'center'
  },
  warning: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  backButton: {
    backgroundColor: '#162133',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 12,
    borderRadius: 4
  },
  textButton: {
    color: '#fff'
  }
})
