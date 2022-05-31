import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import api from '../../services/api'

export async function getFavorite() {
  const data = await AsyncStorage.getItem('@favCategory')

  if (data !== null) {
    const response = await api.get(
      `/api/categories/${data}?fields=name&populate=posts,posts.cover`
    )

    return response.data?.data?.attributes?.posts?.data
  } else {
    return []
  }
}

export async function setFavorite(category) {
  await AsyncStorage.setItem('@favCategory', String(category))

  const response = await getFavorite()

  return response
}
