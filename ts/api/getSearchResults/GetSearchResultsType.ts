type Rating = {
  Source: string;
  Value: string;
};

export type GetSearchResultsSuccess = {
  Actors: string;
  Awards: string;
  BoxOffice: string;
  Country: string;
  DVD: string;
  Director: string;
  Genre: string;
  Language: string;
  Metascore: string;
  Plot: string;
  Poster: string;
  Production: string;
  Rated: string;
  Ratings: Rating[];
  Released: string;
  Response: "True";
  Runtime: string;
  Title: string;
  Type: string;
  Website: string;
  Writer: string;
  Year: string;
  imdbID: string;
  imdbRating: string;
  imdbVotes: string;
};

type GetSearchResultsError = {
  Response: "False";
  Error: "Movie not found!";
};

export type GetSearchResultsType =
  | GetSearchResultsSuccess
  | GetSearchResultsError;
