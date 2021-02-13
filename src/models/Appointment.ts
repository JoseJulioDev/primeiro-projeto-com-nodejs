import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity('appointments')
class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    provider: string;

    @Column('timestamp with time zone')
    data: Date;
}

export default Appointment;