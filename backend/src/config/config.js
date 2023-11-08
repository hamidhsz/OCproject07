module.exports = {
    port:process.env.PORT || 8081, 
    db: {
        database: process.env.DB_NAME || 'gif-sharing',
        user: process.env.DB_USER || 'gif-sharing',  
        password: process.env.DB_PASS || 'gif-sharing',
        options: {
          dialect: process.env.DIALECT || 'sqlite',
          host: process.env.DB_HOST || 'localhost', 
          storage: process.env.DB_STORAGE_PATH || './gif-sharing.sqlite'
        }
    },

    jwt: {
      secret: process.env.JWT_SECRET || 'mysecretkey', 
      expiresIn: process.env.JWT_EXPIRES_IN || '1d'
    }

}