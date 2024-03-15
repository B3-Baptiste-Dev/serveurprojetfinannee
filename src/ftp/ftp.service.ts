// src/ftp/ftp.service.ts
import { Injectable } from '@nestjs/common';
import * as ftp from 'basic-ftp';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FtpService {
  constructor(private configService: ConfigService) {}

  async uploadFile(localFilePath: string, remoteFileName: string): Promise<void> {
    const client = new ftp.Client();
    client.ftp.verbose = true;
    try {
      await client.access({
        host: this.configService.get('FTP_HOST'),
        user: this.configService.get('FTP_USER'),
        password: this.configService.get('FTP_PASSWORD'),
        secure: false,
      });
      await client.uploadFrom(localFilePath, remoteFileName);
      console.log("Fichier uploadé avec succès sur le serveur FTP");
    } catch (error) {
      console.error("Erreur lors de l'upload FTP:", error);
    }
    client.close();
  }
}
