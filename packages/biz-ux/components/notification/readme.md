```js
import { notification, Button } from 'biz-ux';

const info = (placement) => {
    console.log(placement)
    notification.info({
      message: `Notification ${placement}`,
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      placement,
    });
};

const success = (placement) => {
  notification.success({
    message: `Notification ${placement}`,
    description:
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    placement,
  });
};

const error = (placement) => {
  notification.error({
    message: `Notification ${placement}`,
    description:
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    placement,
  });
};

const warning = (placement) => {
  notification.warning({
    message: `Notification ${placement}`,
    description:
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    placement,
  });
};

<div>
    <Button onClick={info.bind(this,'topLeft')}>Info topLeft</Button>
    <Button onClick={success.bind(this,'topRight')}>Success topRight</Button>
    <Button onClick={error.bind(this,'bottomLeft')}>Error bottomLeft</Button>
    <Button onClick={warning.bind(this,'bottomRight')}>Warning bottomRight</Button>
</div>
```

```js
import { notification, Button } from 'biz-ux';

const success = () => {
  const hide = notification.loading({
     message: `Notification`,
      description:
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      duration:0
  });
  // Dismiss manually and asynchronously
  setTimeout(hide, 2500);
};

<Button onClick={success}>Display a loading indicator</Button>
```
