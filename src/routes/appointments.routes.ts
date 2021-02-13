import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointementsRepository from '../repositories/AppointmentRepository';
import CreateAppointementService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (request, response) => {
    const appointementsRepository = getCustomRepository(AppointementsRepository);
    const appointments = await appointementsRepository.find();

    return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
    try {
        const {provider, data} = request.body;

        const parseDate = parseISO(data);

        const createAppointement= new CreateAppointementService();

        const appointment = await createAppointement.execute({provider, data: parseDate});

        return response.json({ appointment });
    } catch(err) {
        return response.status(400).json({ error: err.message });
    }
});

export default appointmentsRouter;