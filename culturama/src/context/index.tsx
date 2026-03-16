"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import db from "../db.json";
import { type Category, type Event, type DataContextType } from "../types";

const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider = ({ children }: DataProviderProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const categoriesData = db.categories;
      const eventsData = db.events;

      const processedCategories = categoriesData.map((cat: Category) => ({
        ...cat,
        id: Number(cat.id),
      }));

      const processedEvents = eventsData.map((event: Event) => ({
        ...event,
        id: Number(event.id),
        categoryId: Number(event.categoryId),
      }));

      setCategories(processedCategories as Category[]);
      setEvents(processedEvents as Event[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
      console.error("Erro ao carregar dados:", err);
    } finally {
      setLoading(false);
    }
  };

  const getEventsByCategory = (categoryId: number): Event[] => {
    return events.filter((event) => event.categoryId === categoryId);
  };

  const searchEvents = (query: string): Event[] => {
    if (!query.trim()) return events;

    const lowerQuery = query.toLowerCase();
    return events.filter(
      (event) =>
        event.name.toLowerCase().includes(lowerQuery) ||
        event.description.toLowerCase().includes(lowerQuery) ||
        event.location.toLowerCase().includes(lowerQuery),
    );
  };

  const refreshData = async () => {
    await fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const contextValue: DataContextType = {
    categories,
    events,
    loading,
    error,
    getEventsByCategory,
    searchEvents,
    refreshData,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData deve ser usado dentro de um DataProvider");
  }
  return context;
};
