import { create } from "zustand";

export type SearchQuery = {
  country: string | undefined;
  checkIn: Date | null | undefined;
  checkOut: Date | null | undefined;
  guests: number;
  bathrooms: number;
  bedrooms: number;
  category: string;
};

interface SearchModalStore {
  isOpen: boolean;
  step: string;
  open: (step: string) => void;
  close: () => void;
  query: SearchQuery;
  setQuery: (query: SearchQuery) => void;
}

const useSearchModal = create<SearchModalStore>((set) => ({
  isOpen: false,
  step: "",
  open: (step) => set({ isOpen: true, step: step }),
  close: () => set({ isOpen: false }),
  query: {
    country: "",
    checkIn: null,
    checkOut: null,
    guests: 1,
    bedrooms: 0,
    bathrooms: 0,
    category: "",
  },
  setQuery: (query: SearchQuery) => set({ query: query }),
}));

export default useSearchModal;
