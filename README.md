이미지 crop 모달 고치기, 세부적인 loading, error text 수정, 카드 이미지는 width만 100%, 이미지 관련 생각해보기, erd, 화면 흐름도 수정

# ERD

![단블ERD drawio](https://github.com/springhana/word_blog/assets/97121074/3784210f-95da-4666-862b-9df4155c3f27)



# 화면 흐름도

![단블 화면흐름도 drawio](https://github.com/springhana/word_blog/assets/97121074/68fae9ca-cab5-49a8-859a-ff3bf322d78a)


1. 단어 추가 ✔️
2. 단어장 ✔️
3. 상세 페이지 ✔️
4. 수정 페이지 ✔️
5. 로그인
6. 프로필 ✔️
7. 회원가입 ✔️
8. 검색 ✔️
9. 홈 ✔️

카드 테마 별로 설정 가능하게 구현

- - -

## Home
1. tag 별로 card를 보여줌 - tag가 같다면 사용자 끼리 공유, 단어장은 공유 안됨
2. card에 대한 memorize, like 기능
3. 모달 창을 이용해서 수정 페이지 이동, 삭제 가능
4. card 작성 - paper, note 선택 후 작성
5. tag, note 추가 기능

- - -

# 11월 28일

1. 기존에 정했던 태그를 없애고 사용자의 고유의 태그를 생성할 수 있게 생성 그 태그들은 유니크한 이름을 가지며 중복은 허가되지 않음
2. 하지만 사용자끼리 태그를 중복으로 만들면 그 태그는 공유할 수 있게 구현
3. 기존에 정했던 태그(ENG / JPN / CS)에서 고정적으로 마크다운, 텍스트를 사용하게 했는데 단어장 카드 마크다운 또는 텍스트 중에 선택해서 작성할 수 있게 수정

- - -
# 11월 29일

1. api 통합 및 정리
2. card, comment, detail에 같은 설정 모달 컴포넌트 사용
3. card, comment 자체만 삭제 구현 - card에 외래키는 삭제 기능 나중에 구현

- - -
# 11월 30일
1. card collection에 대한 C,R,U,D 전부 구현
2. note collection에 대한 C,R 구현 - D 추후 구현 U 생각중 - 설정에서 따로 구현
3. Like collection에 대한 C,R,U 구현
4. tag collection에 대한 C,R 구현 - D 추후 구현 U 생각중 D시 tag에 관련된 card 삭제하지 고민 중 - 설정에서 따로 구현
5. comment collection에 대한 C,R,D 구현 - U는 구현 안할 생각, 다시 comment를 쓰고 싶으면 D하고 다시 C
6. card, comment에 대한 이벤트 구현

- - -
# 12월 1일
1. Profile 배너 이미지 붙이기
2. 프로필 이미지 자르기 후 이미지 설정 - 배너 이미지, 프로필 이미지
3. 각각 단계별로 Index 조정하여 수정하게 하였음 - react-image-crop 사용해서 이미지 사이즈 조절
4. 이미지 자르기 후 선택을 누르면 AWS S3에 저장하고 DB에 주소를 저장 - aspect가 배율이 정수가 나오면 바로 선택하고 저장하면 저장이 되지 않아 약간의 소수점을 줘야함

- - -
# 12월 2일
1. router마다 제목 부여
2. note 페이지 구현 - note author에 맞게 card 배열 - CardDetail 컴포넌트 수정 후 재사용
3. 프로필 페이지에 버그 수정 (로그인을 무조건 해야 들어가게 했는데 -> 로그인을 하지 않아도 다른 유저의 프로필로 이동할 수 있음)


- - -
# 12월 3일
1. 검색 백엔드 구현 - mongodb
2. 검색 프론트 페이지 구현 - value 입력 시 마다 전송 - 결과가 있을 때에만 결과를 보내줌

- - -
# 12월 4일
1. 카드 memorize on / off / all 기능 추가
2. ERD, 화면 흐름도 수정

- - -
# 12월 5일
1. 구독 api 구현
2. 프로필에 내가 작성한 카드들과 옵션
3. 좋아요한 카드들

- -- 
# 12월 6일
1. 팔로워 구현
2. 팔로잉 구현
3. 태그 수정, 삭제 구현

- - -
# 12월 7일
1. tag ERD 수정 배열로 정리했었는데 하나하나 아이디를 갖게 수정
2. subscribe 구현
3. tag U,D 구현
4. note U,D 구현
5. email 인증 하기

- - -
# 12월 8일
1. email 인증 받아온거 확인하고 회원가입하기
2. 단어장 차트 - 그래프 및 차트

- - -
# 12월 9일
1. 단어장 2D 그래프 - 네트워크 차트
2. 하트맵 차트 더미 데이터로 테스트 및 연습

# 12월 10일
1. 내가 쓴 카드에 날짜에 따라서 하트맵 데이터 구현 - 월 마다 겹치는거 생각해보기
2. 대표 이미지 구현
3. 이미지 드래그 및 클릭 컴포넌트로 구현
4. 설정
5. 기능 개발 끝 - 필요한건 나중에 구현

# 12월 11일
1. 피그마 - 컴포넌트 별로 디자인 생성 - 카드, 사이드 바 등등

- - -
# 12월 13일
1. 파일이 날라갔다..........
2. 죽고 싶다
3. 밤새서 복구 하지만 날라간 커밋들...

# 12월 14일
1. 피그마 - 와이어 프레임 라우터 별로 생성

# 12월 15일
1. 사이드 바 css
2. 태그 css

# 12월 16일
1. 카드 css

# 12월 17일
1. detail css, event, animation

# 12월 18일
1. write modal css, event, animation
2. 퀴즈 페이지 만들어야됨
- - -
1. 노트 페이지에 시각화 - react-force-graph ✔️
2. 설정창
3. 디자인
4. 카드에 내 단어장에 추가 기능 구현
5. 모바일 같은 경우 마크다운 사용시 드래그를 못하므로 파일 추가 시킬 수 있게 하던가 마크다운 이미지를 선택하면 파일로 이동할 수 있게 만드는게 좋을 것 같음
6. 단어장에서 퀴즈 같은 것 할 수 있게 구현
7. 던어장 색상 추가
8. 모든 계정 관리할 수 있게 admin 계정 하나 생성
9. 현재 시간에 따라 홈 배너 이미지 변경 - setinterval 1시간 간견으로 체크해서 변경
10. 단어장 이미지 - default 값으로 선택 할 있게 해주는 이미지 여러개 와 직접 이미지를 넣어서 생성할 수 있게 구현
11. aws s3 폴더 위치 잡기 ✔️
12. 태그는 프로필에서 수정 및 삭제 및 생성 - 태그 삭제는 고민 ✔️
13. 노트는 단어장에서 수정 및 삭제 및 생성 - 노트 삭제 카드들은 노트 없음으로 수정 ✔️
"# word_blog" 
"# word_blog" 
"# word_blog" 
