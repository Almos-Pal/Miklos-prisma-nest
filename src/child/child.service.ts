import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ChildService {
  db: PrismaService;

  constructor(db: PrismaService) {
    this.db = db;
  }

  async create(createChildDto: CreateChildDto) {
    return await this.db.child.create({
      data: {
        name: createChildDto.name,
        address: createChildDto.address,
        isNaughty: createChildDto.isNaughty,
      },
    });
  }

  findAll() {
    return this.db.child.findMany({ include: { toys: true } });
  }

  async findOne(id: number) {
    try {
      const child = await this.db.child.findUnique({
        where: { childID: id },
        include: { toys: true },
      });
      if (!child) {
        throw new NotFoundException(`Child with ID ${id} not found`);
      }
      return child;
    } catch (error) {
      console.error(error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to find child with ID ${id}`);
    }
  }

  async update(id: number, updateChildDto: UpdateChildDto) {
    try {
      const child = await this.db.child.findUnique({
        where: { childID: id },
      });
      if (!child) {
        throw new NotFoundException(`Child with ID ${id} not found`);
      }
      console.log(updateChildDto);
      if (Object.keys(updateChildDto).length === 0) {
        return {
          status: 'fail',
          message: `no data provided for update`,
          code: 400,
        };
      }

      const data = await this.db.child.update({
        where: { childID: id },
        data: {
          name: updateChildDto.name,
          address: updateChildDto.address,
          isNaughty: updateChildDto.isNaughty,
        },
      });
      return {
        status: 'success',
        message: `Child with ID ${id} updated successfully`,
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
      const child = await this.db.child.findUnique({
        where: { childID: id },
      });

      if (!child) {
        throw new NotFoundException(`Child with ID ${id} not found`);
      }

      await this.db.child.delete({
        where: { childID: id },
      });

      return {
        status: 'success',
        message: `Child with ID ${id} deleted successfully`,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error(error);
      throw new Error(`Failed to remove child with ID ${id}`);
    }
  }

  async removeToyFromChild(childID: number, toyID: number) {
    try {
      const child = await this.db.child.findUnique({
        where: { childID: childID },
      });
      const toy = await this.db.toy.findUnique({
        where: { toyID: toyID },
      });

      if (!child) {
        return new NotFoundException('Child not found');
      }
      if (!toy) {
        throw new NotFoundException('Toy not found');
      }

      return await this.db.child.update({
        include: { toys: true },
        where: { childID: childID },
        data: {
          toys: {
            disconnect: { toyID: toyID },
          },
        },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error(error);
      throw new Error('Failed to delete toy from child');
    }
  }

  async putToyToChild(childID: number, toyID: number) {
    try {
      const child = await this.db.child.findUnique({
        where: { childID: childID },
      });
      const toy = await this.db.toy.findUnique({
        where: { toyID: toyID },
      });

      if (!child) {
        return new NotFoundException('Child not found');
      }
      if (!toy) {
        throw new NotFoundException('Toy not found');
      }

      return await this.db.child.update({
        include: { toys: true },
        where: { childID: childID },
        data: {
          toys: {
            connect: { toyID: toyID },
          },
        },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Let NestJS handle the 404 response automatically
      }
      console.error(error);
      throw new Error('Failed to put toy to child');
    }
  }
}
