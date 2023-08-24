const  mongoose  = require("mongoose");

const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    number:{
        type: String,
        require: true
    },
    accoutType: {
        type: String,
        require: true
    },
    bankId: {
        type: Schema.Types.ObjectId,
        ref: "Bank",
        require: true
        
    }
});

module.exports = mongoose.model('Account', AccountSchema);