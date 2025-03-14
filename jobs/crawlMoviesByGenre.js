const MovieService = require("../services/MovieService");

const genres = [
    { name: "Hành Động", slug: "hanh-dong" },
    { name: "Miền Tây", slug: "mien-tay" },
    { name: "Trẻ Em", slug: "tre-em" },
    { name: "Lịch Sử", slug: "lich-su" },
    { name: "Cổ Trang", slug: "co-trang" },
    { name: "Chiến Tranh", slug: "chien-tranh" },
    { name: "Viễn Tưởng", slug: "vien-tuong" },
    { name: "Kinh Dị", slug: "kinh-di" },
    { name: "Tài Liệu", slug: "tai-lieu" },
    { name: "Bí Ẩn", slug: "bi-an" },
    { name: "Phim 18+", slug: "phim-18" },
    { name: "Tình Cảm", slug: "tinh-cam" },
    { name: "Tâm Lý", slug: "tam-ly" },
    { name: "Thể Thao", slug: "the-thao" },
    { name: "Phiêu Lưu", slug: "phieu-luu" },
    { name: "Âm Nhạc", slug: "am-nhac" },
    { name: "Gia Đình", slug: "gia-dinh" },
    { name: "Học Đường", slug: "hoc-duong" },
    { name: "Hài Hước", slug: "hai-huoc" },
    { name: "Hình Sự", slug: "hinh-su" },
    { name: "Võ Thuật", slug: "vo-thuat" },
    { name: "Khoa Học", slug: "khoa-hoc" },
    { name: "Thần Thoại", slug: "than-thoai" },
    { name: "Chính Kịch", slug: "chinh-kich" },
    { name: "Kinh Điển", slug: "kinh-dien" }
];

const crawlMoviesByGenre = async () => {
    console.log("🚀 Crawling movies by genre...");
    try {
        for (const genre of genres) {
            console.log(`🔍 Crawling genre: ${genre.slug}`);
            const movies = await MovieService.fetchMoviesGenres({ type_list: genre.slug });
            await MovieService.saveMovies(movies);
        }
        console.log("✅ Successfully crawled movies by genre!");
    } catch (error) {
        console.error("❌ Error in crawlMoviesByGenre:", error.message);
    }
};

module.exports = crawlMoviesByGenre;
