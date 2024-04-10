# Spiral

Angular project with Angular CLI 17.2.0 and npm 9.2.0 (`ng version`)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`

## Database with firebase

If you need to install firebase, run `ng add @angular/fire`

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Component organisation

```shell
main page
├── navbar
|	└── searchbar
└── (category) (redirect to resource page)


resource page
├── navbar (the same)
└── (feature)

interactive map
└── navbar (the same)
```

## Nomenclature

main page
: default page, contain a navbar and a list of heroes redirecting to the corresponding resource page

resource page
: contain a nav bar and many feature components that redirect to websites, title,

feature
: component with title, image, description, color (random?), (location)

## Git good practices

- `git pull` before starting
- do only ONE thing per commit
- commit only if it works
- name your commits `feature|bugfix|add|remove|refactor [description]`
- change branch to add a radically new feature
