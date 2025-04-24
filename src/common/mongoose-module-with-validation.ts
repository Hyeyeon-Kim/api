// src/common/mongoose-module-with-validation.ts
import { DynamicModule } from "@nestjs/common";
import { ModelDefinition, MongooseModule } from "@nestjs/mongoose";
import { Schema, Query, CallbackWithoutResultAndOptionalError } from "mongoose";

export const MongooseModuleWithValidation = (
  models: ModelDefinition[],
  connectionName?: string,
): DynamicModule => {
  return MongooseModule.forFeatureAsync(
    models.map((model) => ({
      name: model.name,
      useFactory: (): Schema => {
        // model.schema는 any로 들어오기 때문에 Schema로 캐스트
        const schema = model.schema as Schema;

        // update 계열 메서드가 실행될 때 runValidators 옵션을 true로 설정
        schema.pre(
          /update/i,
          function (
            this: Query<any, any>, // this를 Query로 타입 지정
            next: CallbackWithoutResultAndOptionalError, // next의 타입 지정
          ) {
            // 직접 options에 접근하지 않고, setOptions 메서드 사용
            this.setOptions({ runValidators: true });
            next();
          },
        );

        return schema; // Schema로 타입이 명확하므로 unsafe return 에러 없음
      },
    })),
    connectionName,
  );
};
