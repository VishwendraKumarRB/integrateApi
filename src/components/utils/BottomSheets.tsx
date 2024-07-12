import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Modal } from "react-native";
import axios from "axios";

const BottomSheet = ({ setVisible, visible, videoLink }: any) => {
  const [characterData, setCharacterData] = useState<any>();
  const bottomSheetApi = async () => {
    axios({
      method: "GET",
      url: `${videoLink}`,
    })
      .then(async (charResponse) => {
        //   console.log(charResponse.data)
        setCharacterData(charResponse.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    bottomSheetApi();
  }, []);

  return (
    <View>
      <Modal
        visible={true}
        onRequestClose={() => setVisible(false)}
        transparent={true}
      >
        <View
          style={{
            position: "absolute",
            bottom: 0,
            backgroundColor: "#fff",
            width: "100%",
            padding: 20,
          }}
        >
          <Text>{characterData?.name} </Text>
          <Text>{characterData?.created} </Text>
          <Text>{characterData?.episode} </Text>
          <Text>{characterData?.url} </Text>
        </View>
      </Modal>
    </View>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({});