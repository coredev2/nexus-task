import { PLACEHOLDER_IMAGE_URL } from "../constants/config";

export const getMoviePosterUrl = (posterUrl: string | undefined): string => {
  return posterUrl && posterUrl !== "N/A" ? posterUrl : PLACEHOLDER_IMAGE_URL;
};

export const handleImageError = (
  event: React.SyntheticEvent<HTMLImageElement>
): void => {
  const target = event.target as HTMLImageElement;
  target.onerror = null; // Prevent infinite loop
  target.src = PLACEHOLDER_IMAGE_URL;
};
