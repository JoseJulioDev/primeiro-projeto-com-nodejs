import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointementsRepository from '../repositories/AppointmentRepository';
import CreateAppointementService from '../services/CreateAppointmentService';
import ensureAuthenticated from '../middleware/ensureAuthenticated';

const appointmentsRouter = Router();

// aply middleware in all routers appointments
appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
    const appointementsRepository = getCustomRepository(AppointementsRepository);
    const appointments = await appointementsRepository.find();

    return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
    const {provider_id, data} = request.body;

    const parseDate = parseISO(data);

    const createAppointement= new CreateAppointementService();

    const appointment = await createAppointement.execute({provider_id, data: parseDate});

    return response.json({ appointment });
});

export default appointmentsRouter;
