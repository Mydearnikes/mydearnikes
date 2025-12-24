"use client";
export default function ChristmasMarquee() {
  return (
    <>
      <div className="w-full bg-black text-white overflow-hidden h-10 flex items-center border-b border-gray-800">
        <div className="whitespace-nowrap flex items-center animate-scroll uppercase">
          <span className="mx-8 text-sm font-medium">
            🎄 Christmas Week Special: 10% OFF • Use code{" "}
            <span className="text-[#5fdd9d]"> "readyfor2026" </span> at checkout
          </span>
          <span className="mx-8 text-sm font-medium">
            🎄 Christmas Week Special: 10% OFF • Use code{" "}
            <span className="text-[#5fdd9d]"> "readyfor2026" </span> at checkout
          </span>
          <span className="mx-8 text-sm font-medium">
            🎄 Christmas Week Special: 10% OFF • Use code{" "}
            <span className="text-[#5fdd9d]"> "readyfor2026" </span> at checkout
          </span>
          <span className="mx-8 text-sm font-medium">
            🎄 Christmas Week Special: 10% OFF • Use code{" "}
            <span className="text-[#5fdd9d]"> "readyfor2026" </span> at checkout
          </span>
          <span className="mx-8 text-sm font-medium">
            🎄 Christmas Week Special: 10% OFF • Use code{" "}
            <span className="text-[#5fdd9d]"> "readyfor2026" </span> at checkout
          </span>
          <span className="mx-8 text-sm font-medium">
            🎄 Christmas Week Special: 10% OFF • Use code{" "}
            <span className="text-[#5fdd9d]"> "readyfor2026" </span> at checkout
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
