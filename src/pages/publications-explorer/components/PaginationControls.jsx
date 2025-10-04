import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Select from "../../../components/ui/Select";

const PaginationControls = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  isLoading = false,
}) => {
  const pageSizeOptions = [
    { value: 10, label: "10 per page" },
    { value: 25, label: "25 per page" },
    { value: 50, label: "50 per page" },
    { value: 100, label: "100 per page" },
  ];

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range?.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots?.push(1, "...");
    } else {
      rangeWithDots?.push(1);
    }

    rangeWithDots?.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots?.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots?.push(totalPages);
    }

    return rangeWithDots;
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  if (totalPages <= 1) return null;

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
        {/* Results Info */}
        <div className="flex items-center space-x-4">
          <div className="text-sm text-muted-foreground">
            Showing {startItem?.toLocaleString()} to {endItem?.toLocaleString()}{" "}
            of {totalItems?.toLocaleString()} publications
          </div>

          {isLoading && (
            <div className="flex items-center space-x-2">
              <Icon
                name="Loader2"
                size={16}
                className="animate-spin text-primary"
              />
              <span className="text-sm text-muted-foreground">Loading...</span>
            </div>
          )}
        </div>

        {/* Page Size Selector */}
        <div className="flex items-center space-x-4">
          <Select
            options={pageSizeOptions}
            value={itemsPerPage}
            onChange={onItemsPerPageChange}
            className="w-32"
          />
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center space-x-2">
          {/* Previous Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1 || isLoading}
            iconName="ChevronLeft"
            className="w-10 h-10"
          />

          {/* Page Numbers */}
          <div className="hidden sm:flex items-center space-x-1">
            {getVisiblePages()?.map((page, index) => (
              <React.Fragment key={index}>
                {page === "..." ? (
                  <span className="px-3 py-2 text-muted-foreground">...</span>
                ) : (
                  <Button
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => onPageChange(page)}
                    disabled={isLoading}
                    className="w-10 h-10"
                  >
                    {page}
                  </Button>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Mobile Page Info */}
          <div className="sm:hidden flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
          </div>

          {/* Next Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages || isLoading}
            iconName="ChevronRight"
            className="w-10 h-10"
          />
        </div>
      </div>
      {/* Quick Jump (Desktop Only) */}
      <div className="hidden lg:flex items-center justify-center mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Jump to page:</span>
          <div className="flex space-x-1">
            {[
              1,
              Math.ceil(totalPages / 4),
              Math.ceil(totalPages / 2),
              Math.ceil((3 * totalPages) / 4),
              totalPages,
            ]
              ?.filter(
                (page, index, arr) =>
                  page <= totalPages && arr?.indexOf(page) === index
              )
              ?.map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onPageChange(page)}
                  disabled={isLoading}
                  className="w-10 h-8 text-xs"
                >
                  {page}
                </Button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaginationControls;
