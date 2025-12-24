// "use client";

// import React, { useState, useRef } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";
// import type { Swiper as SwiperType } from "swiper";
// import { motion } from "framer-motion";
// import "swiper/css";

// interface HeroSlide {
//   id: number;
//   bgImage: string;
//   productImage: string;
//   productName: string;
//   productPrice: string;
//   productLink: string;
// }

// interface MobileHeroSlide {
//   id: number;
//   bgImage: string;
// }

// const HeroSection = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const swiperRef = useRef<SwiperType | null>(null);

//   const heroSlides: HeroSlide[] = [
//     {
//       id: 1,
//       bgImage: "/images/imageHeroNew1.webp",
//       productImage: "/images/saveOurAnimals.webp",
//       productName: "save our animals",
//       productPrice: "₹1,399",
//       productLink: "/product/unisex-classic-crew-t-shirt-36",
//     },
//     {
//       id: 2,
//       bgImage: "/images/imageHeroNew2.webp",
//       productImage: "/images/overThug.webp",
//       productName: "I hate when GIRLS die",
//       productPrice: "₹999",
//       productLink: "/product/unisex-classic-crew-t-shirt-43",
//     },
//     {
//       id: 3,
//       bgImage: "/images/imageHeroNew3.webp",
//       productImage: "/images/babyThug.webp",
//       productName: "I hate when GIRLS die",
//       productPrice: "₹799",
//       productLink: "/product/baby-tee-7",
//     },
//   ];

//   const mobileHeroSlides: MobileHeroSlide[] = [
//     {
//       id: 1,
//       bgImage: "/images/imageHeroNew1.webp",
//     },
//     {
//       id: 2,
//       bgImage: "/images/imageHeroNew2.webp",
//     },
//     {
//       id: 3,
//       bgImage: "/images/imageHeroNew3.webp",
//     },
//   ];

//   const currentSlide = heroSlides[activeIndex];

//   return (
//     <>
//       {/* MOBILE VERSION */}
//       <div className="lg:hidden relative h-[95vh] pt-15 overflow-hidden">
//         <div className="absolute inset-0 w-full h-full z-10">
//           {/* Preload first slide outside of Swiper */}
//           <div className="absolute inset-0 w-full h-full">
//             <Image
//               src="/images/imageHeroNew1.webp"
//               alt="Hero slide"
//               fill
//               priority={true}
//               fetchPriority="high"
//               quality={75}
//               sizes="100vw"
//               className="object-cover"
//               style={{ zIndex: activeIndex === 0 ? 1 : 0 }}
//             />
//           </div>
//           <Swiper
//             modules={[Autoplay]}
//             spaceBetween={0}
//             slidesPerView={1}
//             autoplay={{ delay: 4000, disableOnInteraction: false }}
//             onSwiper={(swiper) => (swiperRef.current = swiper)}
//             onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
//             className="w-full h-full"
//             allowTouchMove={true}
//           >
//             {mobileHeroSlides.map((slide, index) => (
//               <SwiperSlide key={slide.id}>
//                 <div className="relative h-full w-full">
//                   <Image
//                     src={slide.bgImage}
//                     alt={`Hero slide ${index + 1}`}
//                     fill
//                     priority={index === 0}
//                     fetchPriority={index === 0 ? "high" : "low"}
//                     quality={75}
//                     sizes="100vw"
//                     className="object-cover"
//                   />
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>

//         <div className="absolute inset-0 z-20 flex justify-center items-center pointer-events-none">
//           <div className="buttonBox flex flex-col h-[80vh] justify-end items-center pt-4">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//               className="subText text-white border-[#ffffff] uppercase font-normal text-sm border-[0.5px] px-2 py-1 rounded-full bg-black/20 backdrop-blur-sm pointer-events-none hidden"
//             >
//               Graphics for the chronically online
//             </motion.div>

