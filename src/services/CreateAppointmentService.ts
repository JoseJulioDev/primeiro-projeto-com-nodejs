import { startOfHour} from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointement from '../models/Appointment';
import AppointementsRepository from '../repositories/AppointmentRepository';

interface Request {
    provider: string;
    data: Date;
}

class CreateAppointementService {
    
    public async execute({provider, data}: Request): Promise<Appointement> {
        const appointementsRepository = getCustomRepository(AppointementsRepository);
        
        const appointementDate = startOfHour(data);

        const appointmentInSameData = await appointementsRepository.findByData(appointementDate);

        if(appointmentInSameData) {
            throw Error('This appointement is already booked!');
        }

        const appointment = appointementsRepository.create( {
            provider, 
            data: appointementDate,
        });

        await appointementsRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointementService;