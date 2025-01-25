import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateBrandTable1706172000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "brand",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "appId",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "kdtId",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "itemGroups",
                        type: "jsonb",
                        isNullable: true
                    },
                    {
                        name: "shelfConfig",
                        type: "jsonb",
                        isNullable: true
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP"
                    },
                    {
                        name: "updatedAt",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("brand");
    }
}