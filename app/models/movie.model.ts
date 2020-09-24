import {Table, Column, Model, HasMany, BelongsTo, ForeignKey} from 'sequelize-typescript';
import {MovieCategory} from './moviecategory.model';

@Table
export class Movie extends Model<Movie>{

    @HasMany(()=>MovieCategory)
    categories!: MovieCategory[];

    @Column
    name!: string;

    @Column
    description!: string;

    @Column
    image!: string;


  toSimplification(): any {
    return {
      'id': this.id,
      'name': this.name,
      'description': this.description,
      'image': this.image,
    };
  }

  fromSimplification(simplification: any): void {
    this.name = simplification['name'];
    this.description = simplification['description'];
    this.image = simplification['image'];
  }
}
