# react-scratchingcard

> A scratchcard component for React

[![NPM](https://img.shields.io/npm/v/react-scratchingcard.svg)](https://www.npmjs.com/package/react-scratchingcard) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

[![Deploy GitHub Pages](https://github.com/exaland/react-scratchingcard/actions/workflows/deploy-pages.yml/badge.svg?branch=main)](https://github.com/exaland/react-scratchingcard/actions/workflows/deploy-pages.yml)

##### Original repo by Aleksik (not maintained)
https://github.com/aleksik/react-scratchcard

##### Improvement ✨
- Resize the image using width and height props (in the original repo, the image was croped)
- Smooth fade out animation on scratch complete
- Add type definition (ts)
- Change brush size through props
- Use custom brush through props
- Define a custom check zone through props
- Add live progress callback (`onScratchProgress`)
- Add interaction callbacks (`onScratchStart`, `onScratchEnd`)
- Add programmatic controls through ref (`reveal`, `lock`, `unlock`, `getProgress`, `isRevealed`)
- Add demo page on GitHub Pages
- Fix Mobile support (touch events)

## Demo

![scratchcard-demo](https://user-images.githubusercontent.com/22329040/140519100-b6ee86e3-0009-4ab6-bcd0-c7fefdb8720d.gif)

## Install

```bash
npm install --save react-scratchingcard
```
or
```bash
yarn add react-scratchingcard
```


## Usage

```tsx
import React, { useRef }  from 'react';
import ScratchCard from 'react-scratchingcard';

import * as IMG from './img.jpg';

const App = () => {

  const ref = useRef<ScratchCard>(null);

  const onClickReset = () => {
    ref.current && ref.current.reset();
  }

  return (
    <div>
      <button onClick={onClickReset}>Reset</button>
      <button onClick={() => ref.current && ref.current.reveal()}>Reveal now</button>
      <ScratchCard
        ref={ref}
        width={320}
        height={226}
        image={IMG}
        finishPercent={80}
        onScratchProgress={(value) => console.log('progress', value)}
        onScratchStart={() => console.log('scratch start')}
        onScratchEnd={(value) => console.log('scratch end', value)}
        onComplete={() => console.log('complete')}
      >
        <div style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        >
          <h1>Scratch card</h1>
        </div>
      </ScratchCard>
    </div>
  );
};
```

### Custom brush

```tsx
const App = () => {
  return (
    <div>
      <ScratchCard
        width={320}
        height={226}
        image={IMG}
        finishPercent={80}
        customBrush={{
          image: require('./brush.img'),
          width: 15,
          height: 15
        }}
      >
        <h1>Scratch card</h1>
      </ScratchCard>
    </div>
  );
};
```

or you can use CUSTOM_BRUSH_PRESET object

```tsx
import { CUSTOM_BRUSH_PRESET } from 'react-scratchingcard';

const App = () => {
  return (
    <div>
      <ScratchCard
        width={320}
        height={226}
        image={IMG}
        finishPercent={80}
        customBrush={CUSTOM_BRUSH_PRESET}
      >
        <h1>Scratch card</h1>
      </ScratchCard>
    </div>
  )
}
```


## Type

### Props

| **name**          | **type**        | **default** |
|-------------------|-----------------|-------------|
| width             | number          |             |
| height            | number          |             |
| image             | File \| string \| {src?: string, default?: string}  |             |
| imageCrossOrigin  | ?'' \| 'anonymous' \| 'use-credentials' |             |
| finishPercent     | ?number         | 70          |
| brushSize         | ?number         | 20          |
| fadeOutOnComplete | ?boolean        | true        |
| onComplete        | ?callback       |             |
| onScratchStart    | ?callback       |             |
| onScratchEnd      | ?(percent: number) => void |             |
| onScratchProgress | ?(percent: number) => void |             |
| disabled          | ?boolean        | false       |
| customBrush       | ?CustomBrush    |             |
| customCheckZone   | ?CustomCheckZone|             |

### Remote URL

```tsx
<ScratchCard
  width={320}
  height={226}
  image='https://cdn.example.com/scratch-cover.jpg'
  imageCrossOrigin='anonymous'
>
  <h1>Scratch card</h1>
</ScratchCard>
```

Note: pour calculer le pourcentage gratté (`finishPercent`) avec une image distante, le serveur distant doit autoriser CORS.

Le composant n'impose plus CORS par defaut pour une URL distante. `imageCrossOrigin` est utile seulement si ton serveur renvoie deja les en-tetes CORS voulus.

### CustomBrush

| **name** | **type**       |
|----------|----------------|
| width    | number         |
| height   | number         |
| image    | File or Base64 |

### CustomCheckZone

| **name** | **type**       |
|----------|----------------|
| x        | number         |
| y        | number         |
| width    | number         |
| height   | number         |

### Ref methods

```tsx
const ref = useRef<ScratchCard>(null)

ref.current?.reset()
ref.current?.reveal() // reveal immediately
ref.current?.lock() // disable scratching
ref.current?.unlock() // enable scratching
ref.current?.getProgress() // current percent
ref.current?.isRevealed() // completion state
```

## License

MIT © [exaland](https://github.com/exaland)
