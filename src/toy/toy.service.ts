import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateToyDto } from './dto/create-toy.dto';
import { UpdateToyDto } from './dto/update-toy.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ToyService {
  db: PrismaService;

  constructor(db: PrismaService) {
    this.db = db;
  }

  async create(createToyDto: CreateToyDto) {
    return await this.db.toy.create({
      data: {
        name: createToyDto.name,
        material: createToyDto.material,
        weight: createToyDto.weight,
      },
    });
  }

  findAll() {
    return this.db.toy.findMany();
  }

  async findOne(id: number) {
    try {
      const toy = await this.db.toy.findUnique({
        where: { toyID: id },
      });
      if (!toy) {
        throw new NotFoundException(`Toy with ID ${id} not found`);
      }
      return toy;
    } catch (error) {
      console.error(error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to find toy with ID ${id}`);
    }
  }

  async update(id: number, updateToyDto: UpdateToyDto) {
    try {
      const toy = await this.db.toy.findUnique({
        where: { toyID: id },
      });
      if (!toy) {
        throw new NotFoundException(`Toy with ID ${id} not found`);
      }
      console.log(updateToyDto);
      if (Object.keys(updateToyDto).length === 0) {
        return {
          status: 'fail',
          message: `no data provided for update`,
          code: 400,
        };
      }

      const data = await this.db.toy.update({
        where: { toyID: id },
        data: {
          name: updateToyDto.name,
          material: updateToyDto.material,
          weight: updateToyDto.weight,
        },
      });
      return {
        status: 'success',
        message: `Toy with ID ${id} updated successfully`,
        data: data,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
    }
  }
  async remove(id: number) {
    try {
      const toy = await this.db.toy.findUnique({
        where: { toyID: id },
      });

      if (!toy) {
        throw new NotFoundException(`Toy with ID ${id} not found`);
      }

      await this.db.toy.delete({
        where: { toyID: id },
      });

      return {
        status: 'success',
        message: `Toy with ID ${id} deleted successfully`,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error(error);
      throw new Error(`Failed to remove toy with ID ${id}`);
    }
  }
}
