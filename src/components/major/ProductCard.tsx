
"use client";
import Image from "next/image";
import Link from "next/link";
import { SimpleProduct } from "@/types/shopify";
import { trackProductClick } from "@/lib/analytics";

interface ProductCardProps {
  product: SimpleProduct;
  listName?:string;
  position?:number;
}

export default function ProductCard({ product, listName="Product Grid", position= 0 }: ProductCardProps) {
  // Get main product image
  const mainImage = product.featuredImage || product.images[0];

  // Format the price
  const formatPrice = (amount: string, currencyCode: string) => {
    const price = parseFloat(amount);
    if (currencyCode === "INR") {
      return `₹${price.toLocaleString("en-IN")}`;
    }
    return `$${price.toLocaleString()}`;
  };

  const displayPrice = formatPrice(
    product.price.amount,
    product.price.currencyCode
  );

   const handleClick = () => {
    trackProductClick(product, listName, position);
  };

  return (
    <Link
      href={`/product/${product.handle}`}
      onClick={handleClick}
      className="border-b-[0.25px] border-r-[0.25px] border-gray-400 flex flex-col group relative"
    >
      <div className="relative aspect-square bg-gray-100 overflow-hidden group-hover:bg-gray-200 transition-colors duration-200">
        {mainImage ? (
          <Image
            src={mainImage.url}
            alt={mainImage.altText || product.title}
            width={500}
            height={500}
            sizes="(max-width: 768px) 50vw, 33vw"
            quality={90}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            priority={Number(product.id) <= 4}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center absolute inset-0">
            <span className="text-gray-400 text-sm">No Image</span>
          </div>
        )}
      </div>
      <div className="px-2 bg-white py-1 flex border-t-[0.5px] border-gray-200 justify-between items-center gap-6 text-sm">
        <h3 className="font-inter text-xs  font-normal truncate uppercase">{product.title}</h3>
        <p className="font-inter text-xs font-normal tracking-tight">
          {displayPrice}
        </p>
      </div>
    </Link>
  );
}