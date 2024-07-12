import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View,Image,  TouchableOpacity } from 'react-native';
import Characters from './src/components/character/characters';
import{NavigationContainer} from "@react-navigation/native"
import{createNativeStackNavigator} from '@react-navigation/native-stack'
interface IData {
  created: string;
  episode: Array<any>;
  gender: string;
  id: number;
  image: string;
  location: Array<object>;
  name: string;
  origin: Array<object>;
  species: string;
  status: string;
  type: string;
  url: string;
}
const Stack = createNativeStackNavigator();
export default function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Characters" component={Characters}/>
      </Stack.Navigator>
    </NavigationContainer>
  )};  
const Home =({navigation}:any)=>{
  const [data, setData] = useState<Array<IData>>([]);
  const getApiData = async () => {
    axios
      .get("https://rickandmortyapi.com/api/character")
      .then(async (response) => {
        // console.log("hello",response.data.results)
        await setData(response.data.results)
      })
  }
  useEffect(() => {
    getApiData()
  }, [])
  return (
    <View style={styles.container}>      
      <ScrollView > 
        {
          data?.map(item => {
            return (
              <View key={item.id}  style={{flexDirection:"row" ,margin:20}}>
                <View style={{marginRight:50}}>
                  <TouchableOpacity onPress={()=>
                   navigation.navigate("Characters",{
                    itemId:item.id,
                   })
                  }>
                <Image 
                style={{height:80 , width:80}} 
                source={{ uri: `${item.image}` }}/>
                </TouchableOpacity>
                </View>
                <View>                
                <Text>{item.name}</Text>
                <Text>{item.status}</Text>
                <Text>{item.species}</Text>
                <Text>{item.gender}</Text>
                </View>
            </View>             
            )
          })
        }
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   },
});