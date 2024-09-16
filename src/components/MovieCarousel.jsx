import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Komponen Tombol Panah Kiri (background transparan)
const PrevArrow = ({ onClick }) => {
  return (
    <button
      className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-transparent text-white p-4 z-10 focus:outline-none shadow-lg hover:bg-gray-700 hover:bg-opacity-40"
      style={{ left: '10px', fontSize: '25px', height: '50px', width: '50px' }} // Tombol dengan latar belakang transparan
      onClick={onClick}
    >
      &#8249;
    </button>
  );
};

// Komponen Tombol Panah Kanan (background transparan)
const NextArrow = ({ onClick }) => {
  return (
    <button
      className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-transparent text-white p-4 z-10 focus:outline-none shadow-lg hover:bg-gray-700 hover:bg-opacity-40"
      style={{ right: '10px', fontSize: '25px', height: '50px', width: '50px' }} // Tombol dengan latar belakang transparan
      onClick={onClick}
    >
      &#8250;
    </button>
  );
};

const MovieCarousel = ({ movies }) => {
  const settings = {
    dots: true, // Menampilkan titik navigasi di bawah carousel
    infinite: true, // Membuat carousel berputar tanpa batas
    speed: 600, // Kecepatan transisi antar slide
    slidesToShow: 3, // Menampilkan 3 poster secara bersamaan di layar besar
    slidesToScroll: 1, // Scroll hanya 1 poster setiap kali geser
    autoplay: true, // Mengaktifkan autoplay
    autoplaySpeed: 4000, // Setiap 4 detik poster berubah
    responsive: [
      {
        breakpoint: 1024, // Layar tablet dan desktop
        settings: {
          slidesToShow: 2, // Tampilkan 2 poster pada ukuran tablet
        },
      },
      {
        breakpoint: 600, // Layar smartphone
        settings: {
          slidesToShow: 1, // Tampilkan 1 poster pada ukuran kecil
        },
      },
    ],
    nextArrow: <NextArrow />, // Menggunakan tombol panah kanan dengan background transparan
    prevArrow: <PrevArrow />, // Menggunakan tombol panah kiri dengan background transparan
  };

  return (
    <div className="relative mb-8 px-4 md:px-8 lg:px-16 overflow-hidden">
      <Slider {...settings}>
        {movies.map((movie) => (
          <div key={movie.id} className="px-2">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // Mengambil poster film dari API
              alt={movie.title}
              className="w-full h-auto object-cover" // Gambar poster menyesuaikan lebar
            />
             <div className="text-center mt-2">
              <h3 className="text-lg font-semibold text-gray-100">{movie.title}</h3>
              <p className="text-sm text-center"><i>Release Date : </i>{movie.release_date}</p>
              <p className="text-sm text-gray-400">Rating: {movie.vote_average.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MovieCarousel;
