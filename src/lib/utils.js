import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import { countries, genres } from "./data";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function truncate(str, max = 150) {
  return str.length > max ? str.slice(0, max) + "..." : str;
}

export function createQueryString(params, key) {
  const searchParams = new URLSearchParams();
  const reverseArr = Array.from(genres, ([k, v]) => [v, k]);
  const reverseGenre = new Map(reverseArr);

  params.year && searchParams.append('primary_release_year', params.year);
  params.country && searchParams.append('with_origin_country', countries.get(params.country));
  params.genre && searchParams.append('with_genres', reverseGenre.get(params.genre));
  params.rating && searchParams.append('vote_average.gte', params.rating);
  key && searchParams.append('api_key', key);

  return searchParams.toString();
}

export function convertDate(date) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  const localDate = new Date(date).toLocaleDateString('en-US', options);
  return localDate;
}
