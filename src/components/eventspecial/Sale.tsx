// // components/SaleHero.tsx
// 'use client';

// export default function SaleHero() {
//   return (
//     <div 
//       className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col justify-between relative p-6 md:p-12"
//       style={{ backgroundImage: "url('/images/saleAsset.webp')" }}
//     >
//       {/* Dark overlay */}
//       <div className="absolute inset-0 " />
      
//       {/* Content */}
//       <div className="relative z-10 flex flex-col justify-between h-[96vh] min-h-[98vh] pt-6 md:py-12">
        
//         {/* Logo - Top Left */}
//         <div>
//           <h2 className="text-white text-[48px] font-light font-ispire">
//             Mydearnikes
//           </h2>
//         </div>
        
//         {/* Main Text - Left Side */}
//         <div className="flex-1 flex ">
        
//           <h1 className="text-[#fafbac] text-[96px] w-130 tracking-tigh leading-20 mt-10">
//                 Archive pieces  on <span className="text-[#fa7ba0]">sale</span>  tonight, one crazy <span className="text-[#fa7ba0]">flat price</span>  & free shipping.
//           </h1>
//         </div>
        
//         {/* Live Time - Bottom Right */}
//         <div className="self-end">
//           <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-white uppercase">
//             LIVE AT 9:00 PM IST.
//           </h1>
//         </div>
        
//       </div>
//     </div>
//   );
// }

// components/SaleHero.tsx
'use client';

export default function SaleHero() {
  return (
    <>
      {/* MOBILE VERSION - Hidden on md and above */}
      <div 
        className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative md:hidden"
        style={{ backgroundImage: "url('/images/saleAssetMob.webp')" }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 " />
        
        {/* Content */}
        <div className="relative z-10 min-h-screen flex flex-col  px-6 py-8">
          
          {/* Logo - Top Left */}
          <div>
            <h2 className="text-white text-[36px] font-normal font-ispire">
              MYDEARNIKES
            </h2>
          </div>
          
          {/* Main Text */}
          <div>
            <h1 className="text-[56px] w-75 font-black text-[#fafbac] leading-12 uppercase mt-5">
               Archive pieces on <span className="text-[#fa7ba0]">sale</span> tonight, one crazy <span className="text-[#fa7ba0]">flat price</span> & free shipping.
            </h1>
          </div>
          
          {/* Live Time - Bottom Left */}
          <div>
            <h1 className="text-[36px] font-black uppercase text-white absolute bottom-10">
              LIVE AT 9:00 PM IST
            </h1>
          </div>
          
        </div>
      </div>

      {/* DESKTOP VERSION - Hidden on mobile, visible on md and above */}
      <div 
        className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex-col justify-between relative p-6 md:p-12 hidden md:flex"
        style={{ backgroundImage: "url('/images/saleAsset.webp')" }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0" />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between h-[96vh] min-h-[98vh] pt-6 md:py-12">
          
          {/* Logo - Top Left */}
          <div>
            <h2 className="text-white text-[48px] font-light font-ispire">
              Mydearnikes
            </h2>
          </div>
          
          {/* Main Text - Left Side */}
          <div className="flex-1 flex">
            <h1 className="text-[#fafbac] text-[96px] w-120 tracking-tight leading-20 mt-10">
              Archive pieces on <span className="text-[#fa7ba0]">sale</span> tonight, one crazy <span className="text-[#fa7ba0]">flat price</span> & free shipping.
            </h1>
          </div>
          
          {/* Live Time - Bottom Right */}
          <div className="self-end">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-white uppercase">
              LIVE AT 9:00 PM IST.
            </h1>
          </div>
          
        </div>
      </div>
    </>
  );
}