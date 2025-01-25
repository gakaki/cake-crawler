import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';


@Entity('brand')
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  name: string;  // WentingG or DeLuoXin

  @Column()
  @IsNotEmpty()
  @IsString()
  appId: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  kdtId: string;

  @Column('json', { nullable: true })
  itemGroups: any[];  // Store the itemGroupList from the API response

  @Column('json', { nullable: true })
  shelfConfig: any;  // Store other shelf configuration details

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}

