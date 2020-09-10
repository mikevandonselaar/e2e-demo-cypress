import { v4 as uuid } from "uuid";

import { TestDataManager } from "./test-data-manager";

/**
 * EntityBuilder which can be used to create entities using builder pattern using real data (or mocked data whenever that's preferred)
 *
 * NOTE: Whenever you want to use a custom function in an extending class, make sure to call that before all generic functions when calling the
 * builder.
 *
 * @param T The interface name of the return type of the entity (which can also be used for mocking)
 * @param U The interface name of the entity used as input data to create the entity in the database
 */
export abstract class EntityBuilder<T, U> {
  _mockingEnabled: boolean;
  _useGeneratedId = true;
  _buildWithGeneratedId = true;

  _idPrefix: string;
  _entityCount = 0;

  _mockedEntity: T;
  _entityToCreate: U;

  constructor(
    idPrefix: string,
    inputData: U,
    buildWithGeneratedId: boolean = true,
    mockingEnabled: boolean = false,
    mockData?: any
  ) {
    this._mockingEnabled = mockingEnabled;
    this._idPrefix = idPrefix;
    this._buildWithGeneratedId = buildWithGeneratedId;
    this._entityCount = 0;

    this._mockedEntity = { ...mockData };
    this._entityToCreate = { ...inputData };
  }

  async build(testDataManager?: TestDataManager): Promise<T> {
    return await new Promise(async (resolve) => {
      if (this._buildWithGeneratedId) {
        const generatedId = `${this.generateRandomId()}${
          this._entityCount > 1 ? `.subId=${this._entityCount}` : ""
        }`;
        this._entityToCreate = { ...this._entityToCreate, id: generatedId };
        this._mockedEntity = { ...this._mockedEntity, id: generatedId };
      }

      if (this._mockingEnabled) {
        resolve(this._mockedEntity as T);
      } else {
        this._entityCount++;

        // If there's a testDataManager supplied, it means the builders need to be used with that manager instead of the default one.
        // The default one will use AuthHeaders from localStorage, which are only present when using the builders with Cypress.
        resolve(await this.buildWithRealData(testDataManager));
      }
    });
  }

  buildSync(): T {
    if (!this._mockingEnabled) {
      throw new Error("buildSync is only supported when mocking");
    }

    return this._mockedEntity;
  }

  abstract async buildWithRealData(
    testDataManager?: TestDataManager
  ): Promise<any>;

  withProperty<P extends keyof T, V extends T[P]>(
    key: P,
    value: V
  ): EntityBuilder<T, U> {
    this._mockedEntity = { ...this._mockedEntity, ...{ [key]: value } };
    this._entityToCreate = { ...this._entityToCreate, ...{ [key]: value } };

    return this;
  }

  private generateRandomId(): string {
    return `${this._idPrefix}_${uuid()}_`;
  }
}
