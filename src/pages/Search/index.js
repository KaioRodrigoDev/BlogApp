import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard
} from 'react-native'
import { Feather } from '@expo/vector-icons'

import PostItem from '../../components/PostItem'

import api from '../../services/api'

export default function Search() {
  const [input, setInput] = useState('')
  const [empety, setEmpety] = useState(false)
  const [posts, setPosts] = useState([])

  async function handleSearchPost() {
    if (input === '') {
      setEmpety(true)
      setPosts([])
      return
    }
    const response = await api.get(
      `api/posts?filters[title][$containsi]=${input}&populate=cover`
    )

    if (response.data?.data.length === 0) {
      setEmpety(true)
      setPosts([])
      return
    }

    setPosts(response.data?.data)

    setInput('')
    setEmpety(false)
    Keyboard.dismiss()
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={text => setInput(text)}
          placeholder="Buscar"
        />
        <View style={styles.containerButton}>
          <TouchableOpacity onPress={handleSearchPost}>
            <Feather name="search" size={25} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
      {empety && (
        <View>
          <Text style={styles.textEmpety}>Nenhum resultado encontrado</Text>
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
    backgroundColor: '#fff',
    padding: 18
  },
  containerInput: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18
  },
  input: {
    width: '85%',
    backgroundColor: '#C4C4C4',
    height: 50,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    padding: 8
  },
  containerButton: {
    width: '15%',
    height: 50,
    backgroundColor: '#C4C4C4',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -1
  },
  textEmpety: {
    textAlign: 'center'
  }
})
