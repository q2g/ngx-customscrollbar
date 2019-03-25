# Theming Ngx-Customscrollbars

## Requirements

By default it seems not to be possible to load all stylings which are required, like hide native scrollbars or disable user selections through the library or even directives.

As example if we want to use scrollbars on a html element like  table, textarea or cdk virtual scroll we add directive **ngxCustomScrollbarsScrollable** to create a dom scrollviewport but to hide native scrollbars we need to add some css values.

```scss
[ngxCustomScrollbarScrollable] {
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}
```

to solve that issue u dont need to do that it is recommended to use common styles from ngx-customscrollbars which hides all native scrollbars on components which should have a customscrollbar. Just add to your main.scss file (or any other scss file u load).

main.scss

```scss
@import '~ngx-customscrollbar/scss/common';
```

## Theming

by default these variables can be used to customize scrollbars, as example u could load global theme even in your main.scss just importing the theme mixin and apply your styles to arguments.

### Global

to define a global theme for all scrollbars on page, will be mostly the case import **ngx-customscrollbars.theme** to your scss file and include the mixin **ngxCustomScrollbarsTheme()**

```scss
@import '~ngx-customscrollbar/scss/ngx-customscrollbars.theme';
@include ngxCustomScrollbarsTheme();
```

### Custom component

usefull if u want other colors / scrollbar dimension in specific component.

```ts
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss', './scrollbar.scss']
})
export class AppComponent {}
```

```scss
@import '~ngx-customscrollbar/scss/ngx-customscrollbars.theme';

:host {
  /** to make it work we need to use ng-deep */
  ::ng-deep {
    @include ngxCustomScrollbarsTheme();
  }
}
```

### Theme settings

```scss
$themeSettings = (
    thumbBorderRadius: number,
    thumbBackground: color,
    trackBackground: color,
    trackSize: number
)
```

- thumbBackground: background color for the scroll thumb
- thumbBorderRadius: border radius for the thumb
- trackBackground: background color for the track
- trackSize: value in pixel or rem, this defines the width for vertical scrollbars or height for horizontal scrollbars.

### Default theme settings

By default if **ngxCustomScrollbarsTheme()** is called without any theme map it will jump back to default theme settings.

```scss
$defaultSettings: (
    thumbBorderRadius: 4px,
    thumbBackground: rgba(50, 50, 50, .3),
    trackBackground: transparent,
    trackSize: 8px
);
```

### Custom theme settings

```scss
@import '~ngx-customscrollbar/scss/ngx-customscrollbars.theme';

$orangeScrollbars: (
    thumbBorderRadius: 5px,
    thumbBackground: orange,
    trackBackground: lightgrey,
    trackSize: 10px
);

@include ngxCustomScrollbarsTheme($orangeScrollbars);
```

You dont need to pass all scrollbar settings, only which one u want to override, all supplied scrollbar settings will be merged with default settings.

```scss
@import '~ngx-customscrollbar/scss/ngx-customscrollbars.theme';

$yellowScrollbars: (
    thumbBackground: yellow,
);

@include ngxCustomScrollbarsTheme($orangeScrollbars);
```

results in the same as

```scss
@import '~ngx-customscrollbar/scss/ngx-customscrollbars.theme';

$yellowScrollbars: (
    thumbBorderRadius: 4px,
    thumbBackground: yellow,
    trackBackground: transparent,
    trackSize: 8px
);

@include ngxCustomScrollbarsTheme($orangeScrollbars);
```