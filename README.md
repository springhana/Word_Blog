# 단블

<p align="center">
  <img src="https://github.com/springhana/word_blog/assets/97121074/6e16b774-04c2-4cff-8047-ecd9549be4b2" width="300px" />
</p>

## 단블
>다양한 단어장을 사용할 수 있는 SNS, Blog 같은 `단어장`입니다. </br>
>개발 기간: 2023.10 ~ 2024.1

## 배포 주소
> 배포 서버: <a href="https://word-blog.vercel.app/">단블</a> <br/>
> 디자인: <a href="https://www.figma.com/file/e1E8wuK0wqz1n3E82rpe0v/WordBlog?type=design&node-id=0-1&mode=design">디자인 피그마</a>

## 프로젝트 소개
첫 계획으로는 영어, 일본어 단어만 글을 사용할 수 있게 태그를 정했습니다. 하지만 프로젝트 중간에서 부터 정적으로 정해놓은 태그들이 사용감으로 부터 불편함을 얻었습니다. 
그래서 동적으로 유저가 태그를 정할 수 있게 수정하였고 같은 태그들은 유저들 간에 공유를 하여 사용할 수 있습니다. <br/>
또한 글을 보관하고 저장하는 단어장을 만들어서 단어장에 들어 있는 글에 대해서 네트워크 차트를 사용하여 시각화를 표현했습니다.

- - -

# 시작 가이드

## 요구 사항
- Node.JS: 20
- React: 18
- next: 13
- yarn: 1.22.19

## 설치
```shell
$ git clone https://github.com/springhana/word_blog.git
$ cd word_blog
$ yarn install
$ yarn dev
```

## ERD

