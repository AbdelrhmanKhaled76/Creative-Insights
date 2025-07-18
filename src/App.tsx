import { useState } from "react";
import type { CategoryData } from "./interfaces/CategoryData";
import type { Label } from "./interfaces/Label";
import Card from "./components/card";
import ReactPaginate from "react-paginate";

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;
  const [categories, setCategories] = useState<Label[]>([
    { category: "all", choosen: true },
    { category: "tech", choosen: false },
    { category: "travel", choosen: false },
    { category: "food", choosen: false },
  ]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const items: CategoryData[] = [
    {
      category: "tech",
      date: new Date("2025-07-18"),
      title: "Building Modern Web Applications with React",
      description: "Explore the latest features in React 18...",
      image: { tag: "tech image", url: "/tech1.jpeg" },
      time: 5,
    },
    {
      category: "tech",
      date: new Date("2025-06-18"),
      title: "TypeScript Best Practices for 2024",
      description: "Explore the latest features in React 18...",
      image: { tag: "tech image", url: "/tech2.jpeg" },
      time: 6,
    },
    {
      category: "tech",
      date: new Date("2025-07-17"),
      title: "Machine Learning in Production",
      description: "Explore the latest features in React 18...",
      image: { tag: "tech image", url: "/tech3.jpeg" },
      time: 8,
    },
    {
      category: "tech",
      date: new Date("2025-02-18"),
      title: "Database Optimization Techniques",
      description: "Explore the latest features in React 18...",
      image: { tag: "tech image", url: "/tech4.jpeg" },
      time: 10,
    },
    {
      category: "food",
      date: new Date("2025-03-18"),
      title: "Nordic Cuisine: Simplicity and Sustainability",
      description: "Explore the latest features in React 18...",
      image: { tag: "tech image", url: "/food1.jpeg" },
      time: 7,
    },
    {
      category: "food",
      date: new Date("2022-02-18"),
      title: "Fermentation: The Science of Flavor",
      description: "Explore the latest features in React 18...",
      image: { tag: "tech image", url: "/food2.jpeg" },
      time: 4,
    },
    {
      category: "food",
      date: new Date("2023-02-18"),
      title: "The Art of Italian Pasta Making",
      description: "Explore the latest features in React 18...",
      image: { tag: "tech image", url: "/food3.jpeg" },
      time: 3,
    },
    {
      category: "travel",
      date: new Date("2023-02-10"),
      title: "Road Trip Across the American Southwest",
      description: "Explore the latest features in React 18...",
      image: { tag: "tech image", url: "/travel1.jpeg" },
      time: 3,
    },
    {
      category: "travel",
      date: new Date("2023-01-01"),
      title: "Hidden Gems of Tokyo: A Local's Guide",
      description: "Explore the latest features in React 18...",
      image: { tag: "tech image", url: "/travel2.jpeg" },
      time: 3,
    },
    {
      category: "travel",
      date: new Date("2021-05-13"),
      title: "Backpacking Through Southeast Asia",
      description: "Explore the latest features in React 18...",
      image: { tag: "tech image", url: "/travel3.jpeg" },
      time: 3,
    },
  ];

  const getCategoryClass = (categoryName: string, choosen: boolean): string => {
    switch (categoryName) {
      case "all":
        return choosen ? "bg-black text-white" : "bg-gray-200 text-black";
      case "tech":
        return choosen ? "bg-blue-700 text-white" : "bg-blue-200 text-blue-700";
      case "travel":
        return choosen
          ? "bg-green-700 text-white"
          : "bg-green-200 text-green-700";
      case "food":
        return choosen
          ? "bg-orange-700 text-white"
          : "bg-orange-200 text-orange-700";
      default:
        return "";
    }
  };

  function handleCategoryChange(selectedCategory: string) {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.category === selectedCategory
          ? { ...cat, choosen: true }
          : { ...cat, choosen: false }
      )
    );
    setCurrentPage(0); // reset to first page
  }

  function handlePageClick(selectedItem: { selected: number }) {
    setCurrentPage(selectedItem.selected);
  }

  // Compute filtered items dynamically
  const currentCategory =
    categories.find((cat) => cat.choosen)?.category || "all";
  let filteredItems = items;

  if (currentCategory !== "all") {
    filteredItems = filteredItems.filter(
      (item) => item.category === currentCategory
    );
  }

  if (searchTerm.trim() !== "") {
    filteredItems = filteredItems.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const offset = currentPage * itemsPerPage;
  const currentItems = filteredItems.slice(offset, offset + itemsPerPage);

  return (
    <main className="pt-16 pb-4 container mx-auto">
      <h1 className="font-bold text-4xl md:text-5xl capitalize text-center">
        welcome to creative insights
      </h1>
      <p className="max-w-3xl py-7 text-xl text-center text-black/70 mx-auto">
        Discover the latest in technology, explore amazing destinations, and
        savor culinary adventures.
      </p>

      <div className="flex justify-between md:items-center md:flex-row flex-col gap-5">
        <ul className="flex gap-2">
          {categories.map((categoryObj) => (
            <li
              key={categoryObj.category}
              onClick={() =>
                handleCategoryChange(categoryObj.category.toLowerCase())
              }
              className={`px-5 py-2 rounded-full font-semibold cursor-pointer capitalize hover:scale-110 transition-transform duration-300 ${getCategoryClass(
                categoryObj.category.toLowerCase(),
                categoryObj.choosen
              )}`}
            >
              {categoryObj.category}
            </li>
          ))}
        </ul>
        <input
          type="search"
          className="border rounded-2xl px-6 py-2 border-black/30"
          placeholder="Title Filter"
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(0); // reset page on search
          }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 py-10">
        {currentItems.map((item, idx) => (
          <Card category={item} key={idx} />
        ))}
      </div>

      <div className="mx-auto pb-10">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          pageCount={Math.ceil(filteredItems.length / itemsPerPage)}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          containerClassName="flex justify-center items-center gap-2 mt-6 flex-wrap"
          pageLinkClassName="px-3 py-1 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-200 transition-colors duration-300 cursor-pointer"
          activeLinkClassName="bg-black text-white border-black"
          previousLinkClassName="px-3 py-1 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-200 transition-colors duration-300 cursor-pointer"
          nextLinkClassName="px-3 py-1 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-200 transition-colors duration-300 cursor-pointer"
          breakLinkClassName="px-3 py-1 rounded-full text-gray-500"
        />
      </div>
    </main>
  );
}

export default App;
