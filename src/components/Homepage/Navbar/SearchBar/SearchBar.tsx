"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { trackSearch } from "@/lib/analytics";  

interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
  recents: string[];
  addRecent: (term: string) => void;
  resultCount?: number;  // 🎯 Add this optional prop to track result count
}

const SearchBar = ({ query, setQuery, recents, addRecent, resultCount }: SearchBarProps) => {
  // 🎯 Handle search tracking
  const handleSearch = (searchTerm: string) => {
    if (searchTerm.trim()) {
      addRecent(searchTerm.trim());
      trackSearch(searchTerm.trim(), resultCount);  // Track the search
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="px-[8px] bg-white py-3 relative border-b-[0.5px] border-[#aeadad] mb-2"
    >
      {/* INPUT BOX */}
      <motion.input
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        type="text"
        placeholder="Type Something :/"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full py-2 focus:outline-none"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch(query);  
          }
        }}
        whileFocus={{
          scale: 1,
          transition: { duration: 0.2 }
        }}
      />

      {/* Recent pills - only show when not searching */}
      {!query && recents.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex flex-wrap gap-2 mt-4"
        >
          {recents.map((recent, index) => (
            <motion.span
              key={recent}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.3, 
                delay: 0.3 + (index * 0.05) 
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant={"outline"}
                onClick={() => {
                  setQuery(recent);
                  handleSearch(recent);  //  Track when clicking recent search
                }}
                className="rounded-full border-[0.5px] px-3 border-[#aeadad]"
              >
                {recent}
              </Button>
            </motion.span>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default SearchBar;