![단블ERD drawio](https://github.com/springhana/word_blog/assets/97121074/3784210f-95da-4666-862b-9df4155c3f27)

## 화면 흐름도

![단블 화면흐름도 drawio](https://github.com/springhana/word_blog/assets/97121074/68fae9ca-cab5-49a8-859a-ff3bf322d78a)

## 기술 스택

<div style="display:flex; flex-direction:column; align-items:flex-start;"> 
  <div>
    <p><strong>FrontEnd</strong></p>
    <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"/>&nbsp 
    <img src="https://img.shields.io/badge/css3-1572B6?style=for-the-badge&logo=css3&logoColor=white"/>&nbsp 
    <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white"/>&nbsp 
    <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>&nbsp 
    <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white"/>
    <img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=next.js&logoColor=white"/>&nbsp 
  </div>

  <div>
    <p><strong>BackEnd</strong></p>
    <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=node.js&logoColor=white"/>&nbsp 
  </div>

  <div>
    <p><strong>DataBase</strong></p>
    <img src="https://img.shields.io/badge/mongodb-47A248?style=for-the-badge&logo=mongodb&logoColor=white"/>&nbsp 
  </div>

  <div>
    <p><strong>State</strong></p>
    <img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white"/>&nbsp 
    <img src="https://img.shields.io/badge/reactquery-FF4154?style=for-the-badge&logo=redux&logoColor=white"/>&nbsp 
  </div>
</div>

- - -

# 화면 구성 (이미지 클릭하여 이동)

> **계정** <br/>
> **아이디**: 123@naver.com <br/>
> **비밀번호**: 123 <br/>

|메인|검색|
|:---:|:---:|
|<a href="https://word-blog.vercel.app/" target="_blank"><img src="https://github.com/springhana/word_blog/assets/97121074/290dd7bc-9b20-475a-b329-a925550556b9" width="100%"/></a>|<a href="https://word-blog.vercel.app/search" target="_blank"><img src="https://github.com/springhana/word_blog/assets/97121074/12bb4ce9-e611-4822-8145-1e81b9b94302" width="100%"/></a>|
|마이 페이지|단어장|
|<a href="https://word-blog.vercel.app/profile/6584353de75a8cbbb59a0a28" target="_blank"><img src="https://github.com/springhana/word_blog/assets/97121074/38ef2d09-5b3f-476a-859f-db16fb8c5634" width="100%"/></a>|<a href="https://word-blog.vercel.app/book/6584353de75a8cbbb59a0a28" target="_blank"><img src="https://github.com/springhana/word_blog/assets/97121074/f51fec97-ffe9-4f33-bdca-e9962565a418" width="100%"/></a>|
|단어장 네트워크 차트|설정|
|<img src="https://github.com/springhana/word_blog/assets/97121074/a9f827dc-5466-483e-b477-63d64bce1765" width="100%"/>|<a href="https://word-blog.vercel.app/setting/6584353de75a8cbbb59a0a28" target="_blank"><img src="https://github.com/springhana/word_blog/assets/97121074/37adb63b-bf02-4272-a244-fdbc916b3e08" width="100%"/></a>|
|로그인|회원가입|
|<a href="https://word-blog.vercel.app/login" target="_blank"><img src="https://github.com/springhana/word_blog/assets/97121074/e7530159-8359-411a-a267-2cabfa8f6514" width="100%"/></a>|<a href="https://word-blog.vercel.app/register" target="_blank"><img src="https://github.com/springhana/word_blog/assets/97121074/c1d3fb1c-455f-44ad-9e6c-04a718c569f6" width="100%"/></a>|
|글쓰기|태그|
|<img src="https://github.com/springhana/word_blog/assets/97121074/c038fef8-f3a7-4638-953b-77755077b5a9" width="100%"/>|<a href="https://word-blog.vercel.app/profile/6584353de75a8cbbb59a0a28/tags" target="_blank"><img src="https://github.com/springhana/word_blog/assets/97121074/d1150345-13df-420f-9dd5-440dd87d95fd" width="100%"/></a>|
|텍스트 종이|마크다운 종이|
|<a href="https://word-blog.vercel.app/detail/65b54c358b8b1617f53a8dec" target="_blank"><img src="https://github.com/springhana/word_blog/assets/97121074/ce908eb4-9809-41fd-af1e-efc8a64188d8" width="100%"/></a>|<a href="https://word-blog.vercel.app/detail/659ed573c46c8bd114dc3641" target="_blank"><img src="https://github.com/springhana/word_blog/assets/97121074/a06d0a09-7214-41de-ad36-b80815b70629" width="100%"/></a>|

## 주요 기능 
⭐ 카드, 단어장, 태그 `C`, `R`, `U`, `D` 기능 
- 카드, 단어장, 태그에 대한 간단한 create, read, update, delete 기능 제공
- 마크다운 문법을 사용한 카드와 텍스트만을 사용한 카드 2종류의 카드 기능 제공
- 마크다운 카드를 작성할 시 마크다운 에디터에 쓴 텍스트를 압축하여 DB에 용량을 감소하여 용량 낭비 감소

⭐ 유저들의 관심있는 카드 `구독`, `좋아요` 기능 
- `사용자의 관심사` 확인 가능

⭐  `무한 스크롤` 기능
- 모바일 환경을 고려하며 시용자에게 필요한 만큼의 콘텐츠만 미리 로딩되어 초기 로딩 속도를 향상을 위해 `무한 스크롤` 구현
- <a href="https://velog.io/@springhana/React-%EB%AC%B4%ED%95%9C-%EC%8A%A4%ED%81%AC%EB%A1%A4-Infinite-scroll">무한 스크롤 블로그</a>

⭐ `캐시` 관리 기능
- <a href="https://velog.io/@springhana/react-query%EC%97%90-%EB%8C%80%ED%95%B4%EC%84%9C">react query에 대해서</a>
- 서버에서 데이터를 불러오는 대신 `캐시`된 데이터를 사용하면 네트워크 요청 수 감소하기 위해 `react-query` 사용

⭐ `소셜 로그인` 기능
- 소셜 미디어 플랫폼이 제공하는 인증 시스템을 활용 `안정성 향상`과 새로운 계정을 생성하고 로그인하는 번거로움을 감소하여 `사용자 경험 향상`

⭐ `보안` 강화
- `이메일 인증`을 하게 실제 자신의 이메일 주소를 소요하고 있는지 확인
- `비밀번호 암호화` 해시 함수를 사용하여 비밀번호를 안전하게 저장

⭐ `이미지 최적화`
- <a href="https://velog.io/@springhana/Next-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%B5%9C%EC%A0%81%ED%99%94">[Next] 이미지 최적화</a>
- 이미지 포맷 `Avif`를 사용하여 기존의 `png`, `jpg`들 보다 적은 용량으로 성능 최적화
- 이미지 `레이지 로딩`으로 필요한 순간에만 리소스를 요청하여 성능 최적화
- 이미지 `리사이징`으로 각 화면에 맞게 이미지 크기 제공함으로 성능 최적화
- 이미지 `용량 압축`으로 AWS S3에 배포 시 이미지 압축으로 성능 최적화

⭐ 사용자 UI & UX
- 이미지를 드래그 해서 이미지를 불러올 수 있게 편리성 제공
- 마이 페이지의 프로필, 배너 이미지 등 이미지 크기를 따로 준비하지 않고 이미지 자르기 해서 편리성 제공
- 네트워크 차트를 사용하여 단어장에서 관리하는 카드에 대한 분석을 하여 편리성 제공
- 스켈레톤 UI 적용으로 사용자에게 더 좋은 UX 경험 제공

- - -

# 기타
프로젝트를 하면서 디자인, 백엔드, 프론트엔드를 1인 개발로 진행하면서 a부터 z까지 경험 해볼 수 있었습니다. 이미지를 저장하기 위해 AWS S3 서버를 직접 써보기도 했으며 최적화를 해보면서 어떤 최적화를 할 수 있는지에 대해 공부가 많이 됬습니다.<br/>
또한 프로젝트 중간 부터 팀 프로젝트를 하나 진행하개 되면서 기존에 부족한 `협업 능력`을 상승시키기 위해 블로그(<a href="https://velog.io/@springhana/Next-ESLint%EC%99%80-Prettier-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0">컨벤션</a>)에 글을 써보기도 하면 협업에 대해 공부를 미리 준비 할 수 있었습니다. 시각화를 해보기도 하며 이미지에 관련된 작업을 많이 해본거 같아서 좋았습니다. <br/>
하지만 아직 부족한 부분들이 많으면 상태관리 교체, 코드 분할, 중복 함수 줄이기 등 리펙토링을 해보면서 경험을 쌓을 것입니다.

