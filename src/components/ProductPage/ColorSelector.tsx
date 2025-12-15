// "use client";
// import { ChevronDown } from "lucide-react";
// import React from "react";

// import { SimpleProduct } from "@/types/shopify";

// interface ColorSelectorProps {
//   product: SimpleProduct;
//   selectedColor: string;
//   onColorChange: (color: string) => void;
// }

// const ColorSelector = ({
//   product,
//   selectedColor,
//   onColorChange,
// }: ColorSelectorProps) => {
//   // Extract available colors
//   const extractColors = () => {
//     // Fallback to default color if no variants
//     if (!product.variants || product.variants.length === 0) {
//       return ["Default"];
//     }

//     // First, check if any variant actually has a color option
//     const hasColorVariants = product.variants.some(variant =>
//       variant.selectedOptions?.some(option =>
//         option.name.toLowerCase().includes("color") ||
//         option.name.toLowerCase().includes("colour")
//       )
//     );

//     // If no color variants exist, return default
//     if (!hasColorVariants) {
//       return ["Default"];
//     }

//     // Extract actual colors from variants that have color options
//     const colors = product.variants
//       .filter((variant) => variant.availableForSale)
//       .map((variant) => {
//         // Look for colors in selectedOptions
//         const colorOption = variant.selectedOptions?.find((option) =>
//           option.name.toLowerCase().includes("color") ||
//           option.name.toLowerCase().includes("colour")
//         );
//         return colorOption?.value;
//       })
//       .filter((color): color is string => color !== undefined) // Remove undefined values
//       .filter((color, index, arr) => arr.indexOf(color) === index); // Remove duplicates

//     // If no actual colors found after filtering, return default
//     return colors.length > 0 ? colors : ["Default"];
//   };

//   const colors = extractColors();
//   const hasRealColors = colors.length > 1 || colors[0] !== "Default";
//   const isSingleColor = colors.length === 1;

//   return (
//     <div className="mt-4 px-[8px] flex items-center gap-3">
//       <label htmlFor="color-select" className="text-xs">
//         Color
//       </label>
//       <div className="selector relative inline-block">
//         {isSingleColor ? (
//           // Show as plain text if only one color with subtle visual indicator
//           <div className="text-xs border-[0.25px] border-[#e5e5e5] border-opacity-25 w-50 p-[8px] rounded-md bg-gray-100 text-gray-600 cursor-default flex items-center justify-between gap-2">
//             <span>{colors[0]}</span>
//             {/* <span className="text-[10px] text-gray-400 italic">(Only option)</span> */}
//           </div>
//         ) : (
//           <>
//             <select
//               name="colorSelect"
//               id="color-select"
//               value={selectedColor}
//               onChange={(e) => onColorChange(e.target.value)}
//               className="text-xs border-[0.25px] border-[#e5e5e5] border-opacity-25 w-50 p-[8px] focus:outline-0 appearance-none rounded-md relative cursor-pointer hover:border-gray-300 transition-colors"
//               disabled={!hasRealColors}
//             >
//               {hasRealColors ? (
//                 <>
//                   <option value="">Select Color</option>
//                   {colors.map((color, idx) => (
//                     <option key={idx} value={color}>
//                       {color}
//                     </option>
//                   ))}
//                 </>
//               ) : (
//                 <option value="Default">Default</option>
//               )}
//             </select>
//             {/* Dropdown arrow icon */}
//             <ChevronDown
//               className={`absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 ${
//                 !hasRealColors ? 'opacity-50' : ''
//               }`}
//               size={12}
//             />
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ColorSelector;


"use client";
import React from "react";
import { Check } from "lucide-react";
import { SimpleProduct } from "@/types/shopify";

interface ColorSelectorProps {
  product: SimpleProduct;
  selectedColor: string;
  onColorChange: (color: string) => void;
}

const ColorSelector = ({
  product,
  selectedColor,
  onColorChange,
}: ColorSelectorProps) => {
  // Extract available colors
  const extractColors = () => {
    if (!product.variants || product.variants.length === 0) {
      return [];
    }

    const hasColorVariants = product.variants.some((variant) =>
      variant.selectedOptions?.some(
        (option) =>
          option.name.toLowerCase().includes("color") ||
          option.name.toLowerCase().includes("colour")
      )
    );

    if (!hasColorVariants) {
      return [];
    }

    const colors = product.variants
      .filter((variant) => variant.availableForSale)
      .map((variant) => {
        const colorOption = variant.selectedOptions?.find(
          (option) =>
            option.name.toLowerCase().includes("color") ||
            option.name.toLowerCase().includes("colour")
        );
        return colorOption?.value;
      })
      .filter((color): color is string => color !== undefined)
      .filter((color, index, arr) => arr.indexOf(color) === index);

    return colors;
  };

  const colors = extractColors();

  // Don't render anything if no colors exist
  if (colors.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 px-2">
      <label className="text-xs font-medium text-gray-900 block mb-3">
        Color
      </label>

      <div className="flex flex-wrap gap-2">
        {colors.map((color) => {
          const isSelected = selectedColor === color;

          return (
            <button
              key={color}
              onClick={() => onColorChange(color)}
              className={`
                relative px-4 py-2 rounded-full text-sm font-medium
                transition-all duration-200 border-[0.25px]
                ${
                  isSelected
                    ? "border-black bg-black text-white"
                    : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                }
              `}
            >
              <span className="flex items-center gap-2">
                {color}
                {isSelected && <Check size={14} strokeWidth={3} />}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ColorSelector;