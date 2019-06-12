# Ngx-CustomScrollbars

[![CodeFactor](https://www.codefactor.io/repository/github/q2g/ngx-customscrollbar/badge)](https://www.codefactor.io/repository/github/q2g/ngx-customscrollbar)
[![npm](https://img.shields.io/npm/v/ngx-customscrollbar.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/ngx-customscrollbar)
[![npm](https://img.shields.io/npm/dt/ngx-customscrollbar.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/ngx-customscrollbar)
[![npm](https://img.shields.io/npm/l/express.svg?maxAge=2592000)](/LICENSE)

Pure ngx scrollbars without dependencies to jQuery or other scroll librarys, to bind customized scrollbars to every scrollable html element like scrollable div or textarea for example or a virtual view like a canvas.

If you identify any errors in the library, or have an idea for an improvement, please open an [issue](https://github.com/q2g/ngx-customscrollbar/issues) or create a pull request.
___

## Table of Contents

- [Ngx-CustomScrollbars](#ngx-customscrollbars)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Vertical Scrollbar](#vertical-scrollbar)
  - [Horizontal Scrollbar](#horizontal-scrollbar)
  - [Docs](#docs)
  - [Author](#author)
  - [Credit](#credit)

## Installation

npm

```bash
npm i --save ngx-customscrollbar
```

```bash
# for angular 7
npm i --save ngx-customscrollbar@1.2.3
```

## Usage

Import `NgxCustomScrollbarModule` in your module

```js
import { NgxCustomScrollbarModule } from "ngx-customscrollbar";

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
import { Component } from "@angular/core";
import { ViewportControl } from "ngx-customscrollbar";

@Component({
    selector: "app-vertical-scroll",
    templateUrl: "vertical-scroll.component.html",
    styleUrls: ["./vertical-scroll.component.scss"],
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
@import "~ngx-customscrollbar/scss/common";
@import "~ngx-customscrollbar/scss/ngx-customscrollbars.theme"

.scrollWrapper {

  @include ngxCustomScrollbarsTheme();

  display: flex;
  flex-direction: row;
  height: 500px;
  overflow: hidden;

  .scrollView {
    flex: 1;
    overflow-y: auto;
  }
}
```

## Horizontal Scrollbar

Component

```ts
import { Component } from "@angular/core";
import { ViewportControl } from "ngx-customscrollbar";


@Component({
    selector: "app-vertical-scroll",
    templateUrl: "vertical-scroll.component.html",
    styleUrls: ["./vertical-scroll.component.scss"],
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
@import "~ngx-customscrollbar/scss/common";
@import "~ngx-customscrollbar/scss/ngx-customscrollbars.theme"

.scrollWrapper {
  // load scrollbars theme here
  @include ngxCustomScrollbarsTheme();

  display: flex;
  flex-direction: row;
  height: 500px;
  overflow: hidden;

  .scrollView {
    flex: 1;
    overflow-x: auto;

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

## Docs

-[Theming](https://github.com/q2g/ngx-customscrollbar/blob/master/docs/theming.md)  
-[Directives](https://github.com/q2g/ngx-customscrollbar/blob/master/docs/directives.md)  

## Author

Q2g - Ralf Hannuschka [Github](https://github.com/q2g)

## Credit

- Inspired by ngx-scrollbar
