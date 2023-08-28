import MovieList from '../components/movie/MovieList'

import styles from './Content.module.css'

const requests = {
  fetchNetflixOriginals: `/discover/tv?api_key=dc737cdaa9ef704368539f312d651444&with_network=123`,
  fetchTrending: `/trending/all/week?api_key=dc737cdaa9ef704368539f312d651444&language=en-US`,
  fetchTopRated: `/movie/top_rated?api_key=dc737cdaa9ef704368539f312d651444&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=dc737cdaa9ef704368539f312d651444&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=dc737cdaa9ef704368539f312d651444&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=dc737cdaa9ef704368539f312d651444&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=dc737cdaa9ef704368539f312d651444&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=dc737cdaa9ef704368539f312d651444&with_genres=99`,
  fetchSearch: `/search/movie?api_key=dc737cdaa9ef704368539f312d651444&language=en-US`,
}

function Content() {
  return (
    <div className={styles.wrapper} >
      <div>
        <MovieList origin={requests.fetchNetflixOriginals} />
      </div>
      <div>
        <h2>Xu hướng</h2>
        <MovieList request={requests.fetchTrending} />
      </div>
      <div>
        <h2>Xếp hạng cao</h2>
        <MovieList request={requests.fetchTopRated} />
      </div>
      <div>
        <h2>Hành động</h2>
        <MovieList request={requests.fetchActionMovies} />
      </div>
      <div>
        <h2>Hài</h2>
        <MovieList request={requests.fetchComedyMovies} />
      </div>
      <div>
        <h2>Kinh dị</h2>
        <MovieList request={requests.fetchHorrorMovies} />
      </div>
      <div>
        <h2>Lãng mạn</h2>
        <MovieList request={requests.fetchRomanceMovies} />
      </div>
      <div>
        <h2>Tài liệu</h2>
        <MovieList request={requests.fetchDocumentaries} />
      </div>
    </div>
  )
}

export default Content