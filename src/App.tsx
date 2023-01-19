import React, { useState } from 'react';
import { url } from './model';
import { IBaseService } from './services/BaseService';
import './App.css';

function App() {
	const [inputValue, setInputValue] = useState<string>('');
	const [shortLink, setShortLink] = useState<url[]>([]);

	const formSubmit = (e: any) => {
		e.preventDefault();
		let baseService = new IBaseService();
		baseService.getAll(inputValue).then((data) => {
			setShortLink([
				...shortLink,
				{
					original_link: data.original_link,
					short_link: data.short_link,
				},
			]);
		});
		setInputValue('');
	};

	console.log(shortLink);

	const copyShortLink = (url: string) => {
		navigator.clipboard.writeText(url);
		console.log('coppy text');
	};

	return (
		<div className="wrapper">
			<form onSubmit={(e) => formSubmit(e)}>
				<input value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Shorten a link here" />
				<button>Shorten it!</button>
			</form>
			<div className="list">
				{shortLink?.map((item: any, index: number) => (
					<div key={index}>
						<a href={item.shortLink}>{item.short_link}</a>
						<button onClick={() => copyShortLink(item.short_link)}>Copy</button>
					</div>
				))}
			</div>
		</div>
	);
}
export default App;
