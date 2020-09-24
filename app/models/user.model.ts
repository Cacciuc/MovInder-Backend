import {Table, Column, Model, HasMany, BelongsTo, ForeignKey} from 'sequelize-typescript';
import {MovieUser} from './movieuser.model';

@Table
export class User extends Model<User> {
  @HasMany(()=>MovieUser)
  movieUsers!: MovieUser[];

  @Column
  name!: string;

  @Column
  password!: string;

  @Column
  salt!: string;

  @Column
  email!: string;



  toSimplification(): any {
    return {
      'id': this.id,
      'name': this.name,
      'password': this.password,
      'salt': this.salt,
      'email': this.email,
    };
  }

  fromSimplification(simplification: any): void {
    this.name = simplification['name'];
    this.password = simplification['password'];
    this.salt = simplification['salt'];
    this.email = simplification['email'];
  }

}
