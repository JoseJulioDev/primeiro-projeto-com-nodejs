import Appointement from '../models/Appointment';
import {isEqual} from 'date-fns';

interface CreateAppointementDTO {
    provider:string;
    data:Date;
}

class AppointementsRepository {
    private appointments:Appointement[];

    constructor() {
        this.appointments = [];
    }

    public all(): Appointement[] {
        return this.appointments;
    }

    public findByData(data:Date): Appointement | null {
        const findAppointment = this.appointments.find( appointment => 
            isEqual(data, appointment.data)
        );

        return findAppointment || null; 
    }

    public create({provider, data}: CreateAppointementDTO): Appointement {
        const appointement = new Appointement({provider, data});
        this.appointments.push(appointement);
        return appointement;
    }

}

export default AppointementsRepository;