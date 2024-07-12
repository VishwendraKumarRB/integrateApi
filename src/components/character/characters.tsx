import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import * as Linking from "expo-linking";
import BottomSheet from "../utils/BottomSheets";
import { Modal } from "react-native";


interface IChar {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Array<object>;
  location: Array<object>;
  image: string;
  episode: Array<object>;
  url: string;
  created: string;
}
const Characters = ({ route }: any) => {
  const { itemId } = route.params;
  const [char, setChar] = useState<IChar>();
  const [visible, setVisible] = useState<boolean>(false);
  const [videoLink, setVideoLink] = useState<string>();
  const baseURL = "https://rickandmortyapi.com/api/character";
  const charApi = async () => {
    axios({
      method: "GET",
      url: `${baseURL}/${itemId}`,
    })
      // .get(`"https://rickandmortyapi.com/api/character/"${itemId}`)
      .then(async (resp) => {
        //  console.log(resp.data)
        setChar(resp.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    charApi();
  }, []);

  // const watchVideo = (videoLink: string) => {
  //   Linking.openURL(videoLink);
  // };
  const BottomSheets = ({ videoLink }: any) => {
   return(
    <BottomSheet setVisible={setVisible} videoLink={videoLink} visible={visible}/>
   )
  };

  return (
    
    <View>
      <ScrollView>
        <View key={char?.id} style={{ flexDirection: "row", margin: 20 }}>
          <View style={{ marginRight: 50 }}>
            <Image
              style={{ height: 80, width: 80 }}
              source={{ uri: `${char?.image}` }}
            />
          </View>
          <View>
            <Text>{char?.name}</Text>
            <Text>{char?.status}</Text>
            <Text>{char?.species}</Text>
            <Text>{char?.gender}</Text>
            <Text>{char?.created}</Text>
          </View>
        </View>
        {char?.episode.map((charItem: any) => {
          let res = charItem.slice(40);
          return (
            <View style={{ margin: 10 }} key={charItem}>
              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPress={() =>
                  {
                    setVisible(true),
                    setVideoLink(charItem)
                  }
                  // watchVideo(charItem)
                }
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 18,
                    backgroundColor: "#d6d6c2",
                    padding: 5,
                    borderRadius: 5,
                  }}
                >
                  Episode {res}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
      {visible ? <BottomSheets videoLink={videoLink} /> : null}
    </View>
  );
};

export default Characters;

const styles = StyleSheet.create({});
