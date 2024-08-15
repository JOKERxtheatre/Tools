"use client";

import React, { useState } from "react";
import { categories, technologies } from "@/constants";
import Image from "next/image";
import BackgroundAnimation from "./components/background";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredTechnologies, setFilteredTechnologies] = useState<
    Array<{ name: string; category: string; logo: string }>
  >([]);

  const handleCheckboxChange = (category: any) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
      setFilteredTechnologies([]);
    } else {
      const filteredTech = technologies.filter(
        (tech) => tech.category === category
      );
      setFilteredTechnologies(filteredTech);
      setSelectedCategory(category);
    }
  };

  const getCategoryColor = (category: any) => {
    switch (category) {
      case "Frontend":
        return "#c6d6ff";
      case "Backend":
        return "#bddaed";
      case "Devops":
        return "#a8bfff";
      case "Testing":
        return "#e1e9fe";
      case "UX/UI":
        return "#ced6ee";
      case "Infrastructure":
        return "#d1dde8";
      case "Mobile":
        return "#dbe5ff";
      default:
        return "#ffffff";
    }
  };

  return (
    <main className="flex justify-center h-full relative">
      {/* Background Animation */}
      <BackgroundAnimation />

      <div className="container max-w-[1140px] flex flex-col justify-center text-center gap-5 z-10 mt-12">
        <h1 className="text-6xl font-bold text-[#1b5bf7]">Tools</h1>
        <div className="categories grid grid-flow-row grid-cols-7 max-[768px]:grid-cols-4 max-[768px]:px-4 max-[426px]:grid-cols-2 gap-5 items-center justify-between">
          {categories.map((category) => (
            <div key={category}>
              <label className="flex text-sm font-bold gap-3">
                <input
                  type="checkbox"
                  name={category}
                  className="chb input"
                  checked={selectedCategory === category}
                  onChange={() => handleCheckboxChange(category)}
                />
                <span className="custom-checkbox"></span>
                <h1>{category}</h1>
              </label>
            </div>
          ))}
        </div>
        <div className="grid gap-2 grid-cols-12 mt-12 max-[1024px]:grid-cols-8 max-[768px]:grid-cols-6 max-[1140px]:px-4 max-[426px]:grid-cols-4">
          {technologies.map((tech) => (
            <div
              className="flex h-[90px] w-full flex-col items-center justify-center rounded gap-4 transition-opacity duration-150 ease-in"
              style={{
                backgroundColor: getCategoryColor(tech.category),
                opacity:
                  selectedCategory &&
                  filteredTechnologies.findIndex(
                    (filteredTech) => filteredTech.name === tech.name
                  ) === -1
                    ? 0.1
                    : 1,
              }}
              key={tech.name}
            >
              <div className="flex items-center justify-center w-[30px] h-[30px]">
                <Image
                  src={tech.logo}
                  alt={`${tech.name} logo`}
                  height={50}
                  width={50}
                  className="w-full h-auto"
                />
              </div>
              <h1 className="text-xs">{tech.name}</h1>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
