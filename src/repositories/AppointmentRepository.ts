import Appointement from '../models/Appointment';
import {isEqual} from 'date-fns';

class AppointementsRepository {
    private appointments:Appointement[];

    constructor() {
        this.appointments = [];
    }

    public findByData(data:Date): Appointement | null {
        const findAppointment = this.appointments.find( appointment => 
            isEqual(data, appointment.data)
        );

        return findAppointment || null; 
    }

    public create(provider:string, data:Date): Appointement {
        const appointement = new Appointement(provider, data);
        this.appointments.push(appointement);
        return appointement;
    }

}

export default AppointementsRepository;