import { ReservationService } from './reservation.service';
import { CreateReservationDto, UpdateReservationDto } from './dto';
export declare class ReservationController {
    private readonly reservationService;
    constructor(reservationService: ReservationService);
    create(createReservationDto: CreateReservationDto): Promise<{
        id: number;
        objectId: number;
        userId: number;
        startDate: Date;
        endDate: Date;
        status: string;
    }>;
    findAll(): Promise<({
        object: {
            id: number;
            ownerId: number;
            title: string;
            description: string;
            imageUrl: string;
            categoryId: number;
            available: boolean;
        };
        user: {
            id: number;
            email: string;
            password: string;
            first_name: string;
            last_name: string;
            location: string;
        };
    } & {
        id: number;
        objectId: number;
        userId: number;
        startDate: Date;
        endDate: Date;
        status: string;
    })[]>;
    findOne(id: number): Promise<{
        object: {
            id: number;
            ownerId: number;
            title: string;
            description: string;
            imageUrl: string;
            categoryId: number;
            available: boolean;
        };
        user: {
            id: number;
            email: string;
            password: string;
            first_name: string;
            last_name: string;
            location: string;
        };
    } & {
        id: number;
        objectId: number;
        userId: number;
        startDate: Date;
        endDate: Date;
        status: string;
    }>;
    update(id: number, updateReservationDto: UpdateReservationDto): Promise<{
        id: number;
        objectId: number;
        userId: number;
        startDate: Date;
        endDate: Date;
        status: string;
    }>;
    remove(id: number): Promise<void>;
}