//             <Link href="/category/all-products" className="pointer-events-auto">
//               <motion.button
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: 0.4 }}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="font-bebas text-3xl border-1 border-white px-3 pb-2 pt-3 text-white rounded-lg tracking-[0.5px] leading-none flex justify-center items-center hover:bg-black hover:text-white hover:border-0 bg-black/20 backdrop-blur-sm"
//               >
//                 Shop Now
//               </motion.button>
//             </Link>
//           </div>
//         </div>

//         <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-30 pointer-events-auto">
//           {mobileHeroSlides.map((slide, index) => (
//             <motion.button
//               key={slide.id}
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ delay: 0.6 + index * 0.1 }}
//               onClick={() => swiperRef.current?.slideTo(index)}
//               className={`h-2 rounded-full transition-all duration-300 ${
//                 index === activeIndex
//                   ? "bg-white w-8"
//                   : "bg-white/50 w-2 hover:bg-white/70"
//               }`}
//               aria-label={`Go to slide ${index + 1}`}
//             />
//           ))}
//         </div>
//       </div>

//       {/* DESKTOP VERSION */}
//       <div className="hidden lg:flex gap-[8px] pt-15">
//         {/* Left Side - Main Hero Image - NO FRAMER MOTION */}
//         <div className="w-[60vw] h-[91vh] relative mt-4 mx-[8px] animate-fadeIn">
//           <div className="w-full h-full relative">
//             {/* Preload first slide outside of Swiper */}
//             <div className="absolute inset-0 w-full h-full border-[0.125px] border-[#000000]">
//               <Image
//                 src="/images/imageHeroNew1.webp"
//                 alt="Hero background"
//                 fill
//                 priority={true}
//                 fetchPriority="high"
//                 quality={75}
//                 sizes="60vw"
//                 className="object-cover"
//                 style={{ zIndex: activeIndex === 0 ? 1 : 0 }}
//               />
//             </div>
//             <Swiper
//               modules={[Autoplay]}
//               spaceBetween={0}
//               slidesPerView={1}
//               loop={true}
//               autoplay={{ delay: 4000, disableOnInteraction: false }}
//               onSwiper={(swiper) => (swiperRef.current = swiper)}
//               onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
//               className="w-full h-full"
//               allowTouchMove={false}
//             >
//               {heroSlides.map((slide, index) => (
//                 <SwiperSlide key={slide.id}>
//                   <div className="relative w-full h-full border-[0.125px] border-[#000000]">
//                     <Image
//                       src={slide.bgImage}
//                       alt={`Hero background ${index + 1}`}
//                       fill
//                       priority={index === 0}
//                       fetchPriority={index === 0 ? "high" : "low"}
//                       quality={75}
//                       sizes="60vw"
//                       className="object-cover"
//                     />
//                   </div>
//                 </SwiperSlide>
//               ))}
//             </Swiper>

//             <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
//               {heroSlides.map((slide, index) => (
//                 <button
//                   key={slide.id}
//                   onClick={() => swiperRef.current?.slideTo(index)}
//                   className={`h-2 rounded-full transition-all duration-300 ${
//                     index === activeIndex
//                       ? "bg-black w-8"
//                       : "bg-gray-400 w-2 hover:bg-gray-600"
//                   }`}
//                   style={{
//                     animation: `scaleIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) ${0.8 + index * 0.1}s both`
//                   }}
//                   aria-label={`Go to slide ${index + 1}`}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Right Side - Product Preview + Content - NO FRAMER MOTION */}
//         <div className="w-[40vw] h-[94vh] px-[8px] mt-4 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
//           <Link href={currentSlide.productLink}>
//             <div className="h-[65vh] border-[0.125px] border-[#000000] relative overflow-hidden cursor-pointer group">
//               <div className="relative w-full h-full">
//                 <Image
//                   src={currentSlide.productImage}
//                   alt={currentSlide.productName}
//                   fill
//                   quality={75}
//                   sizes="40vw"
//                   fetchPriority="high"
//                   className="object-cover transition-transform duration-500 group-hover:scale-105"
//                 />
//               </div>

