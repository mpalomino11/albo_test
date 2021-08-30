// Express Import
import Express, { request } from 'express'
import {Request,Response} from 'express'
import { APIUtils } from './Utils/api.util';
// imports para DEBUGS
import {DEBUG,COLOR} from './Utils/debug'

/// Enviroments
import ENV from './environments/env.production'

const request_var = require('request')
const request_var2 = require('request')
const crypto = require('crypto');



console.log("text 2");

const color=COLOR();
const app = Express();
const apiutils=APIUtils(ENV)
const debug=DEBUG();


app.get('/',(req:Request,resp:Response)=>{
    const baseUrl = 'http://gateway.marvel.com/v1/public/comics';

    const query = `?limit=20`;

    const timestamp = new Date().getTime();
    const hash = crypto.createHash('md5').update(timestamp + ENV.APIMARVEL.privateKey + ENV.APIMARVEL.publicKey).digest('hex');
    const auth = `&ts=${timestamp}&apikey=${ENV.APIMARVEL.publicKey}&hash=${hash}`;

    const url = `${baseUrl}${query}${auth}`;

    console.log(url);
    
    request_var.get({
        url: url,
        json: true,
        headers: {'User-Agent': 'request'}
      }, (error:any, response:any, data:any) => {
        if (error) {
          console.log('Error:', error);
          //res.send(error);
        } else if (response.statusCode !== 200) {
          console.log('Error', response.body);
          //res.status(response.statusCode).send(response.body);
        } else {
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

    resp.status(200).json({ok:true,msg:"Prueba del asi"})
});

app.get('/marvel/colaborators/:hero',(req:Request,resp:Response)=>{
    
     /// obtener  info del  
    const baseUrl= ENV.APIMARVEL.baseUrl+"characters"
    const query = `?name=${req.params.hero}`;
    const timestamp = new Date().getTime();
    const hash = crypto.createHash('md5').update(timestamp + ENV.APIMARVEL.privateKey + ENV.APIMARVEL.publicKey).digest('hex');
    const auth = `&ts=${timestamp}&apikey=${ENV.APIMARVEL.publicKey}&hash=${hash}`;
    const url = `${baseUrl}${query}${auth}`;

    var idPersonaje: any

    request_var.get({
        url: url,
        json: true,
        headers: {'User-Agent': 'request'}
      }, (error:any, response:any, data:any) => {
        if (error) {
          console.log('Error:cola', error);
          //res.send(error);
        } else if (response.statusCode !== 200) {
          console.log('Errorcola', response.body);
          //res.status(response.statusCode).send(response.body);
        } else {
            console.log(response.headers.date);
            console.log(data.data.results);
            let resultado=data.data.results
            idPersonaje=data.data.results[0].id
            console.log(idPersonaje);
            let baseUrl2= ENV.APIMARVEL.baseUrl+"comics"
            let query2 = `?characters=${idPersonaje}`;
            let url2 = `${baseUrl2}${query2}${auth}`;

            request_var2.get({
              url: url2,
              json: true,
              headers: {'User-Agent': 'request'}
            }, (error:any, response:any, data:any) => {
                if (error) {
                  console.log('Error:cola', error);
                  //res.send(error);
                } else if (response.statusCode !== 200) {
                  console.log('Errorcola', response.body);
                  //res.status(response.statusCode).send(response.body);
                } else {
                  console.log("-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-");
                  console.log("-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-");
                  console.log("-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-");
                  console.log("-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-");
                  console.log("-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-");
                  console.log(response.headers.date);
                  console.log(data.data.results);

                  let arrayEditor:any[]=[]
                  let arrayWriters:any[]=[]
                  let arrayColorists:any[]=[]

                  data.data.results.forEach((element:any) => {
                      element.creators.items.forEach((e:any) => {
                          switch (e.role) {
                            case "writer":
                              arrayWriters.push(e.name)
                              break;
                            case "colorist":
                              arrayColorists.push(e.name)
                              break;
                            case "editor":
                              arrayEditor.push(e.name)
                              break;
                            default:
                              //Declaraciones ejecutadas cuando ninguno de los valores coincide con el valor de la expresión
                              break;
                          }
                      });
                  });
                  var estruc = { last_sync: "Fecha de la última sincronización en dd/mm/yyyy hh:mm:ss", 
                  editors : arrayEditor,
                  writers : arrayWriters,
                  colorists : arrayColorists
                  };
                  resp.status(200).json(estruc)

                }
            });
            
            //https://gateway.marvel.com:443/v1/public/comics?characters=1011334&apikey=01be4e765c84b931aa17125c38ab4c0f

            //res.send(data.data);
        }
      })
    
});

app.get('/marvel/characters/:hero',(req:Request,resp:Response)=>{

     /// obtener  info del  
     const baseUrl= ENV.APIMARVEL.baseUrl+"characters"
     const query = `?name=${req.params.hero}`;
     const timestamp = new Date().getTime();
     const hash = crypto.createHash('md5').update(timestamp + ENV.APIMARVEL.privateKey + ENV.APIMARVEL.publicKey).digest('hex');
     const auth = `&ts=${timestamp}&apikey=${ENV.APIMARVEL.publicKey}&hash=${hash}`;
     const url = `${baseUrl}${query}${auth}`;
 
     var idPersonaje: any
 
     request_var.get({
         url: url,
         json: true,
         headers: {'User-Agent': 'request'}
       }, (error:any, response:any, data:any) => {
         if (error) {
           console.log('Error:cola', error);
           //res.send(error);
         } else if (response.statusCode !== 200) {
           console.log('Errorcola', response.body);
           //res.status(response.statusCode).send(response.body);
         } else {
             console.log(response.headers.date);
             console.log(data.data.results);
             let resultado=data.data.results
             idPersonaje=data.data.results[0].id
             console.log(idPersonaje);
             let baseUrl2= ENV.APIMARVEL.baseUrl+"comics"
             let query2 = `?sharedAppearances=${idPersonaje}`;
             let url2 = `${baseUrl2}${query2}${auth}`;
 
             request_var2.get({
               url: url2,
               json: true,
               headers: {'User-Agent': 'request'}
             }, (error:any, response:any, data:any) => {
                 if (error) {
                   console.log('Error:cola', error);
                   //res.send(error);
                 } else if (response.statusCode !== 200) {
                   console.log('Errorcola', response.body);
                   //res.status(response.statusCode).send(response.body);
                 } else {
                   console.log("-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-");
                   console.log("-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-");
                   console.log("-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-");
                   console.log("-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-");
                   console.log("-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-");
                   console.log(response.headers.date);
                   console.log(data.data.results);
 
                   let arrayEditor:any[]=[]
 
                   data.data.results.forEach((element:any) => {
                       element.creators.items.forEach((e:any) => {
                           switch (e.role) {
                             case "writer":
                              arrayEditor.push(e.name)
                               break;
                             default:
                               break;
                           }
                       });
                   });
                   var estruc = { last_sync: "Fecha de la última sincronización en dd/mm/yyyy hh:mm:ss", 
                   characters : arrayEditor,
                   };
                   resp.status(200).json(estruc)
 
                 }
             });
             
             //https://gateway.marvel.com:443/v1/public/comics?characters=1011334&apikey=01be4e765c84b931aa17125c38ab4c0f
 
             //res.send(data.data);
         }
       })
     
});

app.listen(ENV.API.PORT,()=>{
    debug.express(`prueba de texto y debug ${color.express('EXPRE$SS')} en el puerto ${color.success(ENV.API.PORT)}`)
})
