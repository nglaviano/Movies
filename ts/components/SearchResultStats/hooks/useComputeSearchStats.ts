import { useMemo } from "react";
import { GetSearchResultsSuccess } from "../../../api/getSearchResults/GetSearchResultsType";

type ComputedSearchStats = {
  boxOfficeMean: string;
  boxOfficeStrdDeviation: string;
  medianRtScore: string;
};

const cleanDollarValue = (value: string): number =>
  parseFloat(value.replace(/[$,]/g, ""));

const calculateBoxOfficeMean = (
  searchResults: GetSearchResultsSuccess[],
  numOfSearchResults: number
) => {
  if (searchResults.length < 1) {
    return 0;
  }

  const { totalBoxOffice } = searchResults.reduce(
    (previous, current) => {
      return {
        totalBoxOffice:
          previous.totalBoxOffice + cleanDollarValue(current.BoxOffice),
      };
    },
    { totalBoxOffice: 0 }
  );

  return totalBoxOffice / numOfSearchResults;
};

const calculateBoxOfficeStrdDeviation = (
  searchResults: GetSearchResultsSuccess[],
  boxOfficeMean: number
) => {
  const deviations = searchResults.reduce((previous, current) => {
    const cleanValue = cleanDollarValue(current.BoxOffice);
    const boxOfficeMeanDifference = cleanValue - boxOfficeMean;
    const differenceSquared = Math.pow(boxOfficeMeanDifference, 2);
    console.log(cleanValue);

    return previous + differenceSquared;
  }, 0);

  return searchResults.length < 2
    ? 0
    : Math.sqrt(deviations / (searchResults.length - 1));
};

const calculateMedianRtScore = (searchResults: GetSearchResultsSuccess[]) => {
  if (searchResults.length < 1) {
    return "0%";
  }
  const ratings: number[] = searchResults.map((movie) => {
    const rating = movie.Ratings.find(
      (rating) => rating.Source === "Rotten Tomatoes"
    );

    if (!rating) {
      return 0;
    }

    return parseFloat(rating.Value.replace("%", ""));
  });

  const sortedRatings = ratings.sort((first, second) => first - second);

  const numOfResults = sortedRatings.length;
  if (numOfResults % 2 === 0) {
    const middleLow = numOfResults / 2 - 1;
    const middleHigh = middleLow + 1;
    const avg = (sortedRatings[middleHigh] + sortedRatings[middleLow]) / 2;
    return `${avg}%`;
  } else {
    const medianIndex = Math.round(numOfResults / 2) - 1;
    return `${sortedRatings[medianIndex]}%`;
  }
};

export default (
  searchResults: GetSearchResultsSuccess[]
): ComputedSearchStats =>
  useMemo(() => {
    const boxOfficeMean = calculateBoxOfficeMean(
      searchResults,
      searchResults.length
    );
    const boxOfficeStrdDeviation = calculateBoxOfficeStrdDeviation(
      searchResults,
      boxOfficeMean
    );
    const medianRtScore = calculateMedianRtScore(searchResults);

    const dollarFormatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });

    return {
      boxOfficeMean: dollarFormatter.format(boxOfficeMean),
      boxOfficeStrdDeviation: dollarFormatter.format(boxOfficeStrdDeviation),
      medianRtScore,
    };
  }, [searchResults]);

const a = [171015687, 92029184, 43037835];
