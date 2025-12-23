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
    </>
  );
};

export default ProductInfo;