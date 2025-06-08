import { staticMapConfig, mapThemes } from '@config/mapStyles';

export const buildStaticMapUrl = (location, theme = 'light') => {
  const { baseUrl, params } = staticMapConfig;
  const queryParams = new URLSearchParams({
    ...params,
    style: mapThemes[theme].style,
    center: `lonlat:${location.longitude},${location.latitude}`,
    marker: `lonlat:${location.longitude},${location.latitude};color:${mapThemes[theme].markerColor}`
  });

  return `${baseUrl}?${queryParams.toString()}`;
};