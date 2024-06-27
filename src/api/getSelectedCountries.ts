import { supabase } from './supabaseClient';
import { Country } from '../types/country';

export const getSelectedCountries = async (): Promise<Country[]> => {
  try {
    const { data, error } = await supabase
      .from('selected_countries')
      .select('name, population, capital, flags, languages');

    if (error) throw error;

    return data as Country[];
  } catch (error) {
    console.error('수파베이스 나라불러오기실패', error);
    return [];
  }
};
