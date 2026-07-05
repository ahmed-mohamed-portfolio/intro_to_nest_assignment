import { HydratedDocument, Model, PopulateOptions } from 'mongoose';
import { IUser } from '../../common/interfaces';
import { Injectable } from '@nestjs/common';

type Select = string | Record<string, 0 | 1>;

type Options = {
  populate?: PopulateOptions | PopulateOptions[];
  sort?: any;
  skip?: number;
  limit?: number;
  lean?: boolean;
  session?: any;
};

@Injectable()
export class DatabaseRepository<TRawDocs> {
  constructor(protected readonly model: Model<TRawDocs>) {}

  private applyQueryOptions(
    query: any,
    select?: Select,
    options: Options = {},
  ) {
    if (select) {
      query.select(select);
    }

    if (options.populate) {
      query.populate(options.populate);
    }

    if (options.sort) {
      query.sort(options.sort);
    }

    if (options.skip !== undefined) {
      query.skip(options.skip);
    }

    if (options.limit !== undefined) {
      query.limit(options.limit);
    }

    if (options.lean) {
      query.lean();
    }

    if (options.session) {
      query.session(options.session);
    }

    return query;
  }

  create(data: Partial<TRawDocs>): Promise<HydratedDocument<TRawDocs>> {
    return this.model.create(data);
  }

  insertOne(data: Partial<TRawDocs>, options: Options = {}) {
    const doc = new this.model(data);

    return doc.save(options);
  }

  insertMany(data: Partial<TRawDocs>[] = [], options: Options = {}) {
    return this.model.insertMany(data, options);
  }

  findOne(
    filter: Partial<TRawDocs> = {},
    select?: Select,
    options: Options = {},
  ) {
    const query = this.model.findOne(filter, null, options);

    return this.applyQueryOptions(query, select, options);
  }

  findone(
    filter: Partial<TRawDocs> = {},
    select?: Select,
    populate?: PopulateOptions | PopulateOptions[],
  ) {
    return this.findOne(filter, select, { populate });
  }

  find(filter: Partial<TRawDocs> = {}, select?: Select, options: Options = {}) {
    const query = this.model.find(filter, null, options);

    return this.applyQueryOptions(query, select, options);
  }

  findById(id: string, select?: Select, options: Options = {}) {
    const query = this.model.findById(id, null, options);

    return this.applyQueryOptions(query, select, options);
  }

  updateOne(
    filter: Partial<TRawDocs> = {},
    data: Partial<TRawDocs> = {},
    options: Options = {},
  ) {
    return this.model.updateOne(filter, data, options);
  }

  updateMany(
    filter: Partial<TRawDocs> = {},
    data: Partial<TRawDocs> = {},
    options: Options = {},
  ) {
    return this.model.updateMany(filter, data, options);
  }

  findOneAndUpdate(
    filter: Partial<TRawDocs> = {},
    data: Partial<TRawDocs> = {},
    select?: Select,
    options: Options = {},
  ) {
    const query = this.model.findOneAndUpdate(filter, data, options);

    return this.applyQueryOptions(query, select, options);
  }

  findByIdAndUpdate(
    id: string,
    data: Partial<TRawDocs> = {},
    select?: Select,
    options: Options = {},
  ) {
    const query = this.model.findByIdAndUpdate(id, data, options);

    return this.applyQueryOptions(query, select, options);
  }

  deleteOne(filter: Partial<TRawDocs> = {}, options: Options = {}) {
    return this.model.deleteOne(filter, options);
  }

  deleteMany(filter: Partial<TRawDocs> = {}, options: Options = {}) {
    return this.model.deleteMany(filter, options);
  }

  findOneAndDelete(
    filter: Partial<TRawDocs> = {},
    select?: Select,
    options: Options = {},
  ) {
    const query = this.model.findOneAndDelete(filter, options);

    return this.applyQueryOptions(query, select, options);
  }

  findByIdAndDelete(id: string, select?: Select, options: Options = {}) {
    const query = this.model.findByIdAndDelete(id, options);

    return this.applyQueryOptions(query, select, options);
  }

  countDocuments(filter: Partial<TRawDocs> = {}, options: Options = {}) {
    return this.model.countDocuments(filter, options);
  }

  exists(filter: Partial<TRawDocs> = {}) {
    return this.model.exists(filter);
  }
}
