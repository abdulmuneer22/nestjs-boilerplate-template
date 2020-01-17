import { Controller, Get, Post, Body, Param, Delete, UsePipes, ValidationPipe, Patch, ParseIntPipe, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/create-task.dto'
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe'
import { Task } from './tasks.entity';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';



@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) { }

    @Get()
    async getTasks(@Query(ValidationPipe) filterData: GetTasksFilterDto): Promise<Task[]> {
        return this.taskService.getTasks(filterData)
    }

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.taskService.getTaskById(id)
    }


    @Post()
    @UsePipes(ValidationPipe)
    async createTask(
        @Body() createTaskDTO: CreateTaskDTO
    ): Promise<Task> {
        return this.taskService.createTask(createTaskDTO)
    }


    @Delete('/:id')
    async deleteTask(
        @Param('id', ParseIntPipe) id: number
    ): Promise<void> {
        return this.taskService.deleteTaskById(id)
    }

    @Patch('/:id/status')
    async updateTaskStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus
    ): Promise<Task> {
        return this.taskService.updateTaskStatus(id, status)
    }
}
