import { expect } from 'chai'
import { findId, sleep } from './selenium'

exports.register_creds = {
    username: 'Yiqing',
    email: 'yl128@rice.edu',
    phone: '123-123-1234',
    birth: '12/12/1234',
    zipcode: '77005',
    password: '12345',
    passwordconfirmation: '12345'
}

exports.login_creds = {
    username: 'yl128test',
    password: 'heard-rice-take'
}

exports.register = () => 
    sleep(500)
    .then(findId('register_username').sendKeys(exports.register_creds.username))
    .then(findId('register_email').sendKeys(exports.register_creds.email))
    .then(findId('register_phone').sendKeys(exports.register_creds.phone))
    .then(findId('register_birth').sendKeys(exports.register_creds.birth))
    .then(findId('register_zipcode').sendKeys(exports.register_creds.zipcode))
    .then(findId('register_password').sendKeys(exports.register_creds.password))
    .then(findId('register_confirm').sendKeys(exports.register_creds.passwordconfirmation))
    .then(findId('register_button').click())
    .then(sleep(2000))

exports.login = () => 
    sleep(500)
    .then(findId('login_username').sendKeys(exports.login_creds.username))
    .then(findId('login_password').sendKeys(exports.login_creds.password))
    .then(findId('login_button_2').click())
    .then(sleep(2000))