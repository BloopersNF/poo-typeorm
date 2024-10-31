import { Repository, EntityTarget, DeepPartial } from "typeorm";
import { AppDataSource } from "../data-source"; // Importe o seu DataSource

export class BaseRepo<T> {
    protected repository: Repository<T>;

    constructor(entity: EntityTarget<T>) {
        this.repository = AppDataSource.getRepository(entity);
    }

    async findById(id: number): Promise<T | null> {
        // @ts-ignore
        return this.repository.findOne({ where: { id } });
    }

    async findAll(): Promise<T[]> {
        return this.repository.find();
    }

    async create(entityData: DeepPartial<T>): Promise<T> {
        const entity = this.repository.create(entityData);
        return this.repository.save(entity);
    }

    async update(id: number, entityData: DeepPartial<T>): Promise<T | null> {
        const entity = await this.findById(id);
        if (entity) {
            this.repository.merge(entity, entityData);
            return this.repository.save(entity);
        }
        return null;
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}
