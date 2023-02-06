const Router = require('express');
const router = Router();

// Model - User
const User = require('../models/User')

// Model - Favorite character
const Favorite = require('../models/Favorite')

// JWT
const jwt = require('jsonwebtoken')

// Root router -> /api
router.get('/api', (req, res) => {
    res.send('API FAN PAGE - Rick and Morty');
});

// User register
router.post('/register', async (req, res) => {
    const { name, username, email, password } = req.body;

    // Bcrypt for password

    const user = await User.findOne({ email });
    if (user) return res.status(401).send("El email se encuentra registrado");

    const nickname = await User.findOne({ username });
    if (nickname) return res.status(401).send("El nickname se encuentra registrado. Intente otro nickname");

    // New user
    const newUser = new User({ name, username, email, password });

    // Save in db
    await newUser.save();

    // Create and send token
    const token = jwt.sign({ _id: newUser._id }, 'secretKey')
    res.status(200).json({ token })

    // res.send('User register!!');
});

// User login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    // Bcrypt for password
    // Find user for email
    const user = await User.findOne({ email });
    if (!user) return res.status(401).send("El email no se encuentra registrado");
    if (user.password !== password) return res.status(401).send("Contraseña incorrecta");

    // Token 
    const token = jwt.sign({ _id: user._id }, 'secretkey')
    res.status(200).json({ token })

});

// Favorites characters
// router.post('/favorites', verifyToken, async (req, res) => {
router.post('/favorites', async (req, res) => {

    const { user } = req.body;

    const favorites = await Favorite.find({ user })
    res.send(favorites)
});

// Add favorite character
router.post('/favorites/add', async (req, res) => {
    const { id, name, image, gender, episode, status, record, comment, user } = req.body;
    console.log(req.body);

    // New favorite
    const newFavorite = new Favorite({ id, name, image, gender, episode, status, record, comment, user });

    // Save in db
    await newFavorite.save();

    // Create and send token
    // msj = "Registro exitoso"
    // res.status(200).json({ msj })
    res.status(200)
});

// Verify Token
function verifyToken(req, res, next) {
    // console.log(req.headers.authorization);
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }

    // Obtain token from header authorization
    const token = req.headers.authorization.split(' ')[1]
    if (token === null) {
        return res.status(401).send('Unauthorized request')
    }

    // Payload -> token content
    const payload = jwt.verify(token, 'secretkey');
    console.log(payload); // { _id: '63dd1bdfa59afa32a4cf3e92', iat: 1675437486 }
    req.userId = payload._id;
    next();
}

module.exports = router;