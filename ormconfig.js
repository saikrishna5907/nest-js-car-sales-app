var dbConfig = {
    synchronize: false,
    migrations: ['src/migration/*{.js, .ts}'],
    cli: {
        migrationsDir: 'src/migration'
    }
};
switch (process.env.NODE_ENV) {
    case 'development':
        Object.assign(dbConfig, {
            type: 'sqlite',
            database: 'db.sqlite',
            entities: ['**/*.entity.js'], // js because in development server executes from the dist folder where we have all the compiled javaScript version of typeScript file from src folder 
        })
        break;
    case 'test':
        Object.assign(dbConfig, {
            type: 'sqlite',
            database: 'test.sqlite',
            entities: ['**/*.entity.ts'], // ts because in test server executes without compiling to javaScript version of typeScript file from src folder 
        })
        break;
    case 'production':
        break;
    default:
        throw new Error('Unknown Environment')
}
console.log(dbConfig)