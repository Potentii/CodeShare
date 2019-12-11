import 'setimmediate'
import winston from 'winston'



const env = process.env.NODE_ENV;


const log = winston.createLogger({
   level: setLevel(env),
   format: winston.format.json(),
   defaultMeta: { service: 'default-logger' },
   exitOnError: false,
   transports: setTransports(env)
});



function setLevel(env){
   switch(env){
   case 'production':  return 'error';
   default:            return 'debug';
   }
}



function setTransports(env){
   switch(process.env.NODE_ENV){
   case 'production':
      return [
         // TODO fix the environments
         new winston.transports.Console({ format: winston.format.json() })
         // TODO add a stream to a log server
      ];
   default:
      return [
         new winston.transports.Console({ format: winston.format.json() })
      ];
   }
}



export default log;