//               <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t-[0.125px] border-[#000000] px-[8px] py-1 flex justify-between items-center">
//                 <div className="font-normal text-black text-base uppercase">
//                   {currentSlide.productName}
//                 </div>
//                 <div className="text-sm font-normal">
//                   {currentSlide.productPrice}
//                 </div>
//               </div>
//             </div>
//           </Link>

//           <div className="h-[27vh] flex flex-col justify-end">
//             <div className="headingAndCta flex justify-between items-end">
//               <div 
//                 className="heading font-bebas text-[98px] leading-20 mt-2"
//                 style={{
//                   animation: 'fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s both'
//                 }}
//               >
//                 <p>NOT FOR</p>
//                 <p>EVERYONE</p>
//               </div>
//               <div className="cta mb-2">
//                 <Link href="/category/all-products">
//                   <button
//                     className="font-bebas text-3xl border-1 border-black px-3 pb-2 pt-3 text-black rounded-lg tracking-[0.5px] leading-none flex justify-center items-center hover:bg-black hover:text-white hover:border-0 transition-all duration-300 hover:scale-105 active:scale-95"
//                     style={{
//                       animation: 'fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s both'
//                     }}
//                   >
//                     Shop Now
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default HeroSection;

"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { motion } from "framer-motion";
import "swiper/css";

interface HeroSlide {
  id: number;
  bgImage: string;
  productImage: string;
  productName: string;
  productPrice: string;
  productLink: string;
}

