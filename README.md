# react-scratchingcard

> A scratchcard component for React

[![NPM](https://img.shields.io/npm/v/react-scratchingcard.svg)](https://www.npmjs.com/package/react-scratchingcard) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


##### Original repo by Aleksik (not maintained)
https://github.com/aleksik/react-scratchcard

##### Improvement ✨
- Resize the image using width and height props (in the original repo, the image was croped)
- Smooth fade out animation on scratch complete
- Add type definition (ts)
- Change brush size through props
- Use custom brush through props
- Define a custom check zone through props

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
      <ScratchCard
        width={320}
        height={226}
        image={IMG}
        finishPercent={80}
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
| imageCrossOrigin  | ?'' \| 'anonymous' \| 'use-credentials' | 'anonymous' |
| finishPercent     | ?number         | 70          |
| brushSize         | ?number         | 20          |
| fadeOutOnComplete | ?boolean        | true        |
| onComplete        | ?callback       |             |
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



## License

MIT © [exaland](https://github.com/exaland)
