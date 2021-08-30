"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Express Import
var express_1 = __importDefault(require("express"));
var api_util_1 = require("./Utils/api.util");
// imports para DEBUGS
var debug_1 = require("./Utils/debug");
/// Enviroments
var env_production_1 = __importDefault(require("./environments/env.production"));
var request_var = require('request');
var request_var2 = require('request');
var crypto = require('crypto');
console.log("text 2");
var color = debug_1.COLOR();
var app = express_1.default();
var apiutils = api_util_1.APIUtils(env_production_1.default);
var debug = debug_1.DEBUG();
app.get('/', function (req, resp) {
    var baseUrl = 'http://gateway.marvel.com/v1/public/comics';
    var query = "?limit=20";
    var timestamp = new Date().getTime();
    var hash = crypto.createHash('md5').update(timestamp + env_production_1.default.APIMARVEL.privateKey + env_production_1.default.APIMARVEL.publicKey).digest('hex');
    var auth = "&ts=" + timestamp + "&apikey=" + env_production_1.default.APIMARVEL.publicKey + "&hash=" + hash;
    var url = "" + baseUrl + query + auth;
    console.log(url);
    request_var.get({
        url: url,
        json: true,
        headers: { 'User-Agent': 'request' }
    }, function (error, response, data) {
        if (error) {
            console.log('Error:', error);
            //res.send(error);
        }
        else if (response.statusCode !== 200) {
            console.log('Error', response.body);
            //res.status(response.statusCode).send(response.body);
        }
        else {
            /*console.log("coolx");
            console.log("error");
            console.log(error);*/
            console.log("-------------------------------------------------------------------------------------------------");
            console.log("-------------------------------------------------------------------------------------------------");
            console.log("-------------------------------------------------------------------------------------------------reponse");
            console.log("-------------------------------------------------------------------------------------------------");
            console.log("-------------------------------------------------------------------------------------------------");
            //console.log(response);
            console.log("------------------------------------------------------------------------------------------data");
            console.log(response.headers.date);
            console.log(data);
            console.log(data.data.results);
            //res.send(data.data);
        }
    });
    resp.status(200).json({ ok: true, msg: "Prueba del asi" });
});
app.get('/marvel/colaborators/:hero', function (req, resp) {
    /// obtener  info del  
    var baseUrl = env_production_1.default.APIMARVEL.baseUrl + "characters";
    var query = "?name=" + req.params.hero;
    var timestamp = new Date().getTime();
    var hash = crypto.createHash('md5').update(timestamp + env_production_1.default.APIMARVEL.privateKey + env_production_1.default.APIMARVEL.publicKey).digest('hex');
    var auth = "&ts=" + timestamp + "&apikey=" + env_production_1.default.APIMARVEL.publicKey + "&hash=" + hash;
    var url = "" + baseUrl + query + auth;
    var idPersonaje;
    request_var.get({
        url: url,
        json: true,
        headers: { 'User-Agent': 'request' }
    }, function (error, response, data) {
        if (error) {
            console.log('Error:cola', error);
            //res.send(error);
        }
        else if (response.statusCode !== 200) {
            console.log('Errorcola', response.body);
            //res.status(response.statusCode).send(response.body);
        }
        else {
            console.log(response.headers.date);
            console.log(data.data.results);
            var resultado = data.data.results;
            idPersonaje = data.data.results[0].id;
            console.log(idPersonaje);
            var baseUrl2 = env_production_1.default.APIMARVEL.baseUrl + "comics";
            var query2 = "?characters=" + idPersonaje;
            var url2 = "" + baseUrl2 + query2 + auth;
            request_var2.get({
                url: url2,
                json: true,
                headers: { 'User-Agent': 'request' }
            }, function (error, response, data) {
                if (error) {
                    console.log('Error:cola', error);
                    //res.send(error);
                }
                else if (response.statusCode !== 200) {
                    console.log('Errorcola', response.body);
                    //res.status(response.statusCode).send(response.body);
                }
                else {
                    console.log("-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-");
                    console.log("-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-");
                    console.log("-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-");
                    console.log("-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-");
                    console.log("-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-");
                    console.log(response.headers.date);
                    console.log(data.data.results);
                    var arrayEditor_1 = [];
                    var arrayWriters_1 = [];
                    var arrayColorists_1 = [];
                    data.data.results.forEach(function (element) {
                        element.creators.items.forEach(function (e) {
                            switch (e.role) {
                                case "writer":
                                    arrayWriters_1.push(e.name);
                                    break;
                                case "colorist":
                                    arrayColorists_1.push(e.name);
                                    break;
                                case "editor":
                                    arrayEditor_1.push(e.name);
                                    break;
                                default:
                                    //Declaraciones ejecutadas cuando ninguno de los valores coincide con el valor de la expresión
                                    break;
                            }
                        });
                    });
                    var estruc = { last_sync: "Fecha de la última sincronización en dd/mm/yyyy hh:mm:ss",
                        editors: arrayEditor_1,
                        writers: arrayWriters_1,
                        colorists: arrayColorists_1
                    };
                    resp.status(200).json(estruc);
                }
            });
            //https://gateway.marvel.com:443/v1/public/comics?characters=1011334&apikey=01be4e765c84b931aa17125c38ab4c0f
            //res.send(data.data);
        }
    });
});
app.get('/marvel/characters/:hero', function (req, resp) {
    /// obtener  info del  
    var baseUrl = env_production_1.default.APIMARVEL.baseUrl + "characters";
    var query = "?name=" + req.params.hero;
    var timestamp = new Date().getTime();
    var hash = crypto.createHash('md5').update(timestamp + env_production_1.default.APIMARVEL.privateKey + env_production_1.default.APIMARVEL.publicKey).digest('hex');
    var auth = "&ts=" + timestamp + "&apikey=" + env_production_1.default.APIMARVEL.publicKey + "&hash=" + hash;
    var url = "" + baseUrl + query + auth;
    var idPersonaje;
    request_var.get({
        url: url,
        json: true,
        headers: { 'User-Agent': 'request' }
    }, function (error, response, data) {
        if (error) {
            console.log('Error:cola', error);
            //res.send(error);
        }
        else if (response.statusCode !== 200) {
            console.log('Errorcola', response.body);
            //res.status(response.statusCode).send(response.body);
        }
        else {
            console.log(response.headers.date);
            console.log(data.data.results);
            var resultado = data.data.results;
            idPersonaje = data.data.results[0].id;
            console.log(idPersonaje);
            var baseUrl2 = env_production_1.default.APIMARVEL.baseUrl + "comics";
            var query2 = "?sharedAppearances=" + idPersonaje;
            var url2 = "" + baseUrl2 + query2 + auth;
            request_var2.get({
                url: url2,
                json: true,
                headers: { 'User-Agent': 'request' }
            }, function (error, response, data) {
                if (error) {
                    console.log('Error:cola', error);
                    //res.send(error);
                }
                else if (response.statusCode !== 200) {
                    console.log('Errorcola', response.body);
                    //res.status(response.statusCode).send(response.body);
                }
                else {
                    console.log("-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-");
                    console.log("-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-");
                    console.log("-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-");
                    console.log("-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-");
                    console.log("-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-");
                    console.log(response.headers.date);
                    console.log(data.data.results);
                    var arrayEditor_2 = [];
                    data.data.results.forEach(function (element) {
                        element.creators.items.forEach(function (e) {
                            switch (e.role) {
                                case "writer":
                                    arrayEditor_2.push(e.name);
                                    break;
                                default:
                                    break;
                            }
                        });
                    });
                    var estruc = { last_sync: "Fecha de la última sincronización en dd/mm/yyyy hh:mm:ss",
                        characters: arrayEditor_2,
                    };
                    resp.status(200).json(estruc);
                }
            });
            //https://gateway.marvel.com:443/v1/public/comics?characters=1011334&apikey=01be4e765c84b931aa17125c38ab4c0f
            //res.send(data.data);
        }
    });
});
app.listen(env_production_1.default.API.PORT, function () {
    debug.express("prueba de texto y debug " + color.express('EXPRE$SS') + " en el puerto " + color.success(env_production_1.default.API.PORT));
});
