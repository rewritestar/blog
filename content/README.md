## 포스트 생성 규칙

1. slug 는 자동 문자열로 생성하고, 기존의 slug 와 중복되지 않도록 생성한다.
2. createdDate 는 파일 생성 시점으로 결정된다.
3. /create-post.ts 프로그램을 통해 카테고리를 직접 입력하여 지정한다.
4. 파일 이름은 00000_fileName.md 형식을 따른다.

## 포스트 생성 프로그램 사용법

생성 방법

- 루트 폴더에서

```
$ node ./content/create-post.ts [option]

```

- option: 파일이름(필수입력)
- 파일이름에 띄어쓰기가 있을 경우 따옴표로 감싼다.(예: /create-posts.ts "파일 이름 예제.md")

## 구현 상세

### 파일 스캔 및 slug 추출

- readPost();
  - import.meta.url - 절대 경로 URL(Example: file:///C:/workplaces/blog/content/index.ts)
  - fileURLToPath() - 파일 URL 을 OS 경로로 변환-fs, path 모듈이 읽을 수 있음(Example:C:\workplaces\blog\content\create-post.ts)
  - path.dirname() - 현재 파일의 디렉토리만 반환

### 카테고리 입력받기

- ask(categorySet);

### slug 생성 후 디폴트 컨텐츠(frontmatter) 생성 및 반환

- getContent();

### 포스트 파일 생성

- fs.writeFileSync(filePath, content);
