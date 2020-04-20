<p align="center">
  <img src="https://user-images.githubusercontent.com/19797697/79691571-5ffa4380-829b-11ea-8b93-6729ca5245c5.png" width="400" />
</p>

## Prerequisites

**Node.js >= 13**

**Visual Studio Code Extensions**

- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [sort-imports](https://marketplace.visualstudio.com/items?itemName=amatiasq.sort-imports)

## Dev

```zsh
> npm install
> npm run dev
```

## Branches

**`master`**

Always represents the latest codes. It is being protected by the branch protection rules.

**Releases**

After heavily tested the master branch, tag and release using SemVer.

> For more information creating branches, read the [PAYW Contributing Guidelines](https://github.com/paywteam/contributing-guidelines#git-branch-names).

## Development Guides

- [Pages](#Pages)
- [Components](#Components)
- [Sass](#Sass)

### Pages

Next.js gracefully generates routes based on the files/directories structure inside the `pages`. It is much easier to manage and visualize them and reduces overheads configuring the routes. You can write a page component just like the other normal React components.

However, when it comes to separating a large page component into multiple child components, you cannot put those child components inside the `pages` directory because they're going to be considered as a **page** by Next.js.

```zsh
pages
└─ home
   └─ index.tsx     # https://npoem.io/home

pages
└─ home
   ├─ index.tsx     # https://npoem.io/home
   └─ SearchBar.tsx # https://npoem.io/home/SearchBar
```

So eventually what you're going to do is put them inside `components`.

```zsh
components
└─ SearchBar.tsx

...

pages
└─ home
   └─ index.tsx
```

What bad thing happen here is that they're not organized together even if they're strongly related and you have to keep moving around two directories.

So we're going to use a page component just like a **bridge**. Create a page component as extremely simple as possible making it needless to frequently visit again once it is created.

```tsx
// src/pages/home/index.tsx

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

Basically components are structured like below.

```zsh
components
└─ MyComponent
   ├─ index.tsx
   └─ style.scss
```

The name **index** is automatically resolved and allows us to import the module through a directory name without writing full path including the `index.tsx`.

```tsx
import MyComponent from '@/components/MyComponent'
```

If a component doesn't include its own style and is a leaf component, you can name it directly.

```zsh
components
└─ MyComponent.tsx
```

You may wonder why not name them same as the component name.

```zsh
# Approach 1
components
└─ MyComponent
   ├─ index.tsx
   └─ MyComponent.scss

# Or do something like this
# Approach 2
components
├─ MyComponent.tsx
├─ MyComponent.scss
├─ YourComponent.tsx
├─ YourComponent.scss
├─ TheirComponent.tsx
└─ TheirComponent.scss
```

With these approaches, duplicate names distract our vision which results in hardness to easily index what components are there. Also the **Approach 2** doesn't even allow to nest child components into a component.

What is worse, in terms of refactoring, there are many namespaces you have to modify.

```diff
  components
- ├─ MyComponent.tsx
+ ├─ OurComponent.tsx
- ├─ MyComponent.scss
+ └─ OurComponent.scss

- import './MyComponent.scss'
+ import './OurComponent.scss'
```

We strongly follow the principles of **Single source of truth** and **DRY(Don't Repeat Yourself)**.

**VSCode Snippets**

Alongside a page snippet, we also prepare a snippet for creating a new React component.

- `comp`

<img src="https://user-images.githubusercontent.com/19797697/79678693-06f9c380-8239-11ea-8a3f-2142f7a47f61.gif" width="550" />

- `styl`

<img src="https://user-images.githubusercontent.com/19797697/79678733-68219700-8239-11ea-9586-67840017e446.gif" width="450" />

### Child Components

If a component is composed of several child components and they're only used inside that component, put them under the parent's component.

```zsh
components
└─ Parent
   ├─ index.tsx
   ├─ style.scss
   ├─ Child1
   │  ├─ index.tsx
   │  ├─ style.scss
   │  └─ Child3
   │     ├─ index.tsx
   │     └─ style.scss
   └─ Child2.tsx
```

> If one of the child components are imported from the components other than its **_parent_**, it should not placed under the **_parent_**.

**Class Name**

Name the mostly outer element's class with `component-{component-name}`.

For example,

```tsx
const Home: React.FC = () => {
  return <div className="component-home">...</div>
}

const SuperCharger: React.FC = () => {
  return <div className="component-super-charger">...</div>
}
```

If a component specifically depends on a parent component, concatenate the component names.

```zsh
components
└─ Library
   ├─ index.tsx
   ├─ style.scss
   └─ Book
      ├─ index.tsx
      └─ style.scss
```

```tsx
const Library: React.FC = () => {
  return <div className="component-library">...</div>
}

const Book: React.FC = () => {
  return <div className="component-library-book">...</div>
}
```

In this way, we can create a unique stylesheet scope without using [**module**](https://nextjs.org/docs/basic-features/built-in-css-support#adding-component-level-css) feature of Next.js which append a randomly unique string to each class name.
