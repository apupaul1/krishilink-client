import { bangladeshLocations } from "../data/bangladeshLocations";

export const getDistrictOptions = () => {
  return bangladeshLocations.map((item) => ({
    label: item.district,
    value: item.district,
  }));
};

export const getAreaOptions = (district?: string) => {
  if (!district) {
    return [];
  }

  const selectedDistrict = bangladeshLocations.find(
    (item) => item.district === district,
  );

  return (
    selectedDistrict?.areas.map((area) => ({
      label: area,
      value: area,
    })) ?? []
  );
};

export const getDivisionByDistrict = (
  district: string,
) => {
  return bangladeshLocations.find(
    (item) => item.district === district,
  )?.division;
};