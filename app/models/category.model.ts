import {Table, Column, Model, HasMany, BelongsTo, ForeignKey} from 'sequelize-typescript';
import {MovieCategory} from './moviecategory.model';

@Table
export class Category extends Model<Category>{
    @HasMany(()=>MovieCategory)
    categories!: MovieCategory[];

    @Column
    name!: string;

    toSimplification(): any {
        return {
          'id': this.id,
          'name': this.name,
        };
      }

      fromSimplification(simplification: any): void {
        this.name = simplification['name'];
      }

}