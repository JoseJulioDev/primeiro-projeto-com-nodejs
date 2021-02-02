import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import Appointement from '../models/Appointment';

const appointmentsRouter = Router();

const appointments : Appointement[] = [];

appointmentsRouter.post('/', (resquest, response) => {

    const {provider, data} = resquest.body;

    const parsedDate = startOfHour(parseISO(data));

    const appointmentInSameData = appointments.find( appointment => 
        isEqual(parsedDate, appointment.data), {

        }
    );

    if(appointmentInSameData) {
        return response.status(400).json( {message: 'This appointement is already booked!'});
    }

    const appointment = new Appointement(provider, parsedDate);

    appointments.push(appointment);

    return response.json({ appointment });
});

export default appointmentsRouter;