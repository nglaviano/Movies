import { Entypo } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, font } from "../../styleguide";

type Props = {
  heading: string;
  children: JSX.Element[];
  index: number;
};

const Accordion = ({ heading, children, index }: Props) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState<boolean>();

  useEffect(() => {
    setIsAccordionOpen(index === 0);
  }, [index]);

  return (
    <>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => {
          setIsAccordionOpen((prev) => !prev);
        }}
      >
        <Entypo name={`chevron-${isAccordionOpen ? "up" : "down"}`} size={25} />
        <Text style={font.h2}>{heading}</Text>
      </TouchableOpacity>
      {isAccordionOpen && (
        <>
          {children}
          <View style={styles.divider} />
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  heading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
    backgroundColor: colors.white,
  },
  divider: {
    height: 1,
    backgroundColor: colors.gray,
  },
});

export default Accordion;
