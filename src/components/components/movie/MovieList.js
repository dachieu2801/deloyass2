import React, { useState, useEffect } from "react"
import MovieDetail from './MovieDetail'
import ScrollContainer from 'react-indiana-drag-scroll'

import styles from './MovieList.module.css'

function MovieList(props) {
  //data
  const [datas, setDatas] = useState([])
  //mes Err
  const [errMes, setErrMes] = useState('')
  //xem data có phải origin k
  const [isOrigin, setIsOrigin] = useState(false)
  //loading
  const [isLoading, setIsLoading] = useState(true)
  //xem có hiện detail k
  const [isdetailMovie, setIsDetailMovie] = useState(false)
  //detail video click
  const [detailMovie, setDetailMovie] = useState()

  //sử lí data
  useEffect(() => {
    if (props.origin) {
      setIsOrigin(true)
    }
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3${props.request || props.origin}`);
        const responseData = await response.json();
        //lỗi sai nếu có
        if (responseData.success === false) {
          throw new Error(responseData.status_message);
        }
        const newData = responseData.results
        // console.log(newData[1]);
        setDatas(newData)
        setIsLoading(false)
      }
      catch (err) {
        // console.log(err.message);
        setErrMes(err.message)
        setIsLoading(false)
      }
    }
    fetchData()

  }, []);


  //sử lí ẩn hiện detail
  function handleData(data) {
    setIsDetailMovie(true)
    if (data === detailMovie) {
      setIsDetailMovie(!isdetailMovie)
      // setIsDetailMovie(!isdetailMovie)
      setDetailMovie(data)
    }
    if (data !== detailMovie) {
      setDetailMovie(data)
    }
  }

  // khi có lỗi
  if (errMes) {
    return (
      <div className={styles.wrapper}>
        <p>{errMes}</p>
      </div>
    )
  }
  //loading
  if (isLoading) {
    return (
      <div className={styles.wrapper}>
        <p>Loading...</p>
      </div>
    )
  }
  // nếu k có video
  if (datas.length === 0) {
    return (
      <div className={styles.wrapper}>
        <p>There are no movies for this category.</p>
      </div>
    )
  }

  //k lỗi
  if (datas.length > 0) {
    return (
      <React.Fragment>
        <ScrollContainer className={styles.wrapper} hideScrollbars='false'>
          {
            datas.map((data) => (
              <img
                onClick={() => { handleData(data) }}
                key={data.id}
                src={`https://image.tmdb.org/t/p/original${isOrigin ? data.poster_path : data.backdrop_path}`}
                alt='1'
                className={isOrigin ? styles.origin : styles.other}
              />
            ))
          }
        </ScrollContainer>
        {isdetailMovie ? <MovieDetail movie={detailMovie} /> : null}
      </React.Fragment>
    )
  }

}

export default MovieList