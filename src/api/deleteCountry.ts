import { supabase } from "./supabaseClient";
import { Country } from "../types/country";

export const deleteCountry = async (country: Country) => {
  try {
    const { data, error } = await supabase
      .from("selected_countries")
      .delete()
      .eq("name->>common", country.name.common);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error deleting country:", error);
  }
};
