import React, { useState, useEffect, useContext } from "react"
import MovieDetail from '../movie/MovieDetail'
import InputSearch from '../../../store/Input-context'

import styles from './ResultList.module.css'

function ResultList(props) {

  // keyword to search
  const [input] = useContext(InputSearch)
  //data
  const [datas, setDatas] = useState([])
  //loading,xem có data không,khi có data
  const [isLoading, setIsLoading] = useState(true)
  const [isData, setIsData] = useState(false)
  const [isList, setIsList] = useState(false)

  // xem có hiện detail k
  const [isdetailMovie, setIsDetailMovie] = useState(false)
  // detail video click
  const [detailMovie, setDetailMovie] = useState()

  useEffect(() => {
    if (input) {
      const fetchData = async () => {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${input}&api_key=dc737cdaa9ef704368539f312d651444&language=en-US`);
        const responseData = await response.json();
        //lỗi sai nếu có
        if (!responseData.results || responseData.results.length === 0) {
          setIsData(true)
          setIsList(false)
          return
        }
        setDatas(responseData.results)
        setIsLoading(false)
        setIsData(false)
        setIsList(true)

      }
      fetchData()
    } else {
      setIsLoading(false)
    }
  }, [input]);


  //sử lí data

  // sử lí ẩn hiện detail
  function handleData(data) {
    setIsDetailMovie(true)
    if (data === detailMovie) {
      setIsDetailMovie(!isdetailMovie)
      setDetailMovie(data)
    }
    if (data !== detailMovie) {
      setDetailMovie(data)
    }
  }

  return (
    <React.Fragment>
      <h2 >Search Result</h2>
      {isLoading && <p>Loading...</p>}
      {isData && <p>There are no movies for this keyword!</p>}
      {isdetailMovie ? <MovieDetail movie={detailMovie} /> : null}
      {isList && <div className={styles.wrapper}>
        {
          datas.map((data) => {
            if (data.poster_path) {
              return (
                <img
                  onClick={() => { handleData(data) }}
                  key={data.id}
                  src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
                  alt={`Movie name:           
                  ${data.name}`}
                  className={styles.img}
                />
              )
            }
          })
        }
      </div>}
    </React.Fragment>
  )
}

export default ResultList
