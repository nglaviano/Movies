import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, font } from "../../styleguide";
import useComputeSearchStats from "./hooks/useComputeSearchStats";
import { GetSearchResultsSuccess } from "../../api/getSearchResults/GetSearchResultsType";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  searchResults: GetSearchResultsSuccess[];
  resetSearchResults: () => void;
};
const SearchResultsStats = ({ searchResults, resetSearchResults }: Props) => {
  const searchStats = useComputeSearchStats(searchResults);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.resetContainer}
        onPress={resetSearchResults}
      >
        <MaterialCommunityIcons name="restart" size={20} />
        <Text style={font.h2}>Reset</Text>
      </TouchableOpacity>
      <View style={styles.statsRow}>
        <Text style={font.h3}>Box Office Mean</Text>
        <Text>{searchStats.boxOfficeMean}</Text>
      </View>
      <View style={styles.statsRow}>
        <Text>Box Office Standard Deviation</Text>
        <Text>{searchStats.boxOfficeStrdDeviation}</Text>
      </View>
      <View style={styles.statsRow}>
        <Text>Median RT Score</Text>
        <Text>{searchStats.medianRtScore}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    shadowColor: colors.grayer,
    shadowOffset: { height: -5, width: 0 },
    shadowOpacity: 0.1,
    padding: 10,
    gap: 2,
  },
  resetContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 5,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default SearchResultsStats;
