import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  const getPageNumbers = () => {
    const delta = 2; // Número de páginas para mostrar antes e depois da atual
    const range = [];
    
    for (
      let i = Math.max(1, currentPage - delta);
      i <= Math.min(totalPages, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    // Adiciona primeira página se não estiver no range
    if (range[0] > 1) {
      range.unshift(1);
      if (range[1] > 2) {
        range.splice(1, 0, -1); // -1 será usado para renderizar "..."
      }
    }

    // Adiciona última página se não estiver no range
    if (range[range.length - 1] < totalPages) {
      if (range[range.length - 1] < totalPages - 1) {
        range.push(-1); // -1 será usado para renderizar "..."
      }
      range.push(totalPages);
    }

    return range;
  };

  return (
    <div className="flex items-center justify-center gap-2 my-12">
      {currentPage > 1 && (
        <Link
          href={`${basePath}/${currentPage - 1}`}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white/50 backdrop-blur-sm border border-purple-100 text-purple-600 hover:bg-purple-50 transition-colors"
          aria-label="Página anterior"
        >
          <ArrowLeftIcon className="size-5" />
        </Link>
      )}

      <div className="flex items-center gap-2 mx-4">
        {getPageNumbers().map((page, index) => (
          page === -1 ? (
            <span 
              key={`ellipsis-${index}`}
              className="flex items-center justify-center w-10 h-10 text-purple-600"
            >
              ...
            </span>
          ) : (
            <Link
              key={page}
              href={`${basePath}/${page}`}
              className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium transition-colors ${
                page === currentPage
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                  : 'bg-white/50 backdrop-blur-sm border border-purple-100 text-purple-600 hover:bg-purple-50'
              }`}
              aria-label={`Ir para página ${page}`}
            >
              {page}
            </Link>
          )
        ))}
      </div>

      {currentPage < totalPages && (
        <Link
          href={`${basePath}/${currentPage + 1}`}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white/50 backdrop-blur-sm border border-purple-100 text-purple-600 hover:bg-purple-50 transition-colors"
          aria-label="Próxima página"
        >
          <ArrowRightIcon className="size-5" />
        </Link>
      )}
    </div>
  );
}