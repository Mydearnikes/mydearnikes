// "use client";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import { Button } from "../ui/button";

// import SearchComponent from "../Homepage/Navbar/SearchComponent/SearchComp";

// import TeesComponent from "../Homepage/Navbar/NavSections/teesSection/teesSection";
// import NewInComponent from "../Homepage/Navbar/NavSections/newinSection/newInSection";
// import HelpBar from "../Homepage/Navbar/NavSections/helpBar/HelpBar";

// import { useCartStore } from "@/store/cartStore";
// import CartDrawer from "../cart/SlideOutDrawer";

// type ActiveState = null | "tees" | "hoodies" | "sweatpants" | "all" | "newin" | "search" | "lighters" | "tumblers";

// const Header = () => {
//   const router = useRouter();
//   const [active, setActive] = useState<ActiveState>(null);
//   const { totalItems } = useCartStore();
//   const [cartOpen, setCartOpen] = useState(false);

//   const openCart = () => setCartOpen(true);
//   const closeCart = () => setCartOpen(false);
//   const toggle = () => setActive((prev) => (prev ? null : "tees"));
//   const closeMenu = () => setActive(null);

//   const handleLogoClick = () => {
//     closeMenu();
//     router.push("/");
//   };

//   const handleNavigation = (key: string) => {
//     if (key === "all") {
//       setActive(null);
//       router.push("/category/all-products");
//     } else if (key === "newin") {
//       setActive(null);
//       router.push("/category/new-arrivals");
//     } else if (key === "hoodies") {
//       setActive(null);
//       router.push("/category/hoodies");
//     } else if (key === "sweatpants") {
//       setActive(null);
//       router.push("/category/sweatpants");
//     } else if (key === "lighters") {
//       setActive(null);
//       router.push("/category/lighters");
//     }
//      else if (key === "tumblers") {
//       setActive(null);
//       router.push("/category/tumbler-bottles");
//     }

//     else if (key === "search") {
//       setActive("search");
//     } else {
//       const validKeys: ActiveState[] = [
//         "tees",
//         "all",
//         "newin",
//         "search",
//       ];
//       if (validKeys.includes(key as ActiveState)) {
//         setActive(key as ActiveState);
//       } else {
//         setActive(null);
//       }
//     }
//   };

//   const menuItems = [
//     { key: "all", label: "All Products" },
//     { key: "newin", label: "New In" },
//     { key: "tees", label: "Tees" },
//     { key: "hoodies", label: "Hoodies & Sweats" },
//     { key: "lighters", label: "Lighters" },
//     { key: "tumblers", label: "Tumblers" },
//     { key: "search", label: "Search" },
//   ];

//   return (
//     <>
//       <header className="fixed top-0 left-0 right-0 z-50 bg-white borde-b-[0.5px] border-[#aeadad]">
//         <div className="flex justify-between items-center py-3 px-[8px] border-[#aeadad] border-b-[0.5px]">
//           <Button
//             variant="outline"
//             onClick={toggle}
//             className={`rounded-full text-white ${
//               active ? "bg-black text-white border-none" : "bg-white text-black"
//             }`}
//           >
//             {active ? "Close" : "Menu"}
//           </Button>

//           <div
//             className="logo font-ispire text-3xl cursor-pointer"
//             onClick={handleLogoClick}
//           >
//             MYDEARNIKES
//           </div>

//           <Button
//             variant="outline"
//             className="rounded-full relative min-w-[60px] transition-all duration-200"
//             onClick={openCart}
//           >
//             {totalItems > 0 ? (
//               <div className="flex items-center justify-center">
//                 <span className="font-medium">{totalItems}</span>
//               </div>
//             ) : (
//               <span>Cart</span>
//             )}
//             {totalItems > 0 && (
//               <div className="absolute -top-1 -right-1 w-3 h-3 bg-black rounded-full animate-pulse"></div>
//             )}
//           </Button>
//         </div>

