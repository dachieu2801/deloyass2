import React from 'react';
import NavBar from '../../components/components/NavBar/NavBar'
import SearchForm from '../../components/components/SearchForm/SearchForm'
import ResultList from '../../components/components/ResultList/ResultList'
import InputProvider from '../../store/Input-provider'

import styles from './Search.module.css'


const a = `/discover/tv?api_key=dc737cdaa9ef704368539f312d651444&with_network=123`
const Search = () => {
	return (
		<InputProvider>
			<div className={styles.app}>
				<NavBar />
				<div className={styles.form}>
					<SearchForm />
				</div>
				<div className={styles.search}>
					<ResultList />
				</div>
			</div>
		</InputProvider>
	);
};

export default Search;
