const About = () => {
  return (
    <div className="flex items-center justify-center h-full p-4"> {/* Flexbox untuk menempatkan di tengah */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">About</h2>
        <p className="max-w-3xl text-xl">
          MOVIEPEDIA adalah aplikasi yang memungkinkan Anda mencari film terbaru dan menambahkannya ke daftar favorit Anda.
          Aplikasi ini memanfaatkan API dari TMDb untuk mengambil data film yang sedang tayang dan memudahkan Anda dalam mencari informasi tentang film favorit Anda.
        </p>
        <br />
        <p className="mt-4v text-xl">
          Dikembangkan oleh Wahib Kurniawan, student Hacktiv8 © 2024.
        </p>
      </div>
    </div>
  );
}

export default About;
