---
title: test9
category: test
createdDate: 2026-01-16
slug: test9
---

# 테스트용 마크다운 파일입니다.

## 제목 2

### 제목 3

#### 제목 4

##### 제목 5

###### 제목 6

이텔릭체는 _별 기호(Asterisks)_ 혹은 _언더바 기호(Underscore)_ 를 사용하세요.
두껍게는 **별 기호(asterisks)** 혹은 **언더바 기호(underscore)** 를 2번씩 사용하세요.
***이텔릭체*와 두껍게** 를 혼용할 수도 있습니다.

취소선은 ~~물결 기호(tilde)~~ 를 사용하세요.
<u>밑줄</u>은 마크다운에서 지원하지 않기에, 직접 `<u></u>` 태그를 사용하세요.

1. 순서가 있는 항목
1. 순서가 있는 항목
   1. 순서가 있는 항목
   1. 순서가 있는 항목
1. 순서가 있는 항목
1. 순서가 있는 항목

- 순서가 없는 항목
- 순서가 없는 항목
  - 순서가 없는 항목
  - 순서가 없는 항목

[GOOGLE](https://google.com)

[NAVER](https://naver.com "링크 설명(title)을 작성하세요.")

![대체 텍스트(Alternative Text)](https://picsum.photos/1000/400 "링크 설명(Title)")
![이미지입니다!][Image]

[Image]: https://picsum.photos/500/300 "이미지입니다!"

`background` 혹은 `background-image` 속성으로 요소에 배경 이미지를 삽입할 수 있습니다.

```html
<a href="https://www.google.co.kr/" target="_blank">GOOGLE</a>
```

```css
.list > li {
  position: absolute;
  top: 40px;
}
```

```javascript
function add(a, b = 1) {
  console.log(a, b);
  return a + b;
}
```

```bash
$ npm run dev
```

```python
s = "Python syntax highlighting"
print s
```

```plaintext
No language indicated, so no syntax highlighting.
But let's throw in a <b>tag</b>.
```

| 값         |                   의미                   |   기본값 |
| ---------- | :--------------------------------------: | -------: |
| `static`   |      유형(기준) 없음 / 배치 불가능       | `static` |
| `relative` |        요소 자신을 기준으로 배치         |
| `absolute` | 위치 상 부모\_(조상)요소를 기준으로 배치 |
| `fixed`    |       브라우저 창을 기준으로 배치        |
| `sticky`   |        스크롤 영역 기준으로 배치         |

> 인용문 - 남의 말이나 글에서 직접 또는 간접으로 따온 문장.
> _(네이버 국어 사전)_

BREAK!

> 인용문을 작성하세요!
>
> > 중첩된 인용문(nested blockquote)을 만들 수 있습니다.
> >
> > > 중중첩 인용문 1
> > > 중중첩 인용문 2
> > > 중중첩 인용문 3

-- 시작 --

<!-- 안녕하세요. -->

[//]: # "안녕하세요."
[//]: # "안녕하세요."
[//]: # "안녕하세요."

-- 종료 --
