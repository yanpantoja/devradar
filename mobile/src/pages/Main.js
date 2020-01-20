import React, { useState, useEffect } from 'react'; 
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

function Main({ navigation }) {
  const [currentRegion, setCurrentRegion] = useState(null);
  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync();

      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true,
        });

        const { latitude, longitude } = coords;

        setCurrentRegion ({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        })
      }
    }

    loadInitialPosition();
  }, []);

  if(!currentRegion) {
    return null;
  }
  return ( 
    <>
      <MapView initialRegion={currentRegion} style={styles.map}> 
        <Marker coordinate={{ latitude: -20.2628435, longitude: -40.300069 }}>
          <Image style={styles.avatar} source={{ uri: 'https://avatars2.githubusercontent.com/u/41760474?s=460&v=4' }}/>

          <Callout onPress={() => {
            navigation.navigate('Profile', { github_username: 'yanpantoja' });
          }}>
            <View style={styles.callout}>
              <Text style={styles.devName}>Yan Pantoja</Text>
              <Text style={styles.devBio}>Apaixonado pelas melhores tecnologias de desenvolvimento web e mobile</Text>
              <Text style={styles.devTechs}>ReactJS, React Native, Node.js</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>

      <View style={styles.searchForm}>
          <TextInput style={styles.searchInput} placeholder="Buscar devs por techs..." placeholderTextColor="#999" autoCapitalize="words" autoCorrect={false}/>
          <TouchableOpacity onPress={() => {}} style={styles.loadButton}>
            <MaterialIcons name="my-location" size={20} color="#fff"/>
          </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
 
  map: {
    flex: 1
  },
  
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: '#fff'
  },
  
  callout: {
    width: 260,
  },

  devName: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  devBio: {
    color: '#666',
    marginTop: 5,
  },

  devTechs: {
    marginTop: 5,
  },

  searchForm: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: 'row',
  },

  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#fff',
    color: '#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    elevation: 2,
  },

  loadButton: {
    width: 50,
    height: 50,
    backgroundColor: '#8E4DFF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
})
export default Main;