
'use client';

import Link from "next/link";



export default function SaleHero() {
  return (
    <>
      {/* MOBILE VERSION - Hidden on md and above */}
      <div 
        className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative md:hidden"
        style={{ backgroundImage: "url('/images/wallP.png')" }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 " />
        
        {/* Content */}
        <div className="relative z-10 min-h-screen flex flex-col  px-4 py-8">
          
          {/* Logo - Top Left */}
          <div>
            <h2 className="text-white text-[32px] font-normal font-ispire mt-20">
              MYDEARNIKES
            </h2>
          </div>
          
          {/* Main Text */}
          <div>
            <h1 className="text-[56px] w-75 font-black text-[#fafbac] leading-12 uppercase mt-5">
               Archive pieces on <span className="text-[#fa7ba0]">sale</span> is live now, one crazy <span className="text-[#fa7ba0]">flat price</span> & free shipping.
            </h1>
          </div>
          
          {/* Live Time - Bottom Left */}
          <div>
            {/* <h1 className="text-[36px] font-black uppercase text-white absolute bottom-30">
              LIVE AT 9:00 PM IST
            </h1> */}
               <div className="cta mb-2">
                <Link href="/category/archive-sale">
                  <button
                  
                    className="font-bebas text-3xl border-1 border-white px-3 pb-2 pt-3 text-white rounded-lg tracking-[0.5px] leading-none flex justify-center items-center hover:bg-black hover:text-white hover:border-0 absolute bottom-30"
                  >
                    Shop Now
                  </button>
                </Link>
              </div>
          </div>
          
        </div>
      </div>

      {/* DESKTOP VERSION - Hidden on mobile, visible on md and above */}
      <div 
        className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex-col justify-between relative p-4 md:py-12 hidden md:flex"
        style={{ backgroundImage: "url('/images/wallP.png')" }}
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
              Archive pieces on <span className="text-[#fa7ba0]">sale</span> is live now, one crazy <span className="text-[#fa7ba0]">flat price</span> & free shipping.
            </h1>
          </div>
          
          {/* Live Time - Bottom Right */}
          <div className="self-end">
              <div className="cta mb-2">
                <Link href="/category/archive-sale">
                  <button
                  
                    className="font-bebas text-3xl border-1 border-white px-3 pb-2 pt-3 text-white rounded-lg tracking-[0.5px] leading-none flex justify-center items-center hover:bg-black hover:text-white hover:border-0 "
                  >
                    Shop Now
                  </button>
                </Link>
              </div>
          </div>
          
        </div>
      </div>
    </>
  );
}