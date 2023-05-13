type GenreType = {
  name: string;
  id: number
}

type LanguageType = {
  english_name: string;
  name: string;
  iso_639_1: string;

}

export type MovieItemType = {
    [x: string]: any;
    poster_path?: null | string;
    adult?: boolean;
    overview?: string;
    release_date?: string;
    first_air_date? : string;
    genre_ids?: number[];
    name?: string;
    id?: number;
    media_type?: string;
    original_title?: string;
    original_language?: string;
    title?: string;
    backdrop_path?: string | null;
    popularity?: number;
    vote_count?: number;
    video?: boolean;
    vote_average?: number;
    total_pages?: number;
    total_results?: number;
    tagline?: string;
    status?: string;
    genres?: GenreType[];
    spoken_languages?: LanguageType[];
    runtime?: number;
  };

  export type CastType = {
    adult: boolean;
    cast_id: number;
    character: string;
    credit_id: string;
    gender: number;
    known_for_department: string;
    name: string;
    order: number;
    original_name: string;
    popularity: number;
    profile_path: string;
  }