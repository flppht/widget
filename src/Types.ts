// src/Types.ts

export interface ClientData {
  id: string | number;
  property: {
    name: string;
    location: {
      city: string;
      state: string;
    };
    coverVideo: string;
    coverImage: string;
    floorplans: {
      name: string;
      bedsCount?: number;
      bathsCount: number;
      price: {
        min: number;
        max: number;
      };
      size: number;
      sizeUnits: string;
      image: string;
      space360: string;
      video: string;
    }[];
    amenities: {
      name: string;
      coverImage: {
        thumb: string;
        fullImage: string;
      };
      video: string;
    }[];
  };
  ui: {
    position: string;
    colors: {
      background: {
        primary: string;
        secondary: string;
        tertiary: string;
        regular: string;
        warning: string;
      };
      text: {
        primary: string;
        secondary: string;
        heading: string;
        regular: string;
        warning: string;
      };
    };
    videoWidget: {
      isActive: boolean;
      style: string;
      triggerText: string;
      triggerTextHover: string;
      instagram: {
        token: string;
        expiresIn: number;
      };
    };
    chatWidget: {
      isActive: boolean;
      intercomId: string;
    };
  };
}

export interface InstagramAccessToken {
  token?: string;
  expiresIn?: number;
  clientId?: string | number;
}

declare global {
  interface Window {
    Intercom?: (...args: any[]) => void;
    intercomSettings?: IntercomSettings;
    ga: Function;
    dataLayer: any[];
  }
}

export interface IntercomSettings {
  app_id: string;
  hide_default_launcher?: boolean;
  [key: string]: any; // Allows for additional dynamic settings
}

export interface FloorplanType {
  name: string;
  bedsCount?: number;
  bathsCount: number;
  price: {
    min: number;
    max: number;
  };
  size: number;
  sizeUnits: string;
  image: string;
  space360: string;
  video: string;
}
