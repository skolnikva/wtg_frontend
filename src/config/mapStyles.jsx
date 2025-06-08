export const staticMapConfig = {
  baseUrl: 'https://maps.geoapify.com/v1/staticmap',
  params: {
    style: 'osm-carto',
    width: 600,
    height: 600,
    zoom: 15,
    markerColor: 'red',
    apiKey: 'ed61ad2d2c65490bac938d7be15f177a'
  }
};

export const mapThemes = {
  light: {
    style: 'osm-carto',
    markerColor: 'red'
  },
  dark: {
    style: 'dark-matter',
    markerColor: 'blue'
  }
};