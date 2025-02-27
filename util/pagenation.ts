export default function generatePageButtons(currentPage: number, totalPages: number) {
    const pageNumbers = [];
    const maxPages = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxPages - 1);

    if (endPage - startPage < maxPages - 1) {
        startPage = Math.max(1, endPage - maxPages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return pageNumbers;
}