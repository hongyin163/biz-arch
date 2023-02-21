```js
import { message, Button } from 'biz-ux';

const info = () => {
  message.info('This is a normal message');
};

const success = () => {
  message.success('This is a success message');
};

const error = () => {
  message.error('This is an error message');
};

const warning = () => {
  message.warning('This is a warning message');
};

<div>
    <Button onClick={info}>Info</Button>
    <Button onClick={success}>Success</Button>
    <Button onClick={error}>Error</Button>
    <Button onClick={warning}>Warning</Button>
</div>
```

```js
import { message, Button } from 'biz-ux';

const success = () => {
  const hide = message.loading('Action in progress..', 0);
  // Dismiss manually and asynchronously
  setTimeout(hide, 2500);
};

<Button onClick={success}>Display a loading indicator</Button>
```
