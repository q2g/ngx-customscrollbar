# Directives Ngx-Customscrollbars

## ngxCustomScrollbarScrollable

Wraps the html element into a HtmlScrollViewport and registered on ViewportControl. Every custom scroll element gets a strategy by default this will be (since 2.0.1) checked. That means after Angular LifeCycle hook afterViewChecked was called it will check size of container has been changed.

```html
<div class="scrollViewport" ngxCustomScrollbarScrollable>
    ...
</div>
<ngx-customscrollbar></ngx-customscrollbar>
```

For textareas (or other text fields) it is recommended to add a change detection strategy for *input* to react on input event and not on AfterViewChecked.

```html
<div class="scrollViewport" [ngxCustomScrollbarScrollable]="'input'">
    ...
</div>
<ngx-customscrollbar></ngx-customscrollbar>
```

## ngxCustomScrollbarOverflowY

structural directive, controls visibility of scrollbar like css property overflow-x, possible
values are **none**, **scroll** or **auto**. Default value is **auto**. If **none** is set container will not be scrollable anymore.

@example

```html
<ngx-customscrollbar *ngxCustomScrollbarOverflowY="'scroll'">
</ngx-customscrollbar>
```

## ngxCustomScrollbarOverflowX

structural directive, controls visibility of scrollbar like css property overflow-x, possible
values are **none**, **scroll** or **auto**. Default value is **auto**
If **none** is set container will not be scrollable anymore.

@example

```html
<ngx-customscrollbar [scrollDirection]="horizontal" *ngxCustomScrollbarOverflowX="'scroll'">
</ngx-customscrollbar>
```