interface MobileHeroSlide {
  id: number;
  bgImage: string;
}

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const heroSlides: HeroSlide[] = [
    {
      id: 1,
      bgImage: "/images/imageHeroNew1.webp",
      productImage: "/images/saveOurAnimals.webp",
      productName: "save our animals",
      productPrice: "₹1,299",
      productLink: "/product/unisex-oversized-classic-t-shirt-60",
    },
    {
      id: 2,
      bgImage: "/images/imageHeroNew2.webp",
      productImage: "/images/overThug.webp",
      productName: "I hate when GIRLS die",
      productPrice: "₹1299",
      productLink: "/product/unisex-oversized-classic-t-shirt-10",
    },
    {
      id: 3,
      bgImage: "/images/imageHeroNew3.webp",
      productImage: "/images/babyThug.webp",
      productName: "I hate when GIRLS die",
      productPrice: "₹799",
      productLink: "/product/baby-tee-7",
    },
  ];

  const mobileHeroSlides: MobileHeroSlide[] = [
    {
      id: 1,
      bgImage: "/images/imageHeroNew1.webp",
    },
    {
      id: 2,
      bgImage: "/images/imageHeroNew2.webp",
    },
    {
      id: 3,
      bgImage: "/images/imageHeroNew3.webp",
    },
  ];

  const currentSlide = heroSlides[activeIndex];

  return (
    <>
      {/* MOBILE VERSION */}
      <div className="lg:hidden relative h-[95vh] pt-15 overflow-hidden">
        <div className="absolute inset-0 w-full h-full z-10">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            className="w-full h-full"
            allowTouchMove={true}
          >
            {mobileHeroSlides.map((slide, index) => (
              <SwiperSlide key={slide.id}>
                <div className="relative h-full w-full">
                  <Image
                    src={slide.bgImage}
                    alt={`Hero slide ${index + 1}`}
                    fill
                    priority={index === 0}
                    fetchPriority={index === 0 ? "high" : "low"}
                    quality={60}
                    sizes="100vw"
                    className="object-cover"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="absolute inset-0 z-30 flex justify-center items-center pointer-events-none">
          <div className="buttonBox flex flex-col h-[80vh] justify-end items-center pt-4">
            <Link href="/category/all-products" className="pointer-events-auto">
              <button
                className="font-bebas text-3xl border-1 border-white px-3 pb-2 pt-3 text-white rounded-lg tracking-[0.5px] leading-none flex justify-center items-center hover:bg-black hover:text-white hover:border-0 bg-black/20 backdrop-blur-sm transition-all duration-300"
                style={{
                  animation: 'fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s both'
                }}
              >
                Shop Now
              </button>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-40 pointer-events-auto">
          {mobileHeroSlides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => swiperRef.current?.slideTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "bg-white w-8"
                  : "bg-white/50 w-2 hover:bg-white/70"
              }`}
              style={{
                animation: `scaleIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) ${0.6 + index * 0.1}s both`
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* DESKTOP VERSION */}
      <div className="hidden lg:flex gap-[8px] pt-15">
        {/* Left Side - Main Hero Image - NO FRAMER MOTION */}
        <div className="w-[60vw] h-[91vh] relative mt-4 mx-[8px] animate-fadeIn">
          <div className="w-full h-full relative">
            {/* Preload first slide outside of Swiper */}
            <div className="absolute inset-0 w-full h-full border-[0.125px] border-[#000000]">
              <Image
                src="/images/imageHeroNew1.webp"
                alt="Hero background"
                fill
                priority={true}
                fetchPriority="high"
                quality={75}
                sizes="60vw"
                className="object-cover"
                style={{ zIndex: activeIndex === 0 ? 1 : 0 }}
              />
            </div>
            <Swiper
              modules={[Autoplay]}
              spaceBetween={0}
              slidesPerView={1}
              loop={true}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              className="w-full h-full"
              allowTouchMove={false}
            >
              {heroSlides.map((slide, index) => (
                <SwiperSlide key={slide.id}>
                  <div className="relative w-full h-full border-[0.125px] border-[#000000]">
                    <Image
                      src={slide.bgImage}
                      alt={`Hero background ${index + 1}`}
                      fill
                      priority={index === 0}
                      fetchPriority={index === 0 ? "high" : "low"}
                      quality={75}
                      sizes="60vw"
                      className="object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => swiperRef.current?.slideTo(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? "bg-black w-8"
                      : "bg-gray-400 w-2 hover:bg-gray-600"
                  }`}
                  style={{
                    animation: `scaleIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) ${0.8 + index * 0.1}s both`
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Product Preview + Content - NO FRAMER MOTION */}
        <div className="w-[40vw] h-[94vh] px-[8px] mt-4 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
          <Link href={currentSlide.productLink}>
            <div className="h-[65vh] border-[0.125px] border-[#000000] relative overflow-hidden cursor-pointer group">
              <div className="relative w-full h-full">
                <Image
                  src={currentSlide.productImage}
                  alt={currentSlide.productName}
                  fill
                  quality={75}
                  sizes="40vw"
                  fetchPriority="high"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t-[0.125px] border-[#000000] px-[8px] py-1 flex justify-between items-center">
                <div className="font-normal text-black text-base uppercase">
                  {currentSlide.productName}
                </div>
                <div className="text-sm font-normal">
                  {currentSlide.productPrice}
                </div>
              </div>
            </div>
          </Link>

          <div className="h-[27vh] flex flex-col justify-end">
            <div className="headingAndCta flex justify-between items-end">
              <div 
                className="heading font-bebas text-[98px] leading-20 mt-2"
                style={{
                  animation: 'fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s both'
                }}
              >
                <p>NOT FOR</p>
                <p>EVERYONE</p>
              </div>
              <div className="cta mb-2">
                <Link href="/category/all-products">
                  <button
                    className="font-bebas text-3xl border-1 border-black px-3 pb-2 pt-3 text-black rounded-lg tracking-[0.5px] leading-none flex justify-center items-center hover:bg-black hover:text-white hover:border-0 transition-all duration-300 hover:scale-105 active:scale-95"
                    style={{
                      animation: 'fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s both'
                    }}
                  >
                    Shop Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;