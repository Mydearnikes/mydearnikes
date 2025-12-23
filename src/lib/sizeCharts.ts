export const SIZE_CHARTS = {
  oversized: {
    image: "/images/sizechart.webp",
    title: " Tees Size Guide",
  },
  "fitted-tees": {
    image: "/images/fitChart.webp",
    title: "Fitted Tees Size Guide",
  },
  "baby-tees": {
    image: "/images/babyChart.webp",
    title: "Baby Tees Size Guide",
  },
  hoodies: {
    image: "/images/hoodChart.webp",
    title: "Hoodies Size Guide",
  },
  sweatshirts: {
    image: "/images/sweatSize.webp",
    title: "Sweatshirts Size Guide",
  },
  sweatpants: {
    image: "/images/sweatpantSize.webp",
    title: "Sweatpants Size Guide",
  },
  default: {
    image: "/images/fitChart.webp",
    title: "Size Guide",
  },
} as const;

export type ProductCategory = keyof typeof SIZE_CHARTS;

export const getSizeChartByProductType = (
  productType: string
): { image: string; title: string } => {
  if (!productType) return SIZE_CHARTS.default;

  const normalized = productType.toLowerCase();

  if (normalized.includes("oversized")) return SIZE_CHARTS["oversized"];
  if (normalized.includes("fitted") || normalized.includes("regular"))
    return SIZE_CHARTS["fitted-tees"];
  if (normalized.includes("baby")) return SIZE_CHARTS["baby-tees"];
  if (normalized.includes("hoodie")) return SIZE_CHARTS.hoodies;
  if (normalized.includes("sweatshirt")) return SIZE_CHARTS.sweatshirts;
  if (normalized.includes("sweatpant") || normalized.includes("sweatpant"))
    return SIZE_CHARTS.sweatpants;

  return SIZE_CHARTS.default;
};
