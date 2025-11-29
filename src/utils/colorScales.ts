// Utility functions for color scaling
import { scaleLinear } from 'd3-scale';

// Create a color scale for duty percentages
export const createDutyColorScale = (maxDuty: number = 25) => {
  return scaleLinear<string>()
    .domain([0, maxDuty / 4, maxDuty / 2, maxDuty])
    .range(['#E5F5E0', '#A1D99B', '#31A354', '#006D2C']);
};

// Create a color scale for trade values
export const createTradeValueColorScale = (maxValue: number) => {
  return scaleLinear<string>()
    .domain([0, maxValue / 8, maxValue / 4, maxValue / 2, maxValue])
    .range(['#EEEEEE', '#BDD7E7', '#6BAED6', '#3182BD', '#08519C']);
};