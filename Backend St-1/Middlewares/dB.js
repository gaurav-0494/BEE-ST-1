const config = require('config');
const mongoose = require('mongoose');

const uri = config.get("DB_String");

exports.connectToDb = () => {

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> console.log(`Database connect ho gaya`))
.catch(()=> console.log(`GGWP`))

}
