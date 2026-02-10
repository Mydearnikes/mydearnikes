"use client";
export default function ChristmasMarquee() {
  return (
    <>
      <div className="w-full bg-black text-white overflow-hidden h-10 flex items-center border-b border-gray-800">
        <div className="whitespace-nowrap flex items-center animate-scroll uppercase">
          <span className="mx-8 text-sm font-medium">
            <span className="space-x-2">
  <span>buy 2 get 10% off</span>
  <span>|</span>
  <span>buy 3 get 15% off</span>
  <span>|</span>
  <span>buy 4 get 20% off</span>
</span>
          </span>
          <span className="mx-8 text-sm font-medium">
                      <span className="space-x-2">
  <span>buy 2 get 10% off</span>
  <span>|</span>
  <span>buy 3 get 15% off</span>
  <span>|</span>
  <span>buy 4 get 20% off</span>
</span>

          </span>
          <span className="mx-8 text-sm font-medium">
                       <span className="space-x-2">
  <span>buy 2 get 10% off</span>
  <span>|</span>
  <span>buy 3 get 15% off</span>
  <span>|</span>
  <span>buy 4 get 20% off</span>
</span>
          </span>
          <span className="mx-8 text-sm font-medium">
                        <span className="space-x-2">
  <span>buy 2 get 10% off</span>
  <span>|</span>
  <span>buy 3 get 15% off</span>
  <span>|</span>
  <span>buy 4 get 20% off</span>
</span>
          </span>
          <span className="mx-8 text-sm font-medium">
                        <span className="space-x-2">
  <span>buy 2 get 10% off</span>
  <span>|</span>
  <span>buy 3 get 15% off</span>
  <span>|</span>
  <span>buy 4 get 20% off</span>
</span>
          </span>
          <span className="mx-8 text-sm font-medium">
                        <span className="space-x-2">
  <span>buy 2 get 10% off</span>
  <span>|</span>
  <span>buy 3 get 15% off</span>
  <span>|</span>
  <span>buy 4 get 20% off</span>
</span>
          </span>
       
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 25s linear infinite;
        }
      `}</style>
    </>
  );
}
