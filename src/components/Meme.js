import React from 'react'

export default function Meme() {
	const [meme, setMeme] = React.useState({
		topText: '',
		bottomText: '',
		randomImage:
			'https://ichef.bbci.co.uk/news/976/cpsprodpb/F1F2/production/_118283916_b19c5a1f-162b-410b-8169-f58f0d153752.jpg',
	})
	const [allMemes, setAllMemes] = React.useState([])

	React.useEffect(() => {
		async function getMemes() {
			const res = await fetch('https://api.imgflip.com/get_memes')
			const data = await res.json()
			setAllMemes(data.data.memes)
		}
		getMemes()
	}, [])

	// console.log(allMemes);

	function getMemeImage() {
		const randomNumber = Math.floor(Math.random() * allMemes.length)
		const url = allMemes[randomNumber].url
		setMeme((prevMeme) => ({
			...prevMeme,
			randomImage: url,
		}))
	}

	function handleChange(event) {
		const { name, value } = event.target
		setMeme((prevMeme) => ({
			...prevMeme,
			[name]: value,
		}))
	}

	return (
		<main>
			<div className='form'>
				<input
					type='text'
					placeholder='Top text'
					className='form--input'
					name='topText'
					value={meme.topText}
					onChange={handleChange}
				/>
				<input
					type='text'
					placeholder='Bottom text'
					className='form--input'
					name='bottomText'
					value={meme.bottomText}
					onChange={handleChange}
				/>
				<button className='form--button' onClick={getMemeImage}>
					Get a new meme image 🖼
				</button>
			</div>
			<div className='meme'>
				<img src={meme.randomImage} className='meme--image' alt='random meme' />
				<h2 className='meme--text top'>{meme.topText}</h2>
				<h2 className='meme--text bottom'>{meme.bottomText}</h2>
			</div>
		</main>
	)
}
