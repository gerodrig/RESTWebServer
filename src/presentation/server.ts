import express, { Router } from 'express';
import path from 'path';

interface Options {
    port: number;
    routes: Router;
    public_path?: string;
}

export class Server {
    public readonly app = express();
    private serverListener?: any;
    private readonly port: number;
    private readonly routes: Router;
    private readonly publicPath: string;


    constructor({port, routes, public_path = 'public'}: Options){

        this.port = port;
        this.routes = routes;
        this.publicPath = public_path;
    }

    async start(){
        
        //* Middlewares
        this.app.use(express.json()); //raw json
        this.app.use(express.urlencoded({extended: true})); //form data x

        //* Public folder
        this.app.use(express.static(this.publicPath));

        //* Routes
        this.app.use(this.routes);
       

        //* SPA
        this.app.get('*', (req, res) => {
            const indexPath  = path.join(__dirname, `../../${this.publicPath}/index.html`);
            res.sendFile(indexPath);
            return;
        });

        this.serverListener = this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }

    public close(){
        this.serverListener.close();
    }
}