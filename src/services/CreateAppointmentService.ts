import { startOfHour} from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointement from '../models/Appointment';
import AppointementsRepository from '../repositories/AppointmentRepository';

import AppError from '../errors/AppError';

interface Request {
    provider_id: string;
    data: Date;
}

class CreateAppointementService {
    
    public async execute({provider_id, data}: Request): Promise<Appointement> {
        const appointementsRepository = getCustomRepository(AppointementsRepository);
        
        const appointementDate = startOfHour(data);

        const appointmentInSameData = await appointementsRepository.findByData(appointementDate);

        if(appointmentInSameData) {
            throw new AppError('This appointement is already booked!');
        }

        const appointment = appointementsRepository.create( {
            provider_id, 
            data: appointementDate,
        });

        await appointementsRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointementService;