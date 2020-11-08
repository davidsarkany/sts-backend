import app from './app';

const PORT = process.env.PORT || "3000"


app.listen(+PORT, "0.0.0.0", (err: Error, address: string) => {
    if (err) {
        console.error(err);
        process.exit(0);
    }
    console.info(`app listening at ${address}`);
});