<p align="center">
  <h1 align="center">Q2g - Ngx Custom Scrollbars</h1>
</p>

[![CodeFactor](https://www.codefactor.io/repository/github/q2g/ngx-customscrollbar/badge)](https://www.codefactor.io/repository/github/q2g/ngx-customscrollbar)
[![npm](https://img.shields.io/npm/v/ngx-customscrollbar.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/ngx-customscrollbar)
[![npm](https://img.shields.io/npm/dt/ngx-customscrollbar.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/ngx-customscrollbar)
[![npm](https://img.shields.io/npm/l/express.svg?maxAge=2592000)](/LICENSE)

Angular X Scrollbars to scroll everything.
___

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Introduction](#introduction)
  - [Viewport](#viewport)
  - [ViewportControl](#viewportcontrol)
  - [Scrollbars](#scrollbars)
- [Installation](#installation)
- [Usage](#usage)
- [Further reading](#further-reading)
- [Author](#author)
- [Credit](#credit)

<a name="introduction"/>

## Introduction
This library handles only the scrollbars, not how will be scrolled like cdk virtual scroll or how dom elements will be scrolled. There are 3 main components to solve that: 

### Viewport 

A Viewport describes a viewport which can be scroll and have dimensions ( scrolled height/width, height/width) and could be anything and is bound to a Viewport Controller. There can be as many diffrent viewports as you want, by default we have included a html viewport

### ViewportControl

The ViewportControl is the glue between the Viewport and the Scrollbars, if the viewport scrolls it will notify the viewport control which will move the scrollbars on correct position.

### Scrollbars

The scrollbars itself, bound to a ViewportControl and listen for updates. They will notify the ViewportControl if we changes the position ( Thumb drag/drop ) or scrolled a page by click on the track. They are independed of a real Viewport. This ensures we could switch the Viewport on runtime.

<a name="installation"/>

## Installation

**NPM**

```bash
npm i --save ngx-customscrollbar
```

<a name="usage"/>

## Usage

```js
import { NgxCustomScrollbarModule } from 'ngx-customscrollbar';

@NgModule({
  imports: [
    // ...
    NgxCustomScrollbarModule
  ]
})
```

If you identify any errors in the library, or have an idea for an improvement, please open an [issue](https://github.com/q2g/ngx-customscrollbar/issues) or create a pull request.

<a name="further-reading" />

## Further reading
- [Directives](https://github.com/q2g/ngx-customscrollbar/blob/master/docs/directives.md)
- [Theming](https://github.com/q2g/ngx-customscrollbar/blob/master/docs/theming.md)

<a name="author"/>

## Author
Q2g - Ralf Hannuschka [Github](https://github.com/q2g)

<a name="credit"/>

## Credit

- Inspired by ngx-scrollbar
