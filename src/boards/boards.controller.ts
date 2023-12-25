import { Controller } from '@nestjs/common';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
  // typescript: 접근제한자를 생성자 파라미터에 선언하면 암묵적으로 클래스 프로퍼티로 선언됨
  constructor(private boardsService: BoardsService) {}
}
