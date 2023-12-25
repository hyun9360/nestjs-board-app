import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board, BoardStatus } from './board.model';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
  // typescript: 접근제한자를 생성자 파라미터에 선언하면 암묵적으로 클래스 프로퍼티로 선언됨
  constructor(private boardsService: BoardsService) {}

  @Get()
  getAllBoard(): Board[] {
    return this.boardsService.getAllBoards();
  }

  @Get('/:id')
  getBoardById(@Param('id') id: string): Board {
    return this.boardsService.getBoardById(id);
  }

  @Post()
  createBoard(@Body() createBoardDto: CreateBoardDto): Board {
    return this.boardsService.createBoard(createBoardDto);
  }

  @Post(':/id/status')
  updateBoardStatus(
    @Param('id') id: string,
    @Body('status') status: BoardStatus,
  ): Board {
    return this.boardsService.updateBoardStatus(id, status);
  }

  @Delete('/:id')
  deleteBoard(@Param('id') id: string): void {
    this.boardsService.deleteBoard(id);
  }
}
