
# 리펙토링

- 마크 다운 이미지 드래그 시 aws s3로 넣었는데 이미지 인코딩으로 방법 변경? 고민을 해보기
- 마크다운 라이브러리 변경 고민 해보기
- 상태관리 Redux -> zustand
- 서버 상태관리 react-query
- 이미지 성능 최적화
1. avif 사용으로 용량과 시간을 최소로 만들었음
2. placeholder를 사용해서 스켈레톤 ui를 적용 시킴
3. Next.js에서 기본적으로 이미지 캐싱, webp 포맷, lazy-loading
4. 시도 해볼건 - 이미지 용량 압축 저장, 이미지 리사이징

# 추가구현

- 성능 최적화 실행
- 구글 소셜 로그인
- 퀴즈 페이지 && 알고리즘 구현

# 수정
- 카드 수정 부분 버벅거림 및 태그 바로 안감
- 수정 후 처리 어떻게 할지
- 글쓰기 모달 최적화
- 태그 꼬임 ❗- (무한 스크롤도 이상하게 됨)

# 개발 일지
<a href="https://github.com/springhana/word_blog/blob/main/doc/plan.md">개발일지 이동</a>
</br>
<a href="https://word-blog.vercel.app">단블 이동</a>


# ERD

![단블ERD drawio](https://github.com/springhana/word_blog/assets/97121074/3784210f-95da-4666-862b-9df4155c3f27)

- - -

# 화면 흐름도

![단블 화면흐름도 drawio](https://github.com/springhana/word_blog/assets/97121074/68fae9ca-cab5-49a8-859a-ff3bf322d78a)

- - -

1. 단어 추가 ✔️
2. 단어장 ✔️
3. 상세 페이지 ✔️
4. 수정 페이지 ✔️
5. 로그인
6. 프로필 ✔️
7. 회원가입 ✔️
8. 검색 ✔️
9. 홈 ✔️
