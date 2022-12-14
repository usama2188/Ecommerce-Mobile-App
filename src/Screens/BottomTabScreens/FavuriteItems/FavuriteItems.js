import { View, Text, ScrollView, TouchableWithoutFeedback, Image } from 'react-native'
import React from 'react'
import { usePostContext } from '../../../contexts/PostContext'
import { useFavuriteItemsContext } from '../../../contexts/FavuriteItemsContext'
import { styles } from '../../Frontend/Home/styles'
import { IconButton, MD3Colors } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'



export default function FavuriteItems({ navigation }) {
  // const { products, setProducts } = useProductsContext()
  const { unLikePost } = useFavuriteItemsContext()
  const { post, setPost } = usePostContext()

  const handleFavurite = (id) => {
    setPost(
      post.map((item) => item.id == id ? { ...item, isLiked: !item.isLiked } : item)
    )
    unLikePost(id)
    // getFromDb()

  }

  // Add Favurite Item
  const addFavuriteItem = async (id) => {
    await firestore()

      .collection('favuriteItems').doc(auth().currentUser.uid).collection('likedPosts').doc(id)
      .add({
        isLiked: true

      })
      .then(() => {
        console.log(id, ' Liked');
      }).catch(err => {
        console.error(err)
      })
  }
  let arr = []
  const getFromDb = async () => {
    await firestore().collection('favuriteItems')
      .doc(auth().currentUser.uid)
      .collection('likedPosts').get().then((docs) => {
        docs.forEach((doc) => { arr.push({ ...doc.data(), id: doc.id }) })
      })
    console.log(arr)
  }


  return (
    <ScrollView>
      {post.filter(item => item.isLiked == true).length == 0 ?
        < Text  style={{
          textAlign: 'center', fontWeight: 'bold',
          marginTop: 350
        }}> No item found  </Text >


        : <View style={styles.flexContainer}>

          {post.filter(item => item.isLiked == true).map((item, i) => {
            return <TouchableWithoutFeedback key={i} onPress={() => navigation.navigate('ProductDetails', { item })}>
              <View style={[styles.box, styles.shadowProp]}>

                <IconButton
                  icon={!item.isLiked ? "heart-outline" : "heart"}
                  iconColor={MD3Colors.error50}
                  size={20}
                  onPress={() => handleFavurite(item.id)}
                  style={{ position: 'absolute', zIndex: 1, top: -5, left: 105 }}
                />
                {/* //PRODUCT iMAGE */}
                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                  <Image
                    source={{
                      uri: item.newPost.url
                    }}
                    style={{ width: 148, borderRadius: 20, height: 130, objectFit: "cover" }}

                  />
                  <View style={styles.textBox}>
                    <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{item.title}</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>PKR  {item.price}</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 12, marginTop: 5 }}>{item.address}</Text>



                    <View style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between', width: 130, marginTop: 10
                    }}>
                      <Icon name='bed' size={18} /><Text>{item.rooms}</Text>
                      <Icon name='bathtub-outline' size={18} /><Text>{item.bath}</Text>
                      <Icon name='crop-square' size={18} /><Text>{item.area}</Text>
                    </View>
                  </View>
                  <View>


                  </View>
                </View>

              </View>

            </TouchableWithoutFeedback>
          })

          }

        </View>
      }

    </ScrollView >

  )
}