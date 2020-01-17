import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';



@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) {

    }

    async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
        return this.taskRepository.createTask(createTaskDTO)
    }



    async getTasks(filterData: GetTasksFilterDto): Promise<Task[]> {
        return await this.taskRepository.getTasks(filterData)
    }




    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id)
        if (!found) {
            throw new NotFoundException(`Task with id : ${id} not found`)
        }
        return found
    }



    async deleteTaskById(id: number): Promise<void> {
        let result = await this.taskRepository.delete(id)
        if (result.affected === 0) {
            throw new NotFoundException(`Task with id : ${id} not found`)
        }
    }
    async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
        let task = await this.getTaskById(id)
        task.status = status
        return await task.save()
    }
}
