import {createApi} from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};

const getListOfCoffeeStorePhotos = async () => {
  const photos = await unsplash.search.getPhotos({
    query: "café",
    perPage: 30,
  });
  const unsplashResults = photos.response.results;
  return unsplashResults.map((result) => result.urls["small"]);
};

export const fetchCoffeeStores = async (
  latLong = "43.653833032607096%2C-79.37896808855945",
  query = "café",
  limit = 6
) => {
  const photos = await getListOfCoffeeStorePhotos();
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
    },
  };

  const response = await fetch(
    getUrlForCoffeeStores(latLong, query, limit),
    options
  );

  const data = await response.json();
  return data.results.map((result, idx) => {
    const neighborhood = result.location.neighborhood;
    return {
      id: result.fsq_id,
      address: result.location.address,
      name: result.name,
      neighbourhood: neighborhood?.length > 0 ? neighborhood[0] : "",
      imgUrl: photos.length > 0 ? photos[idx] : null,
    };
  });
};