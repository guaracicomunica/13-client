import { useEffect } from "react";
import { createContext, useState } from "react";

type CategoryContextType = {
  isCategoryPrefiltered: boolean;
  preFilterCategoryId: number;
  applyCategoryPrefilter: (id: number) => void;
  cancelCategoryPrefilter: () => void;
}


export const CategoryContext = createContext({} as CategoryContextType);

export function CategoryProvider({ children }) {
  const [isCategoryPrefiltered, setIsCategoryPrefiltered] = useState<boolean>();
  const [preFilterCategoryId, setPreFilterCategoryId] = useState<number>();


  function applyCategoryPrefilter(id: number) {
    setPreFilterCategoryId(id);
    setIsCategoryPrefiltered(true);
  }
  
  function cancelCategoryPrefilter() {
    setPreFilterCategoryId(0);
    setIsCategoryPrefiltered(false);
  }

  return (
    <CategoryContext.Provider value={{ isCategoryPrefiltered, preFilterCategoryId, applyCategoryPrefilter, cancelCategoryPrefilter }}>
      { children }
    </CategoryContext.Provider>
  )
}