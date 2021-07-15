const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express();

const database = {
	users: [
		{
			id: '123',
			name: 'Simba',
			password: '0621',
			email: 'simba@gmail.com',
			entries: 0,
			joined: new Date()
		},
		{
			id: '124',
			name: 'Jupiter',
			password: '1225',
			email: 'jupiter@gmail.com',
			entries: 0,
			joined: new Date()
		}
	]
}

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send(database.users);
})

app.post('/signin', (req, res) => {
	// Load hash from your password DB.
	bcrypt.compare("0112", '$2a$10$oIU816U7LmWj2zKaH4iQfunB6vGDvgMaEY3baIaL6lLW3094FWdGS', function(err, res) {
	    //console.log('1st compare:  ',res);
	});
	bcrypt.compare("veggies", '$2a$10$oIU816U7LmWj2zKaH4iQfunB6vGDvgMaEY3baIaL6lLW3094FWdGS', function(err, res) {
	    //console.log('2nd compare:  ',res);
	});
	if(req.body.email === database.users[0].email &&
		req.body.password === database.users[0].password) {
		res.json('success');
	}else{
		res.status(400).json('error logging in');
	}
})

app.post('/register', (req, res) => {
	const {email, name, password} = req.body;

	// bcrypt.hash(password, null, null, function(err, hash) {
 //    	console.log('hash:  ',hash);
	// });

	database.users.push(
		{
			id: '125',
			name: name,
			email: email,
			entries: 0,
			joined: new Date()
		}
	)
	res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req, res) => {
	const {id} = req.params;
	let found = false;
	database.users.forEach(user => {
		if(user.id === id) {
			found = true;
			return res.json(user);
		}
	})
	if(!found) {
		res.status(400).json('not found');
	}
})
app.put('/image', (req, res) => {
	const {id} = req.body;
	let found = false;
	database.users.forEach(user => {
		if(user.id === id) {
			found = true;
			user.entries++
			return res.json(user.entries);
		}
	})
	if(!found) {
		res.status(400).json('not found');
	}
})
app.listen(3001, ()=> {
	console.log('app running on port 3001');
})

/*
/ --> res = this is working
/signin : POST --> return succeess/fail
/register: POST --> return user
/profile: userId --> GET = user
/image : PUT --> return user
*/