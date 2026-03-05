// export const SIZE_CHARTS = {
//   oversized: {
//     image: "/images/sizechart.webp",
//     title: " Tees Size Guide",
//   },
//   "fitted-tees": {
//     image: "/images/fitChart.webp",
//     title: "Fitted Tees Size Guide",
//   },
//   "baby-tees": {
//     image: "/images/babyChart.webp",
//     title: "Baby Tees Size Guide",
//   },
//   hoodies: {
//     image: "/images/hoodChart.webp",
//     title: "Hoodies Size Guide",
//   },
//   sweatshirts: {
//     image: "/images/sweatSize.webp",
//     title: "Sweatshirts Size Guide",
//   },
//   sweatpants: {
//     image: "/images/sweatpantSize.webp",
//     title: "Sweatpants Size Guide",
//   },
//   default: {
//     image: "/images/fitChart.webp",
//     title: "Size Guide",
//   },
// } as const;

// export type ProductCategory = keyof typeof SIZE_CHARTS;

// export const getSizeChartByProductType = (
//   productType: string
// ): { image: string; title: string } => {
//   if (!productType) return SIZE_CHARTS.default;

//   const normalized = productType.toLowerCase();

//   if (normalized.includes("oversized")) return SIZE_CHARTS["oversized"];
//   if (normalized.includes("fitted") || normalized.includes("regular"))
//     return SIZE_CHARTS["fitted-tees"];
//   if (normalized.includes("baby")) return SIZE_CHARTS["baby-tees"];
//   if (normalized.includes("hoodie")) return SIZE_CHARTS.hoodies;
//   if (normalized.includes("sweatshirt")) return SIZE_CHARTS.sweatshirts;
//   if (normalized.includes("sweatpant") || normalized.includes("sweatpant"))
//     return SIZE_CHARTS.sweatpants;

//   return SIZE_CHARTS.default;
// };

export const SIZE_CHARTS = {
  oversized: {
    image: "/images/newOverChart.webp",
    title: "Tees Size Guide",
  },
  boxyFit: {
    image: "/images/boxyFitChart.webp",
    title: "Boxy Tees Size Guide",
  },

  "fitted-tees": {
    image: "/images/fitChart.webp",
    title: "Fitted Tees Size Guide",
  },
  "baby-tees": {
    image: "/images/newBabyChart.webp",
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
  terry: {
    image: "/images/terryChart.webp",
    title: "Terry Size Guide",
  },
  "full-sleeve": {
    image: "/images/fullSleeveChart.webp",
    title: "Full Sleeve Size Guide",
  },
  "straight-joggers": {
    image: "/images/straightJoggersChart.webp",
    title: "Straight Joggers Size Guide",
  },
  default: {
    image: "/images/terryChart.webp",
    title: "Size Guide",
  },
} as const;

export type ProductCategory = keyof typeof SIZE_CHARTS;

// export const getSizeChartByProductType = (
//   productType: string,
// ): { image: string; title: string } => {
//   if (!productType) {
//     console.log("⚠️ productType is empty/undefined");
//     return SIZE_CHARTS.default;
//   }
//   if (!productType) return SIZE_CHARTS.default;

//   const normalized = productType.toLowerCase();
//   console.log("📦 Raw productType:", JSON.stringify(productType));
//   console.log("🔍 Normalized:", JSON.stringify(normalized));

//   if (normalized.includes("oversized")) return SIZE_CHARTS["oversized"];
//   if (normalized.includes("fitted") || normalized.includes("regular"))
//     return SIZE_CHARTS["fitted-tees"];
//   if (normalized.includes("baby")) return SIZE_CHARTS["cropped-baby-tees"];
//   if (normalized.includes("hoodie")) return SIZE_CHARTS.hoodies;
//   if (normalized.includes("sweatshirt")) return SIZE_CHARTS.sweatshirts;
//   if (normalized.includes("boxy")) return SIZE_CHARTS.boxyFit;
//   if (normalized.includes("sweatpant")) return SIZE_CHARTS.sweatpants;
//   if (normalized.includes("terry")) return SIZE_CHARTS.terry;
//   if (
//     normalized.includes("fullsleeve") ||
//     normalized.includes("full sleeve") ||
//     normalized.includes("full-sleeve")
//   )
//     return SIZE_CHARTS["full-sleeve"];
//   if (
//     normalized.includes("straight jogger") ||
//     normalized.includes("straightjogger") ||
//     normalized.includes("straight-jogger")
//   )
//     return SIZE_CHARTS["straight-joggers"];

//   return SIZE_CHARTS.default;
// };
export const getSizeChartByProductType = (
  productType: string,
): { image: string; title: string } => {
  if (!productType) return SIZE_CHARTS.default;

  const normalized = productType.toLowerCase().trim();

  if (normalized.includes("oversized")) return SIZE_CHARTS["oversized"];
  if (normalized.includes("croppedbaby") || normalized.includes("cropped baby"))
    return SIZE_CHARTS["baby-tees"];
  if (normalized.includes("baby")) return SIZE_CHARTS["baby-tees"];
  if (normalized.includes("terry")) return SIZE_CHARTS.terry;
  if (
    normalized.includes("fullsleeve") ||
    normalized.includes("full sleeve") ||
    normalized.includes("full-sleeve")
  )
    return SIZE_CHARTS["full-sleeve"];
  if (
    normalized.includes("straightjogger") ||
    normalized.includes("straight jogger") ||
    normalized.includes("straight-jogger")
  )
    return SIZE_CHARTS["straight-joggers"];
  if (normalized.includes("fitted") || normalized.includes("regular"))
    return SIZE_CHARTS["fitted-tees"];
  if (normalized.includes("boxy")) return SIZE_CHARTS.boxyFit;
  if (normalized.includes("hoodie")) return SIZE_CHARTS.hoodies;
  if (normalized.includes("sweatshirt")) return SIZE_CHARTS.sweatshirts;
  if (normalized.includes("sweatpant")) return SIZE_CHARTS.sweatpants;

  return SIZE_CHARTS.default;
};
