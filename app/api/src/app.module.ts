import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './modules/movies/movies.module';
@Module({
imports: [
ConfigModule.forRoot({
isGlobal: true,
envFilePath: '.env',
}),
HttpModule,
MoviesModule,
],
controllers: [AppController],
providers: [AppService],
})
export class AppModule {}