# hand-react

## TL;DR

create-react-app을 사용하지 않고 직접 리액트 프로젝트를 구성해보는 레포지토리입니다.

https://dev.to/jburroughs/don-t-use-create-react-app-until-you-know-this-1a2d

위의 링크에 영감을 얻어 작업하는 레포지토리입니다.

## 구성 순서

* npm init -y
  * 프로젝트를 구성합니다.
  * 크게 작성할 것이 없다면, -y 플래그를 이용해 모든 선택지를 yes로 스킵할 수 있습니다.
  * 이 명령어를 통해 package.json 파일이 자동으로 생성됩니다.

* dependecies
  * webpack
  * webpack-cli
  * webpack-dev-server
 
  * @babel
    * cli
    * core
    * preset-env
    * preset-typescript
   
  * loader
    * babel-loader
    * ts-loader

  * @types
    * react
    * react-dom

## webpack

webpack은 파편화된 자바스크립트 페이지들을 하나의 번들링 파일로 만들어주는 도구입니다.

* 프로젝트의 진입점인 파일의 경로가 어디인지 (entry)
* 해당 번들링 파일이 어떤 모드로 실행되는지 (mode)
* 파일의 경로에 대해 어떤 확장자에 대해 작성을 생략할 지 (resolve : extensions)
* 어떤 확장자를 가진 스크립트에 대해 어떤 로더를 적용할 것인지 (module : rules)
* 번들링된 파일을 어떤 경로에, 어떤 이름으로 저장시킬지 (output)
* 어떤 편의기능을 플러그인으로 사용할지 (plugins)
* Source Map을 생성할지
* 개발 환경으로 실행했을 때, 어떤 옵션을 부여할지

와 같은 옵션들을 webpack.config.js 파일로 핸들링합니다.

### Source Map

Source Map이란, 빌드한 파일과 원본 파일을 연결시켜주는 기능입니다. 

작성한 프로젝트를 실행한 뒤 개발자 도구를 실행하여 Source 탭을 통해 확인이 가능합니다.

이 기능이 오류나 문제가 발생했을 때 어떤 소스코드를 보아야하는지 빠르게 찾을 수 있는 편의성이 제공합니다.

보통 우리가 cra나 cli로 프로젝트를 자동으로 생성하게 되면 source map 생성 옵션이 기본적으로 켜져있습니다.

따라서 실제 운영 환경에 그대로 배포되면 제 3자가 코드를 그대로 읽을 수 있는 문제점이 있습니다.

그러므로 webpack.config.js의 devtool 옵션에서 개발 어플리케이션에 대해서만 source map을 생성하도록 제어합니다.

별개로, source map은 어플리케이션에서 개발자 도구를 켰을 때 생성되는 것으로 번들링 파일에 영향을 주지 않습니다.

### plugins

이 프로젝트에 사용된 webpack plugin은 아래와 같습니다.

* ProvidePlugin
  * 자주 사용되는 모듈을 미리 등록합니다. 이 경우, 반복적으로 작성하는 모듈에 대한 수고로움을 덜 수 있습니다.
* HotModuleReplacementPlugin
  * 라이브 리로드를 가능케합니다. 메모리에 가상의 번들링 파일을 두고, 코드 업데이트가 트리거될 때마다 해당 번들링 파일에 변경사항을 실시간으로 적용하면서 개발에 대한 편의성을 높힙니다.
* HtmlWebpackPlugin
  * 빌드 후, dist 파일 하위에 index.html을 만들어주어야 앱 실행이 가능한데, 이 작업을 자동화해줍니다.
  * template 필드에 해당 index.html 파일이 담긴 경로를 작성해주면 빌드시 dist 폴더에 index.html이 자동으로 생성됩니다.

## babel

* 참고링크 : https://jeonghwan-kim.github.io/series/2019/12/22/frontend-dev-env-babel.html#52-%ED%8F%B4%EB%A6%AC%ED%95%84

babel은 Javascript compiler로, 여러가지 브라우저 플랫폼과 버전에 대한 호환성을 지원하는 도구입니다.

최신 문법으로 작성된 JS 문법을 하위 버전에 대응되는 문법에 대응될 수 있도록 변환해줍니다.

경우에 따라 변환이 불가능한 코드가 있는 경우, 'Polyfill' 기능을 이용해 대체 가능한 코드로 변환합니다.

Polyfill이란, 해당 브라우저 버전에 존재하지 않는 코드 조각을 채워주는 기능을 의미합니다.

보통 .babelrc 또는 babel.config.js 스크립트로 설정을 관리합니다.
또한 babel에는 preset이 있어 복잡한 설정 없는 사용이 가능하기도 합니다.
* Ex)babel-preset-airbnb
  * https://github.com/airbnb/babel-preset-airbnb
 
### preset

이 프로젝트에 적용된 Babel preset은 아래와 같습니다.

* @babel/preset-env
  * babel 컴파일러가 지원할 환경을 구분합니다.
  * 딱히 관련하여 작성한 코드는 없긴 하지만, target을 지정하여 각 브라우저의 어떤 버전까지 지원할 것인가에 대해 정의할 수 있습니다.
  * https://jeonghwan-kim.github.io/series/2019/12/22/frontend-dev-env-babel.html
 
* @babel/preset-typescript
