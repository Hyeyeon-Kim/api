import { DynamicModule } from '@nestjs/common';
import { ModelDefinition } from '@nestjs/mongoose';
export declare const MongoosModuleWithValidation: (models: ModelDefinition[], connectionName?: string) => DynamicModule;
