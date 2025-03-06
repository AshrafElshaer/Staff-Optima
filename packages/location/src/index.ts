// import { headers } from "next/headers";
import countries from "./countries.json";
import flags from "./country-flag";
import { EU_COUNTRY_CODES } from "./eu-countries";

import continents from "./continents.json";
import timezones from "./timezones.json";

const countriesMap = new Map(countries.map((c) => [c.name, c]));
export { timezones, countries, continents, countriesMap };

// export async function getCountryCode(): Promise<string> {
//   return (await headers()).get("x-vercel-ip-country") ?? "SE";
// }

// export async function getTimezone() {
//   return (await headers()).get("x-vercel-ip-timezone") || "Europe/Berlin";
// }

// export function getTimezones() {
//   return timezones;
// }

// export async function getCountryInfo() {
//   const country = await getCountryCode();

//   const countryInfo = countries.find((x) => x.cca2 === country);

//   const currencyCode = countryInfo?.currencies
//     ? (Object.keys(
//         countryInfo.currencies,
//       )[0] as keyof typeof countryInfo.currencies)
//     : undefined;
//   const currency =
//     currencyCode && countryInfo?.currencies
//       ? countryInfo.currencies[currencyCode]
//       : null;
//   const languages = countryInfo?.languages
//     ? Object.values(countryInfo.languages).join(", ")
//     : undefined;

//   return {
//     currencyCode,
//     currency,
//     languages,
//   };
// }

// export async function isEU() {
//   const countryCode = (await headers()).get("x-vercel-ip-country");

//   if (countryCode && EU_COUNTRY_CODES.includes(countryCode)) {
//     return true;
//   }

//   return false;
// }

// export async function getCountry() {
//   const country = await getCountryCode();

//   // Type assertion since we know flags will have an entry for valid country codes
//   return flags[country as keyof typeof flags];
// }
