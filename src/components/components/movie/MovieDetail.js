import { useState, useEffect } from "react"

import styles from './MovieDetail.module.css'

function MovieDetail(props) {
  // const [data, setData] = useState([])
  const [keyYoutobe, setKeyYoutobe] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  // xem hiện ytb hay backdrop
  const [isYoutb, setIsYoutb] = useState(false)

  //chứa data của movie mà đã click
  const detailMobie = props.movie

  // console.log(detailMobie);
  useEffect(() => {
    const fetchDetail = async () => {

      const response = await fetch(`https://api.themoviedb.org/3/movie/${props.movie.id}/videos?api_key=dc737cdaa9ef704368539f312d651444`);
      const responseData = await response.json();

      const datas = responseData.results
      // xét t.h movie hợp lệ
      //movie có dữ liệu
      if (datas && datas.length > 0) {
        // xử lí xem có đủ điều kiện đẻ lấy video youtube không 
        //lọc lấy các movie có site = youtobe
        const movies = datas.filter((data) => data.site === 'YouTube')
        if (movies) {
          let movie = movies.find(mv => mv.type = 'Trailer')
          // nếu có trailer
          if (movie) {
            setIsYoutb(true)
            setKeyYoutobe(movie.key)
          } else { //nếu không thì tìm Teasser
            movie = movies.find(mv => mv.type = 'Teaser')
            //nếu có Teaser
            if (movie) {
              setIsYoutb(true)
              setKeyYoutobe(movie.key)
            } else {
              //nếu không có movie nào type là trailer hoặc Teaser
              setIsYoutb(false)
            }
          }
        } else {
          setIsLoading(false)
        }
        //data k phù hợp
      } else {
        setIsYoutb(false)
      }
      setIsLoading(false)
    }
    fetchDetail()
  }, [props.movie.id]);

  //thẻ youtobr
  const youTube = <iframe width="100%" height="400"
    src={`https://www.youtube.com/embed/${keyYoutobe}`}>
  </iframe>

  //thẻ img backdrop
  const backdrop = <img src={`https://image.tmdb.org/t/p/original${detailMobie.backdrop_path || detailMobie.poster_path}`} />
  //loading
  if (isLoading) {
    return (
      <div className={styles.load}>
        <p>Loading...</p>
      </div>
    )
  }

  //good job
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h1>{detailMobie.title || detailMobie.name}</h1>
        <div className={styles.detail}>
          <p><b>Release Date: {detailMobie['release_date'] ? detailMobie['release_date'] : detailMobie['first_air_date']}</b></p>
          <p><b>Vote: {detailMobie.vote_average} / 10</b></p>
        </div>
        <p>{detailMobie.overview}</p>
      </div>
      {/* nếu đủ d.k thì lấy YTB*/}
      {isYoutb ? youTube : backdrop}
    </div >
  )
}

export default MovieDetail