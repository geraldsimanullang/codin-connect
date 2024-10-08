"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Search() {
  const searchParams = useSearchParams();
  const initialSearchTerm = searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState<string>(initialSearchTerm);
  const [debouncedSearchTerm, setDebouncedSearchTerm] =
    useState<string>(initialSearchTerm);
  const router = useRouter();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 100);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      router.push(`/profile?search=${searchTerm}`);
    }
  }, [debouncedSearchTerm, router]);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDebouncedSearchTerm(searchTerm);
    router.push(`/profile?search=${searchTerm}`);
  };

  return (
    <form className="flex justify-center" onSubmit={handleSubmit}>
      <input
        type="text"
        className="w-4/5 px-1 py-4 text-base text-gray-500 rounded-sm border border-gray"
        placeholder="Cari di Tokopedia"
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </form>
  );
}
