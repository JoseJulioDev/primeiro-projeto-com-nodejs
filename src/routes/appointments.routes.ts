import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import AppointementsRepository from '../repositories/AppointmentRepository';

const appointmentsRouter = Router();

const appointementsRepository = new AppointementsRepository();

appointmentsRouter.get('/', (request, response) => {
    const appointments = appointementsRepository.all();

    return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {

    const {provider, data} = request.body;

    const parsedDate = startOfHour(parseISO(data));

    const appointmentInSameData = appointementsRepository.findByData(parsedDate);

    if(appointmentInSameData) {
        return response.status(400).json( {message: 'This appointement is already booked!'});
    }

    const appointment = appointementsRepository.create( {
        provider, 
        data: parsedDate,
    });

    return response.json({ appointment });
});

export default appointmentsRouter;