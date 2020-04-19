<h1 align="center">N poem</h1>

## Prerequisites

**Node.js >= 13**

**Visual Studio Code Extensions**

- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## Dev

```zsh
> npm install
> npm run dev
```

## Branches

### `master`

Always represents the latest codes. It is being protected by the branch protection rules.

### Releases

After heavily tested the master branch, tag and release using SemVer.

## Development Guides

### Pages

Next.js gracefully generates routes based on the files/directories structure inside the `pages`. You can write a page component just like the other normal React components. It is much easier to manage and visualize them and reduces overheads configuring the routes.

However, when it comes to separating a large page component into multiple child components, you cannot put those child components inside the `pages` directory because they're going to be considered as a **page** by Next.js.

```
pages
└─ home
   └─ index.tsx     # https://npoem.io/home

pages
└─ home
   ├─ index.tsx     # https://npoem.io/home
   └─ SearchBar.tsx # https://npoem.io/home/SearchBar
```

So eventually what you're going to do is put them inside `components`.

```
components
└─ SearchBar.tsx

...

pages
└─ home
   └─ index.tsx
```

What bad things happen here is that they're not organized together even if they're strongly related and you have to keep moving around two directories.

So we're going to use a page component just like a **bridge**. Create a page component as extremely simple as possible making it needless to frequently visit again once it is created.

```tsx
import { NextPage } from 'next'
import Home from '@/components/Home'

const Page: NextPage = () => {
  return <Home /> // All the states and logics for this page are inside the `Home` component
}

export default Page
```

Share the same props type if a page receives some data from server side.

```diff
- import { NextPage } from 'next'
+ import { GetServerSideProps, NextPage } from 'next'
- import Home from '@/components/Home'
+ import Home, { HomeProps } from '@/components/Home'

- const Page: NextPage = () => {
+ const Page: NextPage<HomeProps> = (props) => {
-   return <Home />
+   return <Home {...props} />
  }

  export default Page

+ export const getServerSideProps: GetServerSideProps<HomeProps> = async (props) => {
+   return {
+     props: {}
+   }
+ }
```

**VSCode Snippet**

We prepare a simple snippet for creating a new page component.

- `page`

<img src="https://user-images.githubusercontent.com/19797697/79678474-f9dbd500-8236-11ea-8118-fa5105a9eea9.gif" width="500" />

### Components

Basically components are created like below.

```
components
└─ MyComponent
   ├─ index.tsx
   └─ style.scss
```

The name **index** is automatically resolved and allows us to import the module through a directory name without writing full path including the `index.tsx`.

```tsx
import MyComponent from '@/components/MyComponent'
```

If a component doesn't include its own **_style_**, name it directly.

```
components
└─ MyComponent.tsx
```

**VSCode Snippet**

Alongside a page snippet, we also prepare a snippet for creating a new React component.

- `comp`

<img src="https://user-images.githubusercontent.com/19797697/79678693-06f9c380-8239-11ea-8a3f-2142f7a47f61.gif" width="550" />

- `styl`

<img src="https://user-images.githubusercontent.com/19797697/79678733-68219700-8239-11ea-9586-67840017e446.gif" width="450" />

### Sass
