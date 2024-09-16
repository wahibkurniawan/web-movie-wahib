import { useState, useEffect } from 'react';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import FavoriteList from './components/FavoriteList';
import Pagination from './components/Pagination';
import About from './components/About';
import MovieCarousel from './components/MovieCarousel'; // Import Carousel
import "./App.css"

export default function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null); // Digunakan untuk melihat apakah Overview terbuka
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePage, setActivePage] = useState('homepage');
  const [sortOption, setSortOption] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Untuk mengontrol dropdown
  const [carouselMovies, setCarouselMovies] = useState([]); // Untuk data carousel

  // Fungsi untuk pagination
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Fungsi toggle favorite (untuk menambah/menghapus dari daftar favorite)
  const toggleFavorite = (movie) => {
    if (favorites.find((fav) => fav.id === movie.id)) {
      setFavorites(favorites.filter((fav) => fav.id !== movie.id));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  // Fetch movies for MovieList
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        let url = '';
        if (searchQuery === '') {
          url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${currentPage}&api_key=${apiKey}`;
        } else {
          url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchQuery)}&language=en-US&page=${currentPage}&api_key=${apiKey}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        setMovies(data.results);
        setTotalPages(data.total_pages);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching movies:', err);
        setError('Gagal mengambil data film.');
        setLoading(false);
      }
    };

    fetchMovies();
  }, [currentPage, searchQuery]);

  // Fetch movies for Carousel
  useEffect(() => {
    const fetchCarouselMovies = async () => {
      const apiKey = import.meta.env.VITE_TMDB_API_KEY;
      const url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();

      // Dapatkan tanggal hari ini
      const today = new Date();
      // Dapatkan tanggal 6 bulan yang lalu
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(today.getMonth() - 6);

      // Filter film berdasarkan tanggal rilis (hanya film yang dirilis dalam 6 bulan terakhir) dan rating >= 6.5
      const sortedAndFilteredMovies = data.results
        .filter((movie) => {
          const movieReleaseDate = new Date(movie.release_date);
          return movieReleaseDate >= sixMonthsAgo && movie.vote_average >= 6.5;
        })
        .sort((a, b) => {
          // Urutkan berdasarkan tanggal rilis terbaru dan rating tertinggi
          const dateA = new Date(a.release_date);
          const dateB = new Date(b.release_date);

          if (dateB - dateA !== 0) {
            // Jika tanggal rilis berbeda, urutkan berdasarkan tanggal rilis
            return dateB - dateA;
          } else {
            // Jika tanggal rilis sama, urutkan berdasarkan rating tertinggi
            return b.vote_average - a.vote_average;
          }
        });

      // Simpan hasil film yang sudah diurutkan dan difilter ke state
      setCarouselMovies(sortedAndFilteredMovies);
    };

    fetchCarouselMovies();
  }, []);



  // Handle perubahan input pencarian
  const handleSearchInput = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle saat tombol Enter ditekan
  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      setSearchQuery(searchTerm);
      setCurrentPage(1);
    }
  };

  // Fungsi untuk mengurutkan film berdasarkan opsi yang dipilih
  const handleSort = (option) => {
    setSortOption(option);
    let sortedMovies;
    if (option === 'rating') {
      sortedMovies = [...movies].sort((a, b) => b.vote_average - a.vote_average);
    } else if (option === 'release_date') {
      sortedMovies = [...movies].sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
    } else if (option === 'title') {
      sortedMovies = [...movies].sort((a, b) => a.title.localeCompare(b.title));
    }
    setMovies(sortedMovies);
  };

  return (
    <div className="container mx-auto p-3 bg-gray-900 min-h-screen text-gray-100 rounded-sm">
      <header className="flex flex-col sm:flex-row justify-between items-center py-1 my-3 bg-gray-950 text-gray-200 rounded-md">
        <button
          onClick={() => {
            // Panggil fungsi yang sama seperti tombol Home
            setSearchTerm('');   // Kosongkan input pencarian
            setSearchQuery('');  // Kosongkan query pencarian
            setSelectedMovie(null);  // Pastikan tidak ada movie yang dipilih
            setShowFavorites(false);  // Pastikan halaman favorites disembunyikan
            setShowAbout(false);  // Pastikan halaman about disembunyikan
            setActivePage('homepage');  // Kembali ke halaman Home
            setCurrentPage(1);  // Kembali ke halaman pertama
          }}
          className="text-3xl font-bold mb-4 sm:mb-0 px-4 py-2 rounded-lg bg-transparent text-gray-200 cursor-pointer hover:text-blue-600"
        >
          MOVIEPEDIA
        </button>
        {/* Tombol Hamburger untuk smartphone */}
        <div className="relative sm:hidden w-full">
          <button
            className="bg-gray-700 text-white px-4 py-2 w-full rounded-md"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            Menu
          </button>
          {isDropdownOpen && (
            <div className="absolute left-0 right-0 bg-gray-700 shadow-md rounded-lg mt-2 z-10">
              <button
                onClick={() => {
                  setSelectedMovie(null);
                  setShowFavorites(false);
                  setShowAbout(false);
                  setSearchQuery('');  // Reset search query saat Home diklik
                  setActivePage('homepage');
                }}
                className={`w-full text-left px-4 py-2 ${activePage === 'homepage' ? 'bg-gray-700  text-blue-600' : 'text-white'
                  }`}
              >
                Home
              </button>
              <button
                onClick={() => {
                  setShowFavorites(true);
                  setShowAbout(false);
                  setSelectedMovie(null);
                  setActivePage('favorites');
                  setIsDropdownOpen(false);
                }}
                className={`w-full text-left px-4 py-2 ${activePage === 'favorites' ? 'bg-gray-700  text-blue-600' : 'text-white'
                  }`}
              >
                Favorites ({favorites.length})
              </button>
              <button
                onClick={() => {
                  setShowAbout(true);
                  setShowFavorites(false);
                  setSelectedMovie(null);
                  setActivePage('about');
                  setIsDropdownOpen(false);
                }}
                className={`w-full text-left px-4 py-2 ${activePage === 'about' ? 'bg-gray-700  text-blue-600' : 'text-white'
                  }`}
              >
                About
              </button>
            </div>
          )}
        </div>

        {/* Navigasi normal untuk tablet/desktop */}
        <nav className="hidden sm:flex flex-col sm:flex-row items-center">
          <button
            onClick={() => {
              setSelectedMovie(null);
              setShowFavorites(false);
              setShowAbout(false);
              setSearchQuery('');  // Reset search query saat Home diklik
              setActivePage('homepage');
            }}
            className={`mb-2 sm:mb-0 sm:mr-4 px-3 py-1.5 rounded-lg ${activePage === 'homepage' ? 'bg-gray-700  text-blue-600' : 'border-2 text-white'
              }`}
          >
            Home
          </button>
          <button
            onClick={() => {
              setShowFavorites(true);
              setShowAbout(false);
              setSelectedMovie(null);
              setActivePage('favorites');
            }}
            className={`mb-2 sm:mb-0 sm:mr-4 px-3 py-1.5 rounded-lg ${activePage === 'favorites' ? 'bg-gray-700  text-blue-600' : 'border-2 text-white'
              }`}
          >
            Favorites ({favorites.length})
          </button>
          <button
            onClick={() => {
              setShowAbout(true);
              setShowFavorites(false);
              setSelectedMovie(null);
              setActivePage('about');
            }}
            className={`mb-2 sm:mb-0 sm:mr-4 px-3 py-1.5 rounded-lg ${activePage === 'about' ? 'bg-gray-700 text-blue-600' : 'border-2 text-white'
              }`}
          >
            About
          </button>
        </nav>
      </header>

      {/* Search Bar dan Sort hanya tampil di halaman Home dan jika tidak ada film yang dipilih */}
      {activePage === 'homepage' && !selectedMovie && (
        <div className="flex flex-col sm:flex-row justify-center items-center mb-4 space-y-2 sm:space-y-0 sm:space-x-4">
          <input
            type="text"
            placeholder="Search for a movie..."
            className="border-2 rounded-md p-2 w-full sm:max-w-md text-gray-800"
            value={searchTerm}
            onChange={handleSearchInput}
            onKeyDown={handleSearchKeyDown}
          />
          <select
            value={sortOption}
            onChange={(e) => handleSort(e.target.value)}
            className="border-2 p-2 rounded-md bg-gray-500 text-gray-200 w-full sm:w-1/6"
          >
            <option value="" disabled hidden>Sort By</option>
            <option value="rating">Rating</option>
            <option value="release_date">Release Date</option>
            <option value="title">Name</option>
          </select>
        </div>
      )}
      {/* Carousel hanya tampil di halaman Home, jika tidak ada film yang dipilih, dan jika tidak ada pencarian aktif */}
      {activePage === 'homepage' && !selectedMovie && searchQuery === '' && (
        <div className="my-6">
          <h2 className="text-2xl font-bold text-gray-200 text-left mb-4">Tranding Now</h2>
          <MovieCarousel movies={carouselMovies} setSelectedMovie={setSelectedMovie} />
        </div>
      )}
      {/* Konten Utama */}
      {loading ? (
        <div className="text-center mt-8">Loading movies...</div>
      ) : error ? (
        <div className="text-center mt-8 text-red-500">{error}</div>
      ) : showAbout ? (
        <About />
      ) : selectedMovie ? (
        <MovieDetail movie={selectedMovie} clearSelection={() => setSelectedMovie(null)} />
      ) : showFavorites ? (
        <FavoriteList
          favorites={favorites}
          setSelectedMovie={setSelectedMovie}
          toggleFavorite={toggleFavorite}
        />
      ) : activePage === 'homepage' ? (
        <>
          <MovieList
            movies={movies}
            setSelectedMovie={setSelectedMovie}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
          <Pagination
            totalPages={totalPages}
            paginate={paginate}
            currentPage={currentPage}
          />
        </>
      ) : null}

      <footer className="bg-gray-950 text-gray-200 mt-8 py-6">
        <div className="container mx-auto text-center">
<<<<<<< HEAD
          &copy; 2024 Wahib Kurniawan. All rights reserved
=======
          &copy; 2024 Wahib Kurniawan. All rights reserved.
>>>>>>> c2e146043c7fe4a7f2ed1be4a3699cbc0a64c604
        </div>
      </footer>
    </div>
  );
}
