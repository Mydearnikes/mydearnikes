

"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { SimpleProduct } from "@/types/shopify";
import { X } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ImageCarouselProps {
  product: SimpleProduct;
}

const CustomBullet = ({
  total,
  activeIndex,
}: {
  total: number;
  activeIndex: number;
}) => {
  return (
    <div className="flex justify-center gap-1 mt-4">
      {Array.from({ length: total }).map((_, i) => (
        <motion.button
          key={i}
          initial={{ scale: 0 }}
          animate={{ scale: i === activeIndex ? 1.25 : 1 }}
          transition={{ duration: 0.3 }}
          className={`h-[4px] w-[4px] rounded-full transition-all duration-300
            ${i === activeIndex ? "bg-black" : "bg-gray-300"}`}
        />
      ))}
    </div>
  );
};

export default function ImageCarousel({ product }: ImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [
          {
            url: "https://i.pinimg.com/736x/e7/70/53/e7705364ba1bd55d9ad9818609dbbb03.jpg",
            altText: product.title,
          },
        ];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
    setScale(1);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setScale(1);
    document.body.style.overflow = "unset";
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY;
      setScale((prev) => {
        const newScale = prev - delta * 0.01;
        return Math.max(1, Math.min(3, newScale));
      });
    }
  };

  return (
    <>
      <motion.div 
        ref={ref}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative mb-2"
      >
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="h-[50vh] w-full md:h-[110vh] lg:h-[93vh] rounded-none"
        >
          {images.map((item, key) => (
            <SwiperSlide key={key}>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex h-full w-full items-center justify-center cursor-pointer"
                onClick={() => openLightbox(key)}
              >
                <Image
                  src={item.url}
                  alt={item.altText || product.title}
                  fill
                  className="h-full w-full object-cover md:object-cover relative"
                  priority={key === 0}
                />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20"
        >
          <CustomBullet total={images.length} activeIndex={activeIndex} />
        </motion.div>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ backgroundColor: '#000000' }}
            className="fixed inset-0 z-50"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="fixed top-4 right-4 z-50 text-white hover:text-gray-300 transition-colors"
            >
              <X size={28} />
            </button>

            {/* Pinch to zoom text */}
            <div className="fixed top-5 left-4 z-50 text-sm text-gray-400 md:block hidden">
              Pinch to zoom
            </div>

            {/* Mobile: Pinch to zoom + percentage together */}
            <div className="fixed top-5 left-4 z-50 text-sm text-gray-400 md:hidden flex items-center gap-2">
              <span>Pinch to zoom</span>
              <span className="text-white font-medium">{Math.round(scale * 100)}%</span>
            </div>

            {/* Desktop: Zoom percentage next to close button */}
            <div className="fixed top-5 right-14 z-50 text-sm font-medium text-white hidden md:block">
              {Math.round(scale * 100)}%
            </div>

            {/* Thumbnail strip - vertical on desktop (right), horizontal on mobile (bottom) */}
            <div className="fixed md:right-0 md:top-0 md:h-full md:w-20 md:flex-col md:py-20 md:overflow-y-auto bottom-0 left-0 right-0 h-20 w-full overflow-x-auto flex flex-row md:items-center md:justify-center items-end justify-start gap-3 px-4 pb-4 md:px-0 md:pb-0 z-40 bg-black/50 md:bg-transparent">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setLightboxIndex(index);
                    setScale(1);
                  }}
                  className={`relative w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden transition-all ${
                    index === lightboxIndex 
                      ? 'ring-2 ring-white opacity-100' 
                      : 'opacity-40 hover:opacity-70'
                  }`}
                >
                  <Image
                    src={image.url}
                    alt={image.altText || product.title}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Image Container */}
            <div 
              className="w-full h-full overflow-auto"
              onWheel={handleWheel}
              style={{ backgroundColor: '#000000' }}
            >
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="min-h-screen w-full flex items-center justify-center md:pr-20 pb-24 md:pb-0 p-4"
                style={{
                  transform: `scale(${scale})`,
                  transition: isDragging ? 'none' : 'transform 0.2s ease-out',
                  transformOrigin: 'center center',
                  cursor: scale > 1 ? 'grab' : 'default'
                }}
                onMouseDown={() => setIsDragging(true)}
                onMouseUp={() => setIsDragging(false)}
                onMouseLeave={() => setIsDragging(false)}
              >
                <div className="relative w-full h-[70vh] md:max-w-4xl md:aspect-square md:h-auto">
                  <Image
                    src={images[lightboxIndex].url}
                    alt={images[lightboxIndex].altText || product.title}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}