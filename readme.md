# fbk

> Use fbk to send feedback to someone.

## Zero-install usage

### Signup:
```bash
npx fbk signup
```

### Send feedback:
```bash
npx fbk to user2 'I think you need to go out and get some fresh air.'
```

### Read feedback:
```bash
npx fbk from user1
```

## Install

```bash
$ npm install fbk
```


## CLI

```
$ npx fbk --help
fbk

Send feedback to your peer

Commands:
  fbk from <sender>            Get feedback
  fbk                          Send feedback to your peer [default]
  fbk login                    Login to fbk
  fbk signup                   Signup for fbk
  fbk to <recipent> <message>  Send feedback

Options:
  --help     Show help                                    [boolean]
  --version  Show version number                          [boolean]```


## Development

There are 2 available commands:

- `npm run dev` - Start development mode and recompile on change
- `npm run build` - Build a final distributable for npm
