import { useState, useEffect } from 'react';

import styles from './Banner.module.css'

function Banner(props) {

  //chứa data 
  const [banner, setBanner] = useState('')
  
  //getdata
  useEffect(() => {
    const fetchNetflixOriginals = async () => {
      try {
        const response = await fetch('https://api.themoviedb.org/3/discover/tv?api_key=dc737cdaa9ef704368539f312d651444&with_network=123');
        const responseData = await response.json();
        //lỗi sai nếu có
        if (responseData.success === false) {
          throw new Error(responseData.status_message);
        }
        const newData = responseData.results
        // lấy Banner
        let i = Math.floor(Math.random() * newData.length)

        // console.log(i);
        setBanner(newData[i])
        // console.log(newData[i]);

      }
      catch (err) {
        console.log(err.message);
      }
    }
    fetchNetflixOriginals()

  }, []);

  return (
    <div
      style={{ background: `url(https://image.tmdb.org/t/p/original${banner.backdrop_path || banner.poster_path})  center ` }}
      className={styles.wrapper}
    >
      <div className={styles.detail} >
        <h1>{banner.name}</h1>
        <button>Play</button>
        <button>My List</button>
        <p>{banner.overview}</p>
      </div>
    </div>
  )
}

export default Banner