import Appointement from '../models/Appointment';
import AppointementsRepository from '../repositories/AppointmentRepository';
import { startOfHour} from 'date-fns';

interface Request {
    provider: string;
    data: Date;
}

class CreateAppointementService {
    private appointementsRepository: AppointementsRepository;

    constructor(appointementsRepository: AppointementsRepository) {
        this.appointementsRepository = appointementsRepository;
    }

    public execute({provider, data}: Request): Appointement {
        const appointementDate = startOfHour(data);

        const appointmentInSameData = this.appointementsRepository.findByData(appointementDate);

        if(appointmentInSameData) {
            throw Error('This appointement is already booked!');
        }

        const appointment = this.appointementsRepository.create( {
            provider, 
            data: appointementDate,
        });

        return appointment;
    }
}

export default CreateAppointementService;