const express = require('express')
const bodyparser = require('body-parser')
const path = require('path')
const app = express()

var Publishable_Key = 'pk_test_51IbNLzSElLcTnO0xyU0O0h1z0Oedr8j2eL0E1CPIH2NA2RGotJFzHt20IBRQUW91XABH2RuvWPZP3g9yprikFip500jHOT8h3d'
var Secret_Key = 'sk_test_51IbNLzSElLcTnO0xbUnc6hiDzMtgaYcqVHSrFs9U7LF6IoHmvuLmlogJ4k4NRWCsFOytd5A0mnEk79xiXoSsUKX100HZM2mjf6'

const stripe = require('stripe')('sk_test_51IbNLzSElLcTnO0xbUnc6hiDzMtgaYcqVHSrFs9U7LF6IoHmvuLmlogJ4k4NRWCsFOytd5A0mnEk79xiXoSsUKX100HZM2mjf6');
const port = process.env.PORT || 3002

app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
  
// View Engine Setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
  
app.get('/', function(req, res){
    res.render('Home', {
       key: Publishable_Key
    })
})

app.post('/payment', function(req, res){
  
    // Moreover you can take more details from user
    // like Address, Name, etc from form
    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,
        name: 'Gourav Hammad',
        address: {
            line1: 'TC 9/4 Old MES colony',
            postal_code: '452331',
            city: 'Indore',
            state: 'Madhya Pradesh',
            country: 'India',
        }
    })
    .then((customer) => {
  
        return stripe.charges.create({
            amount: 500,     // Charing Rs 25
            description: 'Web Development Product',
            currency: 'INR',
            customer: customer.id
        });
    })
    .then((charge) => {
        res.send("Success")  // If no error occurs
    })
    .catch((err) => {
        res.send(err)       // If some error occurs
    });
})
  
app.listen(port, function(error){
    if(error) throw error
    console.log("Server created Successfully")
})