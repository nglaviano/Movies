import React, { Dispatch, SetStateAction, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { colors } from "../../styleguide";

type Props = {
  onSubmit: (userInput: string) => void;
  placeholderText?: string;
};

const SearchBar = ({ onSubmit, placeholderText }: Props) => {
  const [userInput, setUserInput] = useState<string>();

  return (
    <View style={styles.userInputContainer}>
      <Entypo name="magnifying-glass" size={17} />
      <TextInput
        style={styles.userInput}
        onChangeText={setUserInput}
        placeholder={placeholderText}
      />
      <TouchableOpacity
        onPress={() => {
          !!userInput && onSubmit(userInput);
        }}
      >
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  userInput: {
    flex: 1,
  },
  userInputContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.gray,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 50,
    alignItems: "center",
    gap: 5,
  },
});
export default SearchBar;
