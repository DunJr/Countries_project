export interface DateObject {
  iso: string;
  datetime: {
    year: number;
    month: number;
    day: number;
  };
}

export interface Country {
  id: string;
  name: string;
}

export interface Holiday {
  name: string;
  description: string;
  country: {
    id: string;
    name: string;
  };
  date: {
    iso: string;
    datetime: {
      year: number;
      month: number;
      day: number;
      hour?: undefined;
      minute?: undefined;
      second?: undefined;
    };
    timezone?: undefined;
  };
  // Adjust the type of states here
  states: {
    id: number;
    abbrev: string;
    name: string;
    exception: string | null;
    iso: string;
  }[];
}

export interface ApiResponse {
  meta: {
    code: number;
  };
  response: {
    holidays: Holiday[];
  };
}
