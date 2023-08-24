const express = require ('express')
const {body} = require ('express-validator')
const {listBankController,createBankController,updateBankController,deleteBankController} = require ('../controllers/banks');
const isAuth = require('../middlewares/ia-auth');
const BankModel = require('../models/bank');
const router = express.Router();


//routes
// view bank - get method
router.get('/banks/:id?',isAuth ,listBankController);
//create bank - post method
router.post('/banks',isAuth,[
    body('name').trim().not().isEmpty().withMessage('Provide a name please'),
    body('location').trim().not().isEmpty().withMessage('Provide a location please'),
    body('branch').trim().not().isEmpty().withMessage('Provide a branch please'),
    body('phone').isMobilePhone('en-GH')
   

    .custom((value, {req})=>{
        return BankModel.findOne({'phone': value})
        .then(
            bankDoc => {
                if(bankDoc)
                return Promise.reject('phone number already taken');
            }
        )
    })
],createBankController);
//update bank - put method
router.put('/bank',isAuth,updateBankController);
//delete bank - delete method
router.delete('/bank',isAuth ,deleteBankController);



module.exports = router;