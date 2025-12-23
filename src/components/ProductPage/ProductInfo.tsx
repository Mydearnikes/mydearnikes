// import React from "react";
// import { ShopifyMoney, SimpleProduct, ProductVariant } from "@/types/shopify";


// interface ProductInfoProps {
//   product: SimpleProduct;
//   selectedVariant?: ProductVariant | null;
// }

// const ProductInfo = ({ product }: ProductInfoProps) => {
//   // format the price
//   const formatPrice = (money: ShopifyMoney) => {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//     }).format(parseFloat(money.amount));
//   };

//   const extractDescription = (description: string) => {
//     // Extract key features from description or use defaults
//     const features = description?.match(
//       /\d+%.*?GSM|Cotton|Premium|Street.*?Ready/gi
//     ) || ["100% Cotton & 250 GSM", "Street Ready Look"];

//     return features.slice(0, 2);
//   };

//   // Helper check for discoutn
//   const hasDiscount =
//     product.compareAtPrice &&
//     parseFloat(product.compareAtPrice.amount) >
//       parseFloat(product.price.amount);
//   return (
//     <>
//       <div className="flex justify-between items-center px-[8px] py-1 mt-0">
//         <div className=" productName  uppercase font-bold   text-md tracking-tight">
//           {product.title}
//         </div>
//         <div className="productPrice tet-sm ">
//           {formatPrice(product.price)}
//           {hasDiscount && (
//             <span className="text-xs text-gray-500 line-through ml-2">
//               {formatPrice(product.compareAtPrice!)}
//             </span>
//           )}
//         </div>
//       </div>
//       <div className="description text-[12px]  px-[8px]  py-1 lg:hidden hidden">
//         {extractDescription(product.description || "").map((feature, index) => (
//           <p key={index}>{feature}</p>
//         ))}

//       </div>
//       <div className="description text-[12px]   px-[8px]   hidden lg:block">
//        {/* {product.description} */}

//       </div>
//     </>
//   );
// };

// export default ProductInfo;

// import React from "react";
// import { ShopifyMoney, SimpleProduct, ProductVariant } from "@/types/shopify";

// interface ProductInfoProps {
//   product: SimpleProduct;
//   selectedVariant?: ProductVariant | null;
// }

// const ProductInfo = ({ product }: ProductInfoProps) => {
//   // format the price
//   const formatPrice = (money: ShopifyMoney) => {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//     }).format(parseFloat(money.amount));
//   };

//   // Helper check for discount
//   const hasDiscount =
//     product.compareAtPrice &&
//     parseFloat(product.compareAtPrice.amount) >
//       parseFloat(product.price.amount);

//   return (
//     <>
//       <div className="flex justify-between items-center px-[8px] py-1 mt-0">
//         <div className="productName uppercase font-bold text-md tracking-tight">
//           {product.title}
//         </div>
//         <div className="productPrice text-sm">
//           {formatPrice(product.price)}
//           {hasDiscount && (
//             <span className="text-xs text-gray-500 line-through ml-2">
//               {formatPrice(product.compareAtPrice!)}
//             </span>
//           )}
//         </div>
//       </div>

//       {/* Mobile description - raw from Shopify */}
//       <div className="description text-[12px] px-[8px] py-1 lg:hidden whitespace-pre-wrap">
//         {product.description}
//       </div>

//       {/* Desktop description - raw from Shopify */}
//       <div className="description text-[12px] px-[8px] hidden lg:block whitespace-pre-wrap">
//         {product.description}
//       </div>
//     </>
//   );
// };

// export default ProductInfo;

import React from "react";
import { ShopifyMoney, SimpleProduct, ProductVariant } from "@/types/shopify";

interface ProductInfoProps {
  product: SimpleProduct;
  selectedVariant?: ProductVariant | null;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  // format the price
  const formatPrice = (money: ShopifyMoney) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(parseFloat(money.amount));
  };

  // Helper check for discount
  const hasDiscount =
    product.compareAtPrice &&
    parseFloat(product.compareAtPrice.amount) >
      parseFloat(product.price.amount);

  return (
    <>
      <div className="flex justify-between items-center px-[8px] py-1 mt-0">
        <div className="productName uppercase font-bold text-md tracking-tight">
          {product.title}
        </div>
        <div className="productPrice text-sm">
          {formatPrice(product.price)}
          {hasDiscount && (
            <span className="text-xs text-gray-500 line-through ml-2">
              {formatPrice(product.compareAtPrice!)}
            </span>
          )}
        </div>
      </div>

      {/* Mobile description - raw from Shopify */}
      <div className="description text-[12px] px-[8px] py-1 lg:hidden">
        {product.descriptionHtml ? (
          <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
        ) : (
          <div className="whitespace-pre-wrap">{product.description}</div>
        )}
      </div>

      {/* Desktop description - raw from Shopify */}
      <div className="description text-[12px] px-[8px] hidden lg:block">
        {product.descriptionHtml ? (
          <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
        ) : (
          <div className="whitespace-pre-wrap">{product.description}</div>
        )}
      </div>
    </>
  );
};

export default ProductInfo;