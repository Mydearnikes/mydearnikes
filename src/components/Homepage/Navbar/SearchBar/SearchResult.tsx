
"use client";

interface Props {
  items: string[];
  onSelect: (term: string) => void;
}

export default function SearchResults({ items, onSelect }: Props) {
  if (!items.length) return null;

  return (
    <ul className="absolute top-full mt-1 w-full bg-white shadow-md z-10">
      {items.map((text) => (
        <li
          key={text}
          onClick={() => onSelect(text)}
          className="cursor-pointer py-3 border-b-[0.5px] border-[#aeadad] hover:bg-gray-100"
        >
          {text}
        </li>
      ))}
    </ul>
  );
}