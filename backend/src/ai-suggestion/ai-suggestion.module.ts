import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'; // ✅ Import HttpModule
import { AISuggestionController } from './controller/ai-suggestion.controller';
import { AISuggestionService } from './service/ai-suggestion.service';

@Module({
  imports: [HttpModule], // ✅ Add HttpModule here
  controllers: [AISuggestionController],
  providers: [AISuggestionService],
})
export class AISuggestionModule {}
