import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import AppointementsRepository from '../repositories/AppointmentRepository';

const appointmentsRouter = Router();

const appointementsRepository = new AppointementsRepository();

appointmentsRouter.post('/', (resquest, response) => {

    const {provider, data} = resquest.body;

    const parsedDate = startOfHour(parseISO(data));

    const appointmentInSameData = appointementsRepository.findByData(parsedDate);

    if(appointmentInSameData) {
        return response.status(400).json( {message: 'This appointement is already booked!'});
    }

    const appointment = appointementsRepository.create(provider, parsedDate);

    return response.json({ appointment });
});

export default appointmentsRouter;