import app from './app';
import startDB from './database';



async function main() {
    await app.listen(app.get('port'));
    console.log('Server Running')

    startDB()
}
main()