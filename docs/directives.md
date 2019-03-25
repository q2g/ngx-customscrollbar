# Directives Ngx-Customscrollbars

## ngxCustomScrollbarScrollable

Wraps the html element into a HtmlScrollViewport and registered on ViewportControl. If Dom changes or element scrolls native, scrollbars will be updated.

```html
<div class="scrollViewport" ngxCustomScrollbarScrollable>
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