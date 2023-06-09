# :partly_sunny: Weather Wear :umbrella:
https://weather-wear-zeta.vercel.app/

## :zap: About
Weather Wear is a web application that suggests what kind of clothing is appropriate based on the temperature in your current location.  
If you open Weather Wear before going out, you can determine at a glance what you should wear.

## :hammer: Built with :wrench:
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![Storybook](https://img.shields.io/badge/-Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white)
<img src="https://img.shields.io/badge/-swr-000?style=flat-square&logo=next.js&link=http://zi-gae.github.io/" height="28" />
<img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" height="28" />
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![Testing-Library](https://img.shields.io/badge/-TestingLibrary-%23E33332?style=for-the-badge&logo=testing-library&logoColor=white)

- Language
  - TypeScript
- Framework
  - Next.js
- Styling
  - Styled Components
- Data fetching
  - SWR
- State management
  - Redux Toolkit
- Testing
  - Jest
  - React Testing Library
- Other tools
  - Storybook 

## :thought_balloon: Why I created this app
My room is in the basement. So there is always a big difference between room temperature and outside temperature.  
When I change my clothes before going out, I always need to open the weather application, check the current temperature, and imagine what to wear based on the temperature.  
I wanted to make the process a little easier, so I created this application.
The difference between this application and other common weather applications is that it directly suggests a guideline for what to wear, rather than the temperature or weather conditions.  
This saves you a little time in checking the temperature and thinking about what to wear based on that.

## :bulb: Features
### Main page( / )

#### The app displays clothing guideline based on the temperature of the current location of the user

<img width="490" alt="main page screenshot" src="https://github.com/koyablue/weather-wear/assets/43242050/f9a3c094-da83-47ca-a625-7f29722ff8a0">

#### The user can search any cities, and the app displays the clothing guideline based on the current temperature of the city.

[![Image from Gyazo](https://i.gyazo.com/071404d0c12aad7b5b7b8fa72daaf3a0.gif)](https://gyazo.com/071404d0c12aad7b5b7b8fa72daaf3a0)
[![Image from Gyazo](https://i.gyazo.com/1a385dbca2e0070047c1251f16bc6cac.gif)](https://gyazo.com/1a385dbca2e0070047c1251f16bc6cac)


#### Dark mode is available

[![Image from Gyazo](https://i.gyazo.com/5ef83a671fc069929086313a3cfbbca8.gif)](https://gyazo.com/5ef83a671fc069929086313a3cfbbca8)

#### Dark mode persists even if the page is reloaded.

[![Image from Gyazo](https://i.gyazo.com/b85af6d8c6b291ecd4435b1189bf69cd.gif)](https://gyazo.com/b85af6d8c6b291ecd4435b1189bf69cd)

## :tokyo_tower: Architecture

### Components

This is an example of a component in this app.
- Get API key from environment values in the server side, then pass it to the component. In this way the API key can be hidden from the client side.
- Declare styles in the same file as the component. It's easy to manage and maintain the component file if the style is in the same file.
- To fetch data, use custom hook that wraps data fetching library. The component never use the data fetching library directly so that make it easy to replace the library with other ones.

```typescript

type PageProps = {
  apiKey: string
}

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  const apiKey = API_KEY

  return {
    props: {
      apiKey,
    },
  }
}

const StyledDiv = styled.div``

type Props = PageProps & {...}

const Component = (props: Props) => {
  const { data, error, isLoading, isValidating } = useData(props.apiKey)

  const dispatch = useAppDispatch()

  // Use redux toolkit for global state
  const globalState = useAppSelector(selectGlobalState)

  // Use useState for local states
  const [localState, setLocalState] = useState<string>('')

  const exampleLogic = () => {
    /* Do something */
    dispatch(exampleAction(arg))
  }

  return (
    <StyledDiv>
      {...}
    </StyledDiv>
  )
}

```

### Folder structure
```
.
├── components
│   ├── common
│   │   └── ...
│   ├── layouts
│   │   └── ...
│   └── pages
│       └── ...
├── constants
│   └── ...
├── hooks
│   ├── data
│   │   └── ...
│   └── ...
├── pages
│   ├── _app.tsx
│   ├── _document.tsx
│   ├── api
│   │   └── ...
│   └── ...
├── public
├── services
│   └── ...

├── stores
│   └── ...
├── styled.d.ts
├── styles
│   └── ...
├── types
│   └── ...
└── utils
    └── ...
```

## :chart_with_upwards_trend: Upcoming Features
### Clothing guideline forecast
- This is like clothing guideline version of weather forecast. This feature suggests a five-day clothing guideline based on the temperature.

### Clothing guidelines for morning, afternoon, and evening
- The feature to suggest clothing guidelines for morning, afternoon, and evening. Even if it's hot when you go out but it may be cold at night. So this feature will improve the user experience of Weather Wear.
