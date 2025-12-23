"use client";
import { useState } from "react";
import { SimpleProduct } from "@/types/shopify";

interface ProductAccordionProps {
  product: SimpleProduct;
}

const ProductAccordion = ({ product }: ProductAccordionProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

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
            {product.descriptionHtml ? (
              <div 
                className="text-xs text-gray-500" 
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              />
            ) : (
              <div className="text-xs text-gray-500 whitespace-pre-wrap">
                {product.description || "This premium product offers exceptional quality and style."}
              </div>
            )}
          </div>
        )}
        <div className="border-b-[0.25px] border-[#aeadad] pb-2"></div>
      </div>
    </div>
  );
};

export default ProductAccordion;