import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  return (
    <div className="flex justify-between gap-4 my-8 border-t pt-6 border-gray-200">
      {currentPage > 1 ? (
        <Link
          href={`${basePath}/${currentPage - 1}`}
          className="flex gap-2 items-center font-inter font-bold text-sm lg:text-lg"
        >
           <ArrowLeftIcon className="size-4" /> anterior 
        </Link>
      ) : (
        <div></div>
      )}
      
      {currentPage < totalPages ? (
        <Link
          href={`${basePath}/${currentPage + 1}`}
          className="flex gap-2 items-center font-inter font-bold text-sm lg:text-lg"
        >
          próximo <ArrowRightIcon className="size-4" />
        </Link>
      ) : (
        <div></div>
      )}
    </div>
  );
}