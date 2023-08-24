const BankModel = require('../models/bank');
const accountModel = require ('../models/account')
const {validationResult} = require ('express-validator')


const listBankController = (req, res) => {
    //list all banks
    const {id} = req.params

    if(id){
        BankModel.find({_id: id}).then( banks =>{
            res.json({data: banks});
        }).catch(err =>console.log(err));
    }else{
        BankModel.find().then( banks =>{
            res.json({data: banks});
        }).catch(err =>console.log(err));
    }
  
    
}

const createBankController = (req, res) => {
    //create a bank
    
    //validation checks
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors); 
        return res.json({message: errors.array()[0].msg});
    }

    const {name, location, branch, phone, address, accountNumber} = req.body;

    const bank = new BankModel({name, location, branch, phone, address, accountNumber});

    bank.save().then ( result => {
        res.json({message: "create successful", data: result});
    }).catch(error => console.log(error));

    

}

const updateBankController = (req, res) => {
    //update all banks
    const {id, name, location, branch, phone, address, accountNumber} = req.body;
    
    BankModel.findById(id).then( bank=>{
        if(bank){
            bank.location = location;
            bank.branch = branch;
            bank.phone = phone;
            bank.address = address;
            bank.accountNumber = accountNumber;
            bank.name = name;
            
            bank.save();

            res.json({message: "update successful", data: bank});
        }

        res.json({message: "Document canot be found"});
    }).catch(err => console.log(err));
    // const updatedBank = BankModel.update({name, location, branch, phone, address, accountNumber});
    // res.json({message: "update successful", data: updatedBank});
}

const deleteBankController = (req, res) => {
    //delete all banks
    const {id} = req.body;
     BankModel.findByIdAndRemove(id).then( deletedBank =>{
        if(deletedBank){

            accountModel.deleteMany({bankId: deletedBank._id}).then(result=>{
                
                res.json({message:"bank deleted", data: deletedBank})

            }).catch(err => console.log(err))
           
            return;
        }
        res.json({message:"bank not found"})
    });
    
};


module.exports = {
    listBankController,
    updateBankController,
    createBankController,
    deleteBankController,
}