import {
  DataSource,
  DeepPartial,
  DeleteResult,
  FindOptionsWhere,
  ObjectLiteral,
  ObjectType,
  Repository,
  UpdateResult,
} from 'typeorm';

export class RepositoryService<T extends ObjectLiteral> {
  protected repo: Repository<T>;

  constructor(
    protected readonly dataSource: DataSource,
    protected readonly entity: ObjectType<T>,
  ) {
    this.repo = dataSource.getRepository(entity);
  }

  async createOne(dto: DeepPartial<T>): Promise<T> {
    const entity = this.repo.create(dto);
    return await this.repo.save(entity);
  }

  async findByKey<K extends keyof T>(key: K, value: T[K]): Promise<T | null> {
    return await this.repo.findOne({
      where: { [key]: value } as FindOptionsWhere<T>,
    });
  }

  async findAllByKey<K extends keyof T>(
    key: K,
    value: T[K],
  ): Promise<T[] | null> {
    return await this.repo.find({
      where: { [key]: value } as FindOptionsWhere<T>,
    });
  }

  async updateOne(
    criteria: Partial<T>,
    partial: Partial<T>,
  ): Promise<UpdateResult> {
    return this.repo.update(criteria, partial);
  }

  async deleteOne(criteria: Partial<T>): Promise<DeleteResult> {
    return this.repo.delete(criteria);
  }
}
