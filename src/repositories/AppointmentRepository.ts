import {EntityRepository, Repository} from 'typeorm';

import Appointement from '../models/Appointment';

@EntityRepository(Appointement)
class AppointementsRepository extends Repository<Appointement> {
  
    public async findByData(data:Date): Promise<Appointement | null> {
        const findAppointment = await this.findOne({
            where: data,
        });

        return findAppointment || null; 
    }

}

export default AppointementsRepository;