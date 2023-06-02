import React, { memo } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { GetSearchResultsSuccess } from "../../api/getSearchResults/GetSearchResultsType";
import { font } from "../../styleguide";
import Accordion from "../Accordion";
import { isMovieDataAvailable } from "../../utils";

type Props = {
  movie: GetSearchResultsSuccess;
  isExpanded: boolean;
};

const MovieDetail = ({
  label,
  value,
}: {
  label: keyof GetSearchResultsSuccess;
  value: string;
}) =>
  isMovieDataAvailable(value) ? (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Text>{label}</Text>
      <Text>{value}</Text>
    </View>
  ) : (
    <></>
  );

const Movie = memo(({ movie, isExpanded }: Props) => {
  return (
    <Accordion heading={movie.Title} isExpanded={isExpanded}>
      <Image
        source={{ uri: movie.Poster }}
        style={styles.poster}
        resizeMode="contain"
      />
      <View style={styles.movieDetail}>
        <MovieDetail label="Director" value={movie.Director} />
        <MovieDetail label="Actors" value={movie.Actors} />
        <MovieDetail label="Awards" value={movie.Awards} />
      </View>
    </Accordion>
  );
});

const styles = StyleSheet.create({
  movieDetail: {
    margin: 10,
    gap: 2,
  },
  poster: {
    width: "100%",
    height: 450,
  },
});

export default Movie;
