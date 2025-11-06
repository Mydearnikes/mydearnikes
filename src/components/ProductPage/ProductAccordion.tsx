
// // "use client";
// // import { useState } from "react";
// // import { SimpleProduct } from "@/types/shopify";

// // interface ProductAccordionProps {
// //   product: SimpleProduct;
// // }

// // const ProductAccordion = ({ product }: ProductAccordionProps) => {
// //   const [openIndex, setOpenIndex] = useState<number | null>(null);

// //   const data = [
// //     {
// //       title: "Overview",
// //       content:
// //         product.description ||
// //         "This premium product offers exceptional quality and style.",
// //     },
// //     {
// //       title: "Fit",
// //       content:
// //         "Regular fit with comfortable sizing. Check our size guide for the perfect fit.",
// //     },
// //     {
// //       title: "Material",
// //       content: "Made from high-quality materials for durability and comfort.",
// //     },
// //     {
// //       title: "Care",
// //       content:
// //         "Machine wash cold with similar colors. Tumble dry low. Do not bleach.",
// //     },
// //   ];

// //   return (
// //     <div className="mt-7 focus:outline-none">
// //       {data.map((item, idx) => (
// //         <div
// //           key={idx}
// //           className="py-1 px-[8px]"
// //         >
// //           <button
// //             onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
// //             className="w-full flex justify-start items-center border-t-[0.25px] border-[#aeadad] pt-2 text-lg font-semibold"
// //           >
// //             <span>{item.title}</span>
// //             <span className="ml-2">{openIndex === idx ? "-" : "+"}</span>
// //           </button>
// //           {openIndex === idx && (
// //             <div>
// //               <p className="text-xs text-gray-500 pb-1 pt-[3px]">
// //                 {item.content}
// //               </p>
// //             </div>
// //           )}
// //           {item.title === "Care" && (
// //             <div className="border-b-[0.25px] border-[#aeadad] pb-2 "></div>
// //           )}
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// // export default ProductAccordion;

// "use client";
// import { useState } from "react";
// import { SimpleProduct } from "@/types/shopify";

// interface ProductAccordionProps {
//   product: SimpleProduct;
// }

// const ProductAccordion = ({ product }: ProductAccordionProps) => {
//   const [isOpen, setIsOpen] = useState<boolean>(true);

//   return (
//     <div className="mt-7  mb-3 focus:outline-none">
//       <div className="py-1 px-[8px]">
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="w-full flex justify-start items-center border-t-[0.25px] border-[#aeadad] pt-2 text-lg font-semibold"
//         >
//           <span>Overview</span>
//           <span className="ml-2">{isOpen ? "-" : "+"}</span>
//         </button>
//         {isOpen && (
//           <div>
//             <p className="text-xs text-gray-500 pb-1 pt-[3px]">
//               {product.description ||
//                 "This premium product offers exceptional quality and style."}
//             </p>
//           </div>
//         )}
//         <div className="border-b-[0.25px] border-[#aeadad] pb-2"></div>
//       </div>
//     </div>
//   );
// };

// export default ProductAccordion;

"use client";
import { useState } from "react";
import { SimpleProduct } from "@/types/shopify";

interface ProductAccordionProps {
  product: SimpleProduct;
}

const ProductAccordion = ({ product }: ProductAccordionProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  // Helper function to convert description to bullet points
  const formatDescriptionToBullets = (description: string): string[] => {
    if (!description) return ["This premium product offers exceptional quality and style."];

    // Method 1: Split by newlines if description has line breaks
    if (description.includes('\n')) {
      return description
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);
    }

    // Method 2: Split by periods (sentences) if it's a paragraph
    if (description.includes('. ')) {
      return description
        .split('. ')
        .map(sentence => sentence.trim())
        .filter(sentence => sentence.length > 0)
        .map(sentence => sentence.endsWith('.') ? sentence : `${sentence}.`);
    }

    // Method 3: Split by common delimiters
    if (description.includes('•') || description.includes('-') || description.includes('*')) {
      return description
        .split(/[•\-*]/)
        .map(item => item.trim())
        .filter(item => item.length > 0);
    }

    // Fallback: Return as single item
    return [description];
  };

  const bulletPoints = formatDescriptionToBullets(product.description || "");

  return (
    <div className="mt-7 mb-3 focus:outline-none">
      <div className="py-1 px-[8px]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex justify-start items-center border-t-[0.25px] border-[#aeadad] pt-2 text-lg font-semibold"
        >
          <span>Overview</span>
          <span className="ml-2">{isOpen ? "-" : "+"}</span>
        </button>
        {isOpen && (
          <div className="pt-[3px] pb-1">
            <ul className="text-xs text-gray-500 space-y-1 list-disc pl-5">
              {bulletPoints.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="border-b-[0.25px] border-[#aeadad] pb-2"></div>
      </div>
    </div>
  );
};

export default ProductAccordion;