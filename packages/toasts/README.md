# @tokene/toasts
These packages aim to provide developers with a set of commonly used components for building TokenE web applications.

![version (scoped package)](https://badgen.net/npm/v/@tokene/toasts)
![types](https://badgen.net/npm/types/@tokene/toasts)
![tree-shaking](https://badgen.net/bundlephobia/tree-shaking/@tokene/toasts)
![checks](https://badgen.net/github/checks/dl-tokene/webkit/main)

## Getting Started

### Installing

```
yarn add @tokene/toasts
```

### Setup

```ts
import { ToastPlugin } from '@tokene/toasts'
import '@tokene/toasts/dist/index.css'

app.use(ToastPlugin)
```

### usage

```ts
const { showTxToast, removeToast } = useNotifications()

lastToastId.value = showTxToast('pending', txLink!)

removeToast(lastToastId.value!)
showTxToast('success', txLink!)
```

### Or

```ts
import { ToolkitBus } from '@tokene/toolkit'
import { useNotifications, type NotificationPayload } from '@tokene/toasts'

const { showToast } = useNotifications()

ToolkitBus.on(Bus.eventList.success, payload =>
  showToast('success', payload as NotificationPayload),
)
ToolkitBus.on(Bus.eventList.warning, payload =>
  showToast('error', payload as NotificationPayload),
)
ToolkitBus.on(Bus.eventList.error, payload =>
  showToast('warning', payload as NotificationPayload),
)
ToolkitBus.on(Bus.eventList.info, payload =>
  showToast('info', payload as NotificationPayload),
)
ToolkitBus.on(Bus.eventList.default, payload =>
  showToast('default', payload as NotificationPayload),
)
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](../../LICENSE) file for details
