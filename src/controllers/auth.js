const express = require("express");
const bcrypt = require("bcrypt");
const { Account } = require("../models");
const {accountSignUp, accountSignIn } = require('../validators/account')
const {getMessage} = require('../helpers/validator');

const {generateJwt, generateRefreshJwt } = require('../helpers/jwt');

const router = express.Router();

const saltRounds = 10;

router.get("/sign-in", accountSignIn, async (req, res) => {
  const {email, password } = req.body;
  const account = await Account.findOne({ where: { email }})

  //validar senha
  const match = account ? bcrypt.compareSync(password, account.password) : null ;
  if(!match)  res.jsonBadRequest(null, getMessage('account.signin.invalid'))
  
  return res.json(null);
});


router.get("/sign-up", accountSignUp, async (req, res) => {
  /* desestruturação desse bloco de codigo
  const body = req.body;
  const email =  body.email;
  const password = body.password; */

  const { email, password } = req.body;

  const account = await Account.findOne({ where: { email }})
  if(account)return res.jsonBadRequest(null, getMessage('account.signup.email_exists'));
  
  const hash = bcrypt.hashSync(password, saltRounds);
  const newAccount = await Account.create({ email, password: hash });
  
  const token = generateJwt(
    {
      id: newAccount.id
    }
  )

  const refreshToken = generateRefreshJwt(
    {
      id: newAccount.id
    }
  )

  return res.jsonOK(newAccount, getMessage('account.signup.success'), { token, refreshToken });
});

module.exports = router;
