import API_CONST from "../constants";
import config from "../../../config";
import { GetSearchResultsType } from "./GetSearchResultsType";

const parseUserInput = (userInput: string) => userInput.replace(" ", "+");

export default (userInput: string): Promise<GetSearchResultsType> => {
  const parsedUserInput = parseUserInput(userInput);
  return fetch(
    `${API_CONST.OMDB_DOMAIN}?apikey=${config.API_KEY}&t=${parsedUserInput}`
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    })
    .then((data) => {
      return data as GetSearchResultsType;
    })
    .catch((error) => error);
};
