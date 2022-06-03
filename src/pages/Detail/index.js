import React, { useEffect, useState, useLayoutEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Share,
  Modal
} from 'react-native'

import { useNavigation, useRoute } from '@react-navigation/native'
import { Feather, Entypo } from '@expo/vector-icons'
import api from '../../services/api'

import LinkWeb from '../../components/LinkWeb'

export default function Detail() {
  const route = useRoute()
  const navigation = useNavigation()

  const [post, setPost] = useState({})
  const [links, setLinks] = useState([])

  const [modalVisible, setModalVisible] = useState(false)
  const [openLink, setOpenLink] = useState({})

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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleShare}>
          <Entypo name="share" size={25} color="#fff" />
        </TouchableOpacity>
      )
    })
  }, [navigation, post])

  async function handleShare() {
    try {
      const result = await Share.share({
        message: `
        Confere esse post: ${post?.attributes?.title}

        ${post?.attributes?.description}

        Vi la no App DevPost!
        `
      })

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('ACTIVY TYPE')
        } else {
          console.log('Compartilhado ')
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Modal Fechado')
      }
    } catch (error) {
      console.log(error)
    }
  }

  function handleOpenLink(link) {
    setModalVisible(true)
    setOpenLink(link)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.cover}
        source={{
          uri: `http://10.0.0.8:1337${post?.attributes?.cover?.data?.attributes?.url}`
        }}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{post?.attributes?.title} </Text>
        <Text style={styles.descripton}>{post?.attributes?.description} </Text>
        {links.length > 0 && <Text style={styles.subTitle}> Links</Text>}
        {links.map(link => (
          <TouchableOpacity
            key={link.id}
            style={styles.link}
            onPress={() => handleOpenLink(link)}
          >
            <Feather name="link" size={14} color="#1E4687" />
            <Text style={styles.linkText}>{link.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Modal animationType="slide" visible={modalVisible} transparent={true}>
        <LinkWeb
          link={openLink?.url}
          title={openLink?.name}
          closeModal={() => setModalVisible(false)}
        />
      </Modal>
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
