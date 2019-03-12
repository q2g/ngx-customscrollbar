<p align="center">
  <h1 align="center">Q2g - Ngx Custom Scrollbars</h1>
</p>

[![npm](https://img.shields.io/npm/v/ngx-customscrollbar.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/ngx-scrollbar)
[![npm](https://img.shields.io/npm/dt/ngx-customscrollbar.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/ngx-scrollbar)
[![npm](https://img.shields.io/npm/l/express.svg?maxAge=2592000)](/LICENSE)

some description goes here
___

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Installation](#installation)
- [Usage](#usage)
- [Vertical Scrollbar](#vertical-scrollbar)
- [Horizontal Scrollbar](#horizontal-scrollbar)
- [Directives](#directives)
  - [ngxCustomScrollbarScrollable](#ngxcustomscrollbarscrollable)
  - [ngxCustomScrollbarOverflowAutoY](#ngxcustomscrollbaroverflowautoy)
  - [ngxCustomScrollbarOverflowAutoX](#ngxcustomscrollbaroverflowautox)
- [Author](#author)
- [Credit](#credit)

<a name="installation"/>

## Installation

**NPM**

```bash
npm i --save ngx-customscrollbar
```

<a name="usage"/>

## Usage

Import `NgxCustomScrollbarModule` in your module

```js
import { NgxCustomScrollbarModule } from 'ngx-customscrollbar';

@NgModule({
  imports: [
    // ...
    NgxCustomScrollbarModule
  ]
})
```

## Vertical Scrollbar

Component
```ts
import { Component } from '@angular/core';
import { ViewportControl } from 'ngx-customscrollbar';

@Component({
    selector: 'app-vertical-scroll',
    templateUrl: 'vertical-scroll.component.html',
    styleUrls: ['./vertical-scroll.component.scss'],
    viewProviders: [ViewportControl]
})
export class VerticalScrollComponent {
    // generate array with 300 items
    public items: Array<string | number> = 
        Array.from({ length: 300 }, (val, index) => index);
}
```

Template
```html
<div class="scrollWrapper">
  <div class="scrollView" ngxCustomScrollbarScrollable>
    <div *ngFor="let item of items">Lorem Ipsum {{item}}</div>
  </div>
  <ngx-customscrollbar></ngx-customscrollbar>
</div>
```

SCSS
```scss
.scrollWrapper {
  display: flex;
  flex-direction: row;
  height: 500px;
  overflow: hidden;

  .scrollView {
    flex: 1;
    overflow-y: auto;

    /** disable scrollbar design global */
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }
  }
}
```

## Horizontal Scrollbar

Component
```ts
import { Component } from '@angular/core';
import { ViewportControl } from 'ngx-customscrollbar';

@Component({
    selector: 'app-vertical-scroll',
    templateUrl: 'vertical-scroll.component.html',
    styleUrls: ['./vertical-scroll.component.scss'],
    viewProviders: [ViewportControl]
})
export class VerticalScrollComponent {
    public items: Array<string | number> = 
        Array.from({ length: 20 }, (val, index) => index);
}
```

Template
```html
<div class="scrollWrapper">
  <div class="scrollView" ngxCustomScrollbarScrollable>
    <div *ngFor="let item of items">Lorem Ipsum {{item}}</div>
  </div>
  <ngx-customscrollbar [scrollDirection]="horizontal"></ngx-customscrollbar>
</div>
```

SCSS
```scss
.scrollWrapper {
  display: flex;
  flex-direction: row;
  height: 500px;
  overflow: hidden;

  .scrollView {
    flex: 1;
    overflow-x: auto;

    /** disable native scrollbar visibility */
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }

    > div {
        white-space: nowrap;
        width: 4000px;
        display: flex;
        justify-content: space-between;

        &:after {
            content: "end of scroll";
        }
    }
  }
}
```

<a name="styling"/>

## Directives

### ngxCustomScrollbarScrollable

Wraps the html element into a HtmlScrollViewport and registered on ViewportControl. If Dom changes or element scrolls native, scrollbars will be updated.

```html
<div class="scrollViewport" ngxCustomScrollbarScrollable>
    ...
</div>
<ngx-customscrollbar></ngx-customscrollbar>
```

### ngxCustomScrollbarOverflowAutoY

show / hides a scrollbar if overflow on x axis exists, if value is set to false
scrollbar will allways be visible.

```html
<ngx-customscrollbar *ngxCustomScrollbarOverflowAutoY="true"></ngx-customscrollbar>
```

### ngxCustomScrollbarOverflowAutoX

show / hides a scrollbar if overflow on x axis exists, if value is set to false
scrollbar will allways be visible.

```html
<ngx-customscrollbar [scrollDirection]="horizontal" *ngxCustomScrollbarOverflowAutoX="true"></ngx-customscrollbar>
```

If you identify any errors in the library, or have an idea for an improvement, please open an [issue](https://github.com/q2g/ngx-customscrollbar/issues) or create a pull request.

<a name="author"/>

## Author
Q2g - Ralf Hannuschka [Github](https://github.com/q2g)

<a name="credit"/>

## Credit

- Inspired by ngx-scrollbar
