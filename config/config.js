module.exports = {
    dbConfig : {
      remoteUrl : process.env.DB_URL,
      devUrl: {
                  host: 'localhost', // 'localhost' is the default;
                  port: 5432, // 5432 is the default;
                  database: 'wosdb',
                  user: 'wilson',
                  password: 'password-1'
                 },
      testUrl: {
                  host: 'localhost', // 'localhost' is the default;
                  port: 5432, // 5432 is the default;
                  database: 'wostestdb',
                  user: 'wilson',
                  password: 'password-1'
                 }      
    },
    jwt_secret: 'wilson',

    awsConfig:{
      accessKeyId: "Your Access key",
      secretAccessKey: "your secret key",
      region:"Your aws region"
    }    
};
