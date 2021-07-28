const clarifai =  require('clarifai');

const app = new Clarifai.App({
 apiKey: '7944ea3a4d1744539ca18a6f69c49630'
});

const handleApiCall = (req, res) => {
	app.models
		.predict('e466caa0619f444ab97497640cefc4dc', req.body.input)
		.then(data => {
		  res.json(data);	
		})
		.catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
	const {id} = req.body;
	db('users').where('id', '=', id)
  	.increment('entries', 1)
  	.returning('entries')
  	.then(entries => res.json(entries[0]))
  	.catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
  handleImage
  handleApiCall
}