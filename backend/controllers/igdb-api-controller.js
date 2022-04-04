const axios = require("axios");

const BASE_URL = "https://api.igdb.com/v4";

const getPopularGames = async (req, res) => {
	let accessToken;

	// Get access token
	await axios.post('https://id.twitch.tv/oauth2/token?client_id=wud75t3ykfbkz3me3av3xpo4k4gwqq&client_secret=0aybt9z20bbjb2seyhylg66ea136ue&grant_type=client_credentials')
	.then(response => {
		accessToken = response.data.access_token;
	})
	.catch(err => {
		console.log(err);
	});

	// Get name, cover, genres
	// Get popular games' id
	let games = [];
	await axios({
		url: BASE_URL + "/games",
		method: 'POST',
		headers: {
				'Accept': 'application/json',
				'Client-ID': 'wud75t3ykfbkz3me3av3xpo4k4gwqq',
				'Authorization': 'Bearer ' + accessToken,
		},
		data: 'fields name, cover, genres; where genres != null & cover != null & rating > 75; limit 20;'
	})
	.then(response => {
		games = response.data;
	})
	.catch(err => {
		console.error(err);
	});

	for (let i = 0; i < games.length; i++) {
		// Get image id (for cover)
		await axios({
			url: BASE_URL + "/covers",
			method: 'POST',
			headers: {
					'Accept': 'application/json',
					'Client-ID': 'wud75t3ykfbkz3me3av3xpo4k4gwqq',
					'Authorization': 'Bearer ' + accessToken,
			},
			data: `fields image_id; where id = ${games[i].cover};`
		})
		.then(response => {
			games[i].cover = response.data[0].image_id;
		})
		.catch(err => {
			console.error(err);
		});

		let genres_title = [];

		await axios({
			url: BASE_URL + "/genres",
			method: 'POST',
			headers: {
					'Accept': 'application/json',
					'Client-ID': 'wud75t3ykfbkz3me3av3xpo4k4gwqq',
					'Authorization': 'Bearer ' + accessToken,
			},
			data: `fields name; where id = (${games[i].genres});`
		})
		.then(response => {
			response.data.forEach(genre => {
				genres_title.push(genre.name);
			});

			games[i].genres = genres_title;
		})
		.catch(err => {
			console.error(err);
		});
	}

	res.send(games);
}

const getGameInfo = async (req, res) => {
	let accessToken, gameInfo, genres_title = [], platforms = [];

	// Get access token
	await axios.post('https://id.twitch.tv/oauth2/token?client_id=wud75t3ykfbkz3me3av3xpo4k4gwqq&client_secret=0aybt9z20bbjb2seyhylg66ea136ue&grant_type=client_credentials')
	.then(response => {
		accessToken = response.data.access_token;
	})
	.catch(err => {
		console.log(err);
	});

	// Get name, release date, genre, platform, version, summary
	await axios({
		url: BASE_URL + "/games",
		method: 'POST',
		headers: {
				'Accept': 'application/json',
				'Client-ID': 'wud75t3ykfbkz3me3av3xpo4k4gwqq',
				'Authorization': 'Bearer ' + accessToken,
		},
		data: `fields name, cover, first_release_date, genres, platforms, version_title, summary; where id = ${req.params.gid};`
	})
	.then(response => {
		gameInfo = response.data[0];
	})
	.catch(err => {
		console.error(err);
	});

	// Get genres title
	await axios({
		url: BASE_URL + "/genres",
		method: 'POST',
		headers: {
				'Accept': 'application/json',
				'Client-ID': 'wud75t3ykfbkz3me3av3xpo4k4gwqq',
				'Authorization': 'Bearer ' + accessToken,
		},
		data: `fields name; where id = (${gameInfo.genres});`
	})
	.then(response => {
		response.data.forEach(genre => {
			genres_title.push(genre.name);
		});

		gameInfo.genres = genres_title;
	})
	.catch(err => {
		console.error(err);
	});

	// Get platforms title
	await axios({
		url: BASE_URL + "/platforms",
		method: 'POST',
		headers: {
				'Accept': 'application/json',
				'Client-ID': 'wud75t3ykfbkz3me3av3xpo4k4gwqq',
				'Authorization': 'Bearer ' + accessToken,
		},
		data: `fields name; where id = (${gameInfo.platforms});`
	})
	.then(response => {
		response.data.forEach(platform => {
			platforms.push(platform.name);
		});

		gameInfo.platforms = platforms;
	})
	.catch(err => {
		console.error(err);
	});

	// Get cover id
	await axios({
		url: BASE_URL + "/covers",
		method: 'POST',
		headers: {
				'Accept': 'application/json',
				'Client-ID': 'wud75t3ykfbkz3me3av3xpo4k4gwqq',
				'Authorization': 'Bearer ' + accessToken,
		},
		data: `fields image_id; where id = ${gameInfo.cover};`
	})
	.then(response => {
		gameInfo.cover = response.data[0].image_id;
	})
	.catch(err => {
		console.error(err);
	});
	
	res.send(gameInfo);
}

module.exports = { getPopularGames, getGameInfo }