import 'reflect-metadata';
import {
  IReactComponent,
  inject as _inject,
  observer as _observer
} from 'mobx-react';

export * from 'mobx-react';

const StoreNamesSymbol = '@@StorePropsSymbol';

function getNamespaceValue(store: any, index: string) {
  let temp = store;
  for (const key of index.split('.')) {
    temp = temp[key];
    if (temp == undefined) {
      break;
    }
  }
  return temp;
}

function addPrefix(value: string) {
  return `@Inject-${value}`;
}

export function observer<T extends IReactComponent>(target: T): T {
  const stores: string[] = Reflect.getOwnMetadata(StoreNamesSymbol, target);
  if (stores && stores.length) {
    return _inject(store =>
      stores.reduce(
        (result, dataIndex) => ({
          [addPrefix(dataIndex)]: getNamespaceValue(store, dataIndex),
          ...result
        }),
        {}
      )
    )(_observer(target));
  }
  return target;
}

export function inject(dataIndex?: string) {
  return function(prototype: any, propertyName: string) {
    const constructor = prototype.constructor;
    const stores: string[] =
      Reflect.getOwnMetadata(StoreNamesSymbol, constructor) || [];
    if (!dataIndex) {
      dataIndex = propertyName;
    }
    Reflect.defineMetadata(
      StoreNamesSymbol,
      stores.concat(dataIndex),
      constructor
    );
    Object.defineProperty(prototype, propertyName, {
      enumerable: true,
      configurable: true,
      get() {
        return this.props[addPrefix(dataIndex!)];
      }
    });
  };
}
