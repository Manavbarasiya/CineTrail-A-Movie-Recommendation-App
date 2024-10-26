const useGenres = (selectedGenres) => {
    if (!selectedGenres || selectedGenres.length < 1) return " ";
    const GenreIds = selectedGenres.map((g) => g.id);
    return GenreIds.join(","); // Simplified join operation
};

export default useGenres;