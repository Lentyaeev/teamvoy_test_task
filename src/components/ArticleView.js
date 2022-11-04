import { Image, Pressable, StatusBar, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Text } from '@react-native-material/core';
import React from 'react'
import ImageFrame from './ImageFrame';
import moment from 'moment';

const ArticleView = ({ article, setSelectedId }) => {
  return (
    <>
      <StatusBar />
      <TouchableOpacity onPress={() => setSelectedId(null)}>
        <Text variant='h3' style={styles.backButton}>{'< Back'}</Text>
      </TouchableOpacity>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
        <ImageFrame style={styles.image} url={article.urlToImage}/>
        <Text style={styles.text} variant='h5'>{article.title}</Text>
        <Text style={styles.text} variant='h6'>{article.description}</Text>
        <Text style={styles.text} variant='h6'>
          {article.author ? ('© ' + article.author) : 'No author set'}
        </Text>
        <TouchableOpacity onPress={() => Linking.openURL(article.url)}>
          <Text style={styles.link}>{article.url}</Text>
        </TouchableOpacity>
        <Text style={styles.text} variant='h6'>{'Published At: ' + moment(article.publishedAt).format("YYYY-MM-DD HH:MM")}</Text>
      </ScrollView>
    </>
  )
}

export default ArticleView

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  image: {
    height: 300,
    width: '100%',
    borderRadius: 20,
  },
  backButton: {
    color: '#00aeff',
    fontSize: 25,
    paddingLeft: 15,
    paddingTop: 15,
  },
  text: {
    paddingTop: 20,
  },
  link: {
    paddingTop: 20,
    color: '#00aeff',
  }
})