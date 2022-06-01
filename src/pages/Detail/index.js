import React, { useEffect, useState, useLayoutEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import { Feather, Entypo } from '@expo/vector-icons'

import api from '../../services/api'

export default function Detail() {
  const route = useRoute()
  const navigation = useNavigation()

  const [post, setPost] = useState({})
  const [links, setLinks] = useState([])

  useEffect(() => {
    async function getPost() {
      const response = await api.get(
        `api/posts/${route.params?.id}?populate=cover,category,Opcoes`
      )
      setPost(response.data.data)
      setLinks(response.data?.data?.attributes?.Opcoes)
    }

    getPost()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.cover}
        source={{
          uri: `http://192.168.0.108:1337${post?.attributes?.cover?.data?.attributes?.url}`
        }}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{post?.attributes?.title} </Text>
        <Text style={styles.descripton}>{post?.attributes?.description} </Text>
        {links.length > 0 && <Text style={styles.subTitle}> Links</Text>}
        {links.map(link => (
          <TouchableOpacity key={link.id} style={styles.link}>
            <Feather name="link" size={20} color="#1E4687" />
            <Text style={styles.linkText}>{link.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  cover: {
    width: '100%',
    height: 230
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 14,
    marginTop: 18
  },
  content: {
    paddingHorizontal: 12
  },
  descripton: {
    lineHeight: 20
  },
  subTitle: {
    fontWeight: 'bold',
    marginTop: 14,
    fontSize: 18,
    marginBottom: 6
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  linkText: {
    color: '#1E4687',
    fontSize: 16,
    marginLeft: 6
  }
})
