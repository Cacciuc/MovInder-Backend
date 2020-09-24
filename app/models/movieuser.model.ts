import {Table, Column, Model, HasMany, BelongsTo, ForeignKey} from 'sequelize-typescript';
import {Movie} from './movie.model';
import {User} from './user.model';

@Table
export class MovieUser extends Model<MovieUser> {

    @ForeignKey(()=>User)
    @Column
    userId!: number;

    @BelongsTo(()=>User)
    user!: User;

    @ForeignKey(()=>Movie)
    @Column
    movieId!: number;

    @BelongsTo(()=>Movie)
    movie!: Movie;

    @Column
    like!: boolean;




  toSimplification(): any {
    return {
      'id': this.id,
      'userId': this.userId,
      'movieId': this.movieId,
    };
  }

  fromSimplification(simplification: any): void {
    this.userId = simplification['userId'];
    this.movieId = simplification['movieId'];
  }
}
