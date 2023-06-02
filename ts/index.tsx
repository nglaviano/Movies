import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  Platform,
} from "react-native";
import { colors } from "./styleguide";
import { Movie, SearchBar, SearchResultsStats } from "./components";
import { useCallback, useState } from "react";
import { getSearchResults } from "./api";
import { GetSearchResultsSuccess } from "./api/getSearchResults/GetSearchResultsType";

const Root = () => {
  const [searchResults, setSearchResults] = useState<GetSearchResultsSuccess[]>(
    []
  );

  const onSubmitSearch = useCallback(
    async (input: string) => {
      const data = await getSearchResults(input);

      if (!data) {
        alert("Error fetch movie data");
      } else if (!!data && data.Response === "False") {
        alert(data.Error);
      } else if (
        searchResults.some(
          (movie) =>
            movie.Title === data.Title && movie.Released === data.Released
        )
      ) {
        alert("Movie has already been found");
      } else {
        setSearchResults((prev) => [data, ...prev]);
      }
    },
    [searchResults]
  );

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      <View style={styles.searchBarContainer}>
        <SearchBar onSubmit={onSubmitSearch} placeholderText="Search Movies" />
      </View>
      <FlatList
        data={searchResults}
        renderItem={({ item, index }) => (
          <Movie isExpanded={index === 0} movie={item} />
        )}
        keyExtractor={(item) => `${item.Title} (${item.Released})`}
      />
      <SearchResultsStats
        searchResults={searchResults}
        resetSearchResults={() => {
          setSearchResults([]);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "flex-start",
    marginTop: Platform.OS === "android" ? 10 : 0,
    overflow: "hidden",
  },
  scrollview: {
    flex: 1,
  },
  searchBarContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    backgroundColor: colors.white,
    shadowColor: colors.grayer,
    shadowOffset: { height: 5, width: 0 },
    shadowOpacity: 0.1,
    elevation: 15,
  },
});

export default Root;
