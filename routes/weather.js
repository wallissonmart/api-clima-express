const router = require('express').Router()
const fetch = require('node-fetch')
require('dotenv').config()

router.get('/', (req, res) => {
    res.render('index', {
        city: null,
        des: null,
        icon: null,
        temp: null,
        hum: null
    });
});

router.post('/', async (req, res) => {
    const city = req.body.city;
    const url_api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}&lang=pt_br&units=metric`;
   
    try {
        await fetch(url_api)
            .then(res => res.json())
            .then(data => {
                if (data.message === 'Cidade não encontrada :(') {
                    res.render('index', {
                        city: data.message,
                        des: null,
                        icon: null,
                        temp: null,
                        hum: null,
                        feel: null
                    })
                } else {
                    const city = data.name;
                    const des = data.weather[0].description;
                    const icon = data.weather[0].icon;
                    const temp = data.main.temp.toFixed(0);
                    const hum = data.main.humidity;
                    const feel = data.main.feels_like.toFixed(0);

                    res.render('index', {
                        city, des, icon, temp, hum, feel
                    });
                }
            });

    } catch (err) {
        res.render('index', {
            city: 'Algo deu errado :(',
            des: null,
            icon: null,
            temp: null,
            hum: null,
            feel: null
        })
    }
})

module.exports = router