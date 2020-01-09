require('dotenv').config()

// import dependencies that you want to use
const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const logger = require('morgan');

// use sendgrid
// daftar akun di https://sendgrid.com/ untuk dapatkan API key nya
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_KEY);

// use module
app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Server is running on port ' + port)
})


app.post('/email', async(req, res) => {
    const { email, subject } = req.body
    const number = '82321321'
    // configuration inbox sendgrid
    const msg = {
        to: email,
        from: 'rinoboy84@gmail.com ',
        subject: subject,
        // text: 'reset password',
        html: `<strong>https://cobasendgrit.com/resetpassword?code=${number}</strong>`,
    };

    // send email with sendgrid
    await sgMail.send(msg)
    .then(()=>{
        res.status(200).json({
        status: 200,
        error: false,
        message: 'Successfully send email',
        data: req.body
    })
    })
})

app.get('*', function(req, res){
    console.log('someone access 404')
    res.send('404 Not Found!')
})
