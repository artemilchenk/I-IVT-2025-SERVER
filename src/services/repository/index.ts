import {
  DataSource,
  DeepPartial,
  ObjectLiteral,
  Repository,
  UpdateResult,
} from 'typeorm';

export class RepositoryService<T extends ObjectLiteral> {
  protected repo: Repository<T>;

  constructor(
    protected readonly dataSource: DataSource,
    protected readonly entity: { new (): T },
  ) {
    this.repo = dataSource.getRepository(entity);
  }

  async createOne(dto: DeepPartial<T>): Promise<T> {
    const entity = this.repo.create(dto);
    return await this.repo.save(entity);
  }

  async findByKey<K extends keyof T>(key: K, value: T[K]): Promise<T | null> {
    return await this.repo.findOne({
      where: { [key]: value } as any,
    });
  }

  async updateOne(
    criteria: Partial<T>,
    partial: Partial<T>,
  ): Promise<UpdateResult> {
    return this.repo.update(criteria, partial);
  }
}
