

"use client";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ShopByCategory = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const categories = [
    {
      href: "/category/lighters",
      image: "/images/lighters.webp",
      title: "Lighters"
    },
    // {
    //   href: "/category/tumbler-bottles",
    //   image: "/images/tumbler.webp",
    //   title: "Tumblers"
    // },
    {
      href: "/category/oversized-unisex-tees",
      image: "/images/over.webp",
      title: "Oversized Tees"
    },
    {
      href: "/category/regular-fits",
      image: "/images/fitted.webp",
      title: "Fitted Tees"
    },
    {
      href: "/category/baby-tees",
      image: "/images/babyTeeco.webp",
      title: "Baby Tees"
    },
    {
      href: "/category/hoodies",
      image: "/images/hoodieCover.webp",
      title: "Hoodies"
    },
    {
      href: "/category/all-products",
      image: "/images/allCover.webp",
      title: "All Products"
    }
  ];

  // Check scroll position to show/hide buttons
  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      return () => container.removeEventListener('scroll', checkScroll);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 500; // Adjust this value for scroll distance
      const newScrollLeft = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="heading px-[8px] py-4 lg:py-8 border-t-[0.5px] border-b-[0.25px] border-[#aeadad]"
      >
        <h1 className="uppercase text-2xl lg:text-4xl font-medium">Explore Mydearnikes</h1>
      </motion.div>

      {/* Categories with scroll buttons */}
      <div className="relative">
        {/* Left scroll button - Desktop only */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/30 backdrop-blur-sm hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 border border-gray-900 items-center justify-center group"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800 group-hover:text-black" />
          </button>
        )}

        {/* Right scroll button - Desktop only */}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/30 backdrop-blur-sm hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 border border-gray-900 items-center justify-center group"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-gray-800 group-hover:text-black" />
          </button>
        )}

        <div 
          ref={(node) => {
            ref(node);
            scrollContainerRef.current = node;
          }}
          className="categoriesSwiper overflow-x-auto w-full scrollbar-hide"
          style={{ 
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          <div className="flex gap-[1px] min-w-max">
            {categories.map((category, index) => (
              <motion.div
                key={category.href}
                initial={{ opacity: 0, x: 50 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{
                  duration: 0.6,
                  delay: inView ? index * 0.1 : 0,
                  ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]
                }}
              >
                <Link 
                  href={category.href}
                  className="category bg-gray-100 w-[300px] lg:w-[500px] h-[450px] lg:h-[700px] bg-cover bg-center flex justify-center items-end group relative overflow-hidden"
                  style={{ backgroundImage: `url('${category.image}')` }}
                >
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  <div className="shopText font-inter text-sm tracking-tight text-white mb-6 relative z-10 group-hover:scale-110 transition-transform duration-300 border-[0.125px] border-[#aeadad] bg-black  px-3 py-2 rounded-full">
                    {category.title}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopByCategory;