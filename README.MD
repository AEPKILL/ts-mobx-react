# ts-mobx-react
React bindings for MobX, base on `mobx-react`, better TypeScript support.

# Install

```shell
npm install ts-mobx-react --save
```

# Usage

```tsx
import * as React from 'React';
import { inject, observer } from 'ts-mobx-react';

@observer
export default class Demo extends React.Component<{}, {}> {
  // store.name
  @inject() name!: string;
  // store.realAge
  @inject('realAge') age!: string;
  // store.test.test
  @inject('test.test') test!: string;
  render() {
    return (
      <div>
        {this.name}
        {this.age}
        {this.test}
      </div>
    );
  }
}
```

```tsx
import { Provider } from 'ts-mobx-react';
import { observable } from 'mobx';
import { render } from 'react-dom';

class Store {
  @observable name = 'aepkill';
  @observable realAge = 23333;
  @observable test = {
    test: 'lalala'
  }
}

const stores = new Store();
const root = document.getElementById('app');
render(
  <Provider {...stores}>
    <Demo />
  </Provider>,
  root
);

```



# Tips

I only changed the "observer" and "inject" decorator, and the other methods same as [mobx-react](https://github.com/mobxjs/mobx-react).