import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointementsRepository from '../repositories/AppointmentRepository';
import CreateAppointementService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

const appointementsRepository = new AppointementsRepository();

appointmentsRouter.get('/', (request, response) => {
    const appointments = appointementsRepository.all();

    return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
    try {
        const {provider, data} = request.body;

        const parseDate = parseISO(data);

        const createAppointement= new CreateAppointementService(appointementsRepository);

        const appointment = createAppointement.execute({provider, data: parseDate});

        return response.json({ appointment });
    } catch(err) {
        return response.status(400).json({ error: err.message });
    }
});

export default appointmentsRouter;