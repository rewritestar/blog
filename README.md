## 해결할 문제점

- 카테고리별로 전체 개수 표시
- category 중첩 형태 제공
- content 를 .md 파일, json 파일 두곳에서 중복저장하는 문제

### 해결한 문제

1. URL 에 파라미터를 통해 카테고리 정보 유지

- 문제
  - 작성된 글 상단에 글 목록을 확인하는 리스트가 존재하는데, 어떤 카테고리를 통해 해당 글을 접속했는지에 따라 그 카테고리에 속한 글 목록을 표출한다.
  - 이때 카테고리 정보를 URL 에 남겨두는 것이 중요한 이유는 URL 을 통해 글을 접속했을때 다음글을 선택할때 참고하게 될 글 목록의 정보가 정해지기 때문이다.
  - 예를 들어 국내여행 카테고리에 속한 글을 읽고 다음에 읽고 싶은 글은 글 목록을 통해 선택하게 되는데, 만약 시간순으로 해당 글 바로 다음에 작성된 글을 읽고 싶을때가 있다. 이때 글 목록이 국내여행 카테고리의 글만 한정되어 있다면 시간순으로 작성된 다음글을 찾기 위해서 전체보기를 클릭하고 이전에 봤던 글을 찾아야한다.
- 해결
  - 카테고리 정보를 URL 에 유지하여, 링크로 접속하여도 선택한 카테고리의 글목록으로 글을 열람할 수 있다.

2. 마크다운 태그 스타일 안보이는 문제

- 문제
  - tailwind 를 import 하면 디폴트로 브라우저 기본 스타일(user-agent styles)을 없애기 때문이다.
    ```css
    @import "tailwindcss";
    ```

- 해결방안
  - tailwind 에서 제공한 [해결책 문서](https://github.com/tailwindlabs/tailwindcss-typography)
  - 플러그인 설치해서 css 에 추가한 후 class="prose" 추가하면 해결된다.

    ```html
    npm install -D @tailwindcss/typography @import "tailwindcss"; + @plugin
    "@tailwindcss/typography";

    <Markdown class="prose"> {markdown} </Markdown>
    ```

3. 깃허브 페이지 새로고침 404 에러

- 문제
  - 새로고침, 새 탭에 URL 검색을 하게 되면 서버에 매칭되는 URL에서 index.html 파일을 찾아오려고 하는데, 서버(깃허브 페이지 서버)에 해당 URL 이 존재하지 않기 때문이다.
  - 예를 들어 도메인이 https://example/repo-name 인 깃허브 페이지를 배포했다면, https://example/repo-name/category URL 을 새로고침, 새 탭에서 검색하면 서버에는 해당 URL 에 index.html 파일이 없기때문에 404 를 반환한다.
  - 상세
    - 깃허브 페이지는 정적 호스팅 서버로 서버에 있는 정적파일만 응답하는 기능을 한다.
    - SPA 리액트 앱은 라우팅을 JS(React-Router 등) 모듈로 하기 때문에, index.html 파일 위에 js 파일이 실행되어야 라우팅이 동작한다.
    - index.html 파일이 실행되어야 JS 가 실행되고 라우팅도 가능하다.
    - index.html 파일은 https://example/repo-name URL 에만 존재한다.

- 해결
  - public/404.html 파일을 생성해 404 오류가 발생하는 상황이 오면 커스텀 404.html 이 실행되도록 한다.
  - 404.html 에서는 목적 URL 정보(https://example/repo-name/category)를 query string(https://example/repo-name/?category) 으로 만들어 사실상 도메인 URL 로 이동하도록 한다.
  - 도메인 index.html 에서는 스크립트를 추가하여 리액트 소스인 js 가 로딩되면 다시 목적 URL 로 이동한다.(https://example/repo-name/category)
  - [참고 문서 spa-github-pages](https://github.com/rafgraph/spa-github-pages)
