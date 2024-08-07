import { Body, Controller, Get, Param, Post, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Messages')
@Controller('messages')
export class MessageController {
    constructor(private readonly messageService: MessageService) {}

    @UseGuards(AuthGuard('jwt'))
    @Post()
    create(@Body() createMessageDto: CreateMessageDto) {
        return this.messageService.create(createMessageDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('send')
    async sendMessage(@Body() createMessageDto: CreateMessageDto, @Req() req) {
        const userId = req.user.userId;
        createMessageDto.sentById = userId;
        return await this.messageService.create(createMessageDto);
    }

    @Get()
    findAll() {
        return this.messageService.findAll();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('received')
    findAllReceived(@Req() req) {
        const userId = req.user.userId;
        return this.messageService.findAllConversationsByUserId(userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('conversation/:conversationId')
    findAllMessagesInConversation(@Param('conversationId', ParseIntPipe) conversationId: number) {
        return this.messageService.findMessagesInConversation(conversationId);
    }


}