//         <AnimatePresence>
//           {active && (
//             <motion.div
//               initial={{ height: 0, opacity: 0 }}
//               animate={{ height: "auto", opacity: 1 }}
//               exit={{ height: 0, opacity: 0 }}
//               transition={{ duration: 0.3, ease: "easeInOut" }}
//               className="absolute top-full left-0 right-0 overflow-hidden"
//             >
//               <motion.nav
//                 initial={{ y: -20, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 exit={{ y: -20, opacity: 0 }}
//                 transition={{ duration: 0.3, delay: 0.1 }}
//                 className="bg-white flex items-center overflow-x-auto gap-2 scrollbar-hide px-[8px] py-[16px] border-b-[0.5px] border-[#aeadad]"
//               >
//                 {menuItems.map(({ key, label }, index) => (
//                   <motion.div
//                     key={key}
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{
//                       duration: 0.4,
//                       delay: 0.2 + (index * 0.1),
//                       ease: "easeOut"
//                     }}
//                   >
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       className={`rounded-full px-3 text-sm border-b-[0.5px] border-[#aeadad] hover:bg-gray-100 transition-colors ${
//                         active === key ? "bg-black text-white hover:bg-black" : ""
//                       }`}
//                       onClick={() => handleNavigation(key)}
//                     >
//                       {label}
//                     </Button>
//                   </motion.div>
//                 ))}
//               </motion.nav>

//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: 20 }}
//                 transition={{ duration: 0.3, delay: 0.2 }}
//               >
//                 {active === "tees" && <TeesComponent onClose={closeMenu} />}
//                 {active === "newin" && <NewInComponent />}
//                 {active === "search" && <SearchComponent onClose={closeMenu} />}

//                 <HelpBar onClose={closeMenu} />
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </header>

//       <AnimatePresence>
//         {active && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
//             onClick={closeMenu}
//           />
//         )}
//       </AnimatePresence>

//       <CartDrawer isOpen={cartOpen} onClose={closeCart} />
//     </>
//   );
// };

// export default Header;

// ######################################################################################################

"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import { useCartStore } from "@/store/cartStore";
import CartDrawer from "../cart/SlideOutDrawer";
import SearchComponent from "../Homepage/Navbar/SearchComponent/SearchComp";
import ChristmasMarquee from "../ChristmasMarquee";

const Header = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { totalItems } = useCartStore();
  const [cartOpen, setCartOpen] = useState(false);

  const openCart = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => {
    setMenuOpen(false);
    setSearchOpen(false);
  };

  const toggleSearch = () => setSearchOpen((prev) => !prev);
  const closeSearch = () => setSearchOpen(false);

  // Prevent body scroll when menu is open
  React.useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  const handleLogoClick = () => {
    closeMenu();
    router.push("/");
  };

  const handleNavigation = (path: string) => {
    closeMenu();
    router.push(path);
  };

  const menuItems = [
    { number: "01", label: "Home", path: "/" },
    { number: "02", label: "All Products", path: "/category/all-products" },
    { number: "03", label: "New In", path: "/category/new-arrivals" },
    { number: "04", label: "Tees", path: "/category/tees" },
    { number: "06", label: "Baby Tees", path: "/category/baby-tees" },
    { number: "07", label: "Hoodies", path: "/category/hoodies" },
    { number: "09", label: "Lighters", path: "/category/lighters" },
    { number: "10", label: "Tumblers", path: "/category/tumbler-bottles" },
  ];

  return (
    <>


      {/* Main Header - positioned below marquee */}
      <header className="fixed  left-0 right-0 z-50 bg-white border-b-[0.5px] border-[#aeadad]">
        <ChristmasMarquee />
        <div className="flex justify-between items-center py-3 px-[8px]">
          <Button
            variant="outline"
            onClick={toggleMenu}
            className={`rounded-full text-white ${
              menuOpen
                ? "bg-black text-white border-none"
                : "bg-white text-black"
            }`}
          >
            {menuOpen ? "Close" : "Menu"}
          </Button>

          <div
            className="logo font-ispire text-3xl cursor-pointer"
            onClick={handleLogoClick}
          >
            MYDEARNIKES
          </div>

          <Button
            variant="outline"
            className="rounded-full relative min-w-[60px] transition-all duration-200"
            onClick={openCart}
          >
            {totalItems > 0 ? (
              <div className="flex items-center justify-center">
                <span className="font-medium">{totalItems}</span>
              </div>
            ) : (
              <span>Cart</span>
            )}
            {totalItems > 0 && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-black rounded-full animate-pulse"></div>
            )}
          </Button>
        </div>
      </header>

      {/* Full-width Slide-out Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop to prevent background scroll */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-white z-[60]"
            />

            {/* Slide-out Menu */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              className="fixed top-0 left-0 h-screen w-full bg-white z-[70] flex flex-col overflow-hidden"
            >
              {/* Fixed Header with Close, Logo, and Search */}
              <div className="flex-shrink-0 bg-white z-10 flex justify-between items-center py-3 px-[8px] border-b border-black/10">
                <Button
                  variant="outline"
                  onClick={closeMenu}
                  className="rounded-full bg-black text-white border-none hover:bg-gray-800"
                >
                  Close
                </Button>

                <div className="logo font-ispire text-2xl">MYDEARNIKES</div>

                <Button
                  variant="outline"
                  className={`rounded-full transition-all ${
                    searchOpen
                      ? "bg-black text-white border-none"
                      : "hover:bg-black hover:text-white"
                  }`}
                  onClick={toggleSearch}
                >
                  {searchOpen ? "Menu" : "Search"}
                </Button>
              </div>

              {/* Content - Toggles between Menu and Search */}
              <div className="flex-1 flex flex-col overflow-hidden">
                <AnimatePresence mode="wait">
                  {searchOpen ? (
                    // Search Component
                    <motion.div
                      key="search"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="flex-1 overflow-auto bg-white backdrop-blur-md"
                    >
                      <SearchComponent onClose={closeSearch} />
                    </motion.div>
                  ) : (
                    // Menu Items
                    <motion.div
                      key="menu"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="flex-1 flex flex-col overflow-hidden"
                    >
                      {/* Menu Items - Boxy Design */}
                      <nav className="flex-1 overflow-y-auto">
                        {menuItems.map((item, index) => (
                          <motion.div
                            key={item.number}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: 0.05 + index * 0.03,
                              duration: 0.4,
                            }}
                          >
                            <button
                              onClick={() => handleNavigation(item.path)}
                              className="w-full group bg-white border-b border-[#aeadad] hover:border-black transition-all overflow-hidden"
                            >
                              <div className="flex justify-between items-center py-4 px-[8px] lg:px-2">
                                <span className="text-xl md:text-2xl font-medium font-inter text-black group-hover:text-black transition-colors">
                                  {item.label}
                                </span>
                              </div>
                            </button>
                          </motion.div>
                        ))}
                      </nav>

                      {/* Information Section - Sticky Bottom */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.4 }}
                        className="flex-shrink-0 py-4 px-4 lg:px-6 border-t border-black/10 bg-white"
                      >
                        <div>
                          <h3 className="text-gray-500 text-xs tracking-wider mb-2">
                            (Information)
                          </h3>
                          <div className="flex gap-4 text-xs">
                            <button
                              onClick={() => handleNavigation("/about")}
                              className="hover:underline"
                            >
                              About Us
                            </button>
                            <button
                              onClick={() => handleNavigation("/contact")}
                              className="hover:underline"
                            >
                              Contact
                            </button>
                            <button
                              onClick={() => handleNavigation("/shipping")}
                              className="hover:underline"
                            >
                              Shipping & Returns
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <CartDrawer isOpen={cartOpen} onClose={closeCart} />

      {/* Global styles for marquee animation */}
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
};

export default Header;
