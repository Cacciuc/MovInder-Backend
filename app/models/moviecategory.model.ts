import {Table, Column, Model, HasMany, BelongsTo, ForeignKey} from 'sequelize-typescript';
import {Movie} from './movie.model';
import {Category} from './category.model';

@Table
export class MovieCategory extends Model<MovieCategory>{

    @ForeignKey(()=>Movie)
    @Column
    movieId!: number;

    @BelongsTo(()=>Movie)
    movie!: Movie;

    @ForeignKey(()=>Category)
    @Column
    categoryId!: number;

    @BelongsTo(()=>Category)
    category!: Category;


  toSimplification(): any {
    return {
      'id': this.id,
      'movieId': this.movieId,
      'categoryId': this.categoryId,
    };
  }

  fromSimplification(simplification: any): void {
    this.movieId = simplification['movieId'];
    this.categoryId = simplification['categoryId'];
  }
}
