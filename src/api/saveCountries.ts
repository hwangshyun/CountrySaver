import { supabase } from "./supabaseClient";
import { Country } from "../types/country";

export const saveSelectedCountries = async (newCountries: Country[]) => {
  try {
    // 기존에 저장된 나라 불러오기
    const { data: existingCountries, error: fetchError } = await supabase
      .from("selected_countries")
      .select("name, population, capital, flags, languages");

    if (fetchError) throw fetchError;

    //타입설정
    const existingCountriesTyped = existingCountries as Country[];

    // 새로 추가할 나라에서 중복 제거
    const uniqueNewCountries = newCountries.filter((newCountry:Country) => {
      return !existingCountriesTyped.some(
        (existingCountry) =>
          existingCountry.name.common === newCountry.name.common
      );
    });

    if (uniqueNewCountries.length === 0) {
      return;
    }

    // 중복되지 않는 나라만 저장
    const { data, error } = await supabase.from("selected_countries").insert(
      uniqueNewCountries.map((country) => ({
        name: country.name,
        population: country.population,
        capital: country.capital,
        flags: country.flags,
        languages: country.languages,
      }))
    );

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error saving countries:", error);
  }
};
