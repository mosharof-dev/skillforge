"use client";

import { Pagination } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";

interface CoursePaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export function CoursePagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
}: CoursePaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // If there's no data or only 1 page, we can hide or simplify the pagination
  if (totalPages <= 1) return null;

  const setPage = (p: number) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("page", p.toString());
    const searchStr = current.toString();
    const query = searchStr ? `?${searchStr}` : "";
    router.push(`/courses${query}`);
  };

  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];

    pages.push(1);

    if (currentPage > 3) {
      pages.push("ellipsis");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("ellipsis");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    // Remove duplicates if any
    return Array.from(new Set(pages));
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <Pagination className="w-full justify-center flex mt-12 mb-6">
      <Pagination.Summary className="mr-4 text-slate-500 font-medium">
        Showing <span className="text-slate-800 font-bold">{startItem}-{endItem}</span> of <span className="text-slate-800 font-bold">{totalItems}</span> results
      </Pagination.Summary>
      <Pagination.Content>
        <Pagination.Item>
          <Pagination.Previous isDisabled={currentPage === 1} onPress={() => setPage(currentPage - 1)}>
            <Pagination.PreviousIcon />
            <span className="hidden sm:inline">Previous</span>
          </Pagination.Previous>
        </Pagination.Item>
        {getPageNumbers().map((p, i) =>
          p === "ellipsis" ? (
            <Pagination.Item key={`ellipsis-${i}`}>
              <Pagination.Ellipsis />
            </Pagination.Item>
          ) : (
            <Pagination.Item key={p}>
              <Pagination.Link isActive={p === currentPage} onPress={() => setPage(p as number)}>
                {p}
              </Pagination.Link>
            </Pagination.Item>
          ),
        )}
        <Pagination.Item>
          <Pagination.Next isDisabled={currentPage === totalPages} onPress={() => setPage(currentPage + 1)}>
            <span className="hidden sm:inline">Next</span>
            <Pagination.NextIcon />
          </Pagination.Next>
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  );
}
