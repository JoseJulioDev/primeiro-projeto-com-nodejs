import {uuid} from 'uuidv4';

class Appointement {
    id: string;
    provider: string;
    data: Date;

    constructor(provider:string, data:Date) {
        this.id = uuid();
        this.provider = provider;
        this.data = data;
    }
}

export default Appointement;