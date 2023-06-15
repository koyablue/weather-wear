export type ReverseGeocodingApiResponse = {
  type?:     string;
  features?: Feature[];
}

export type Feature = {
  type?:       string;
  properties?: Properties;
  geometry?:   Geometry;
  bbox?:       number[];
}

export type Geometry = {
  type?:        string;
  coordinates?: number[];
}

export type Properties = {
  datasource?:    Datasource;
  name?:          string;
  country?:       string;
  country_code?:  string;
  state?:         string;
  city?:          string;
  postcode?:      string;
  district?:      string;
  suburb?:        string;
  street?:        string;
  housenumber?:   string;
  lon?:           number;
  lat?:           number;
  distance?:      number;
  result_type?:   string;
  formatted?:     string;
  address_line1?: string;
  address_line2?: string;
  category?:      string;
  timezone?:      Timezone;
  rank?:          Rank;
  place_id?:      string;
}

export type Datasource = {
  sourcename?:  string;
  attribution?: string;
  license?:     string;
  url?:         string;
}

export type Rank = {
  importance?: number;
  popularity?: number;
}

export type Timezone = {
  name?:               string;
  offset_STD?:         string;
  offset_STD_seconds?: number;
  offset_DST?:         string;
  offset_DST_seconds?: number;
  abbreviation_STD?:   string;
  abbreviation_DST?:   string;
}
