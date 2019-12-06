# 3차 과제

## Level1
Blog 테이블을 만들고(칼럼은 각자 생각)
CRUD를 구현할 것.
[GET]/blogs [POST]/blogs [PUT]/blogs [DELETE]/blogs
## Level2
Article 테이블을 만들고(칼럼은 각자 생각해서 구현할 것)
CRUD를 구현할 것.
이때 article에는 blogIdx 칼럼 포함
[GET]/blogs/${blogIdx}/articles
[POST]/blogs/${blogIdx}/articles
[PUT]/blogs/${blogIdx}/articles
[DELETE]/blogs/${blogIdx}/articles
## Level3
Comment 테이블을 만들고(칼럼은 각자 생각)
CRUD를 구현할 것.
이때 comment에는 articleIdx 칼럼 포함
[GET]/blogs/${blogIdx}/articles/${articleIdx}/comments
[POST]/blogs/${blogIdx}/articles/${articleIdx}/comments
[PUT]/blogs/${blogIdx}/articles/${articleIdx}/comments
[DELETE]/blogs/${blogIdx}/articles/${articleIdx}/comments
ec2 서버 주소 및 github repository 주소로 제출 (api 주소는 지켜주세요!)

# 4차 과제

3주차 과제에서 아래 두가지 기능 및 라우팅을 추가해주세요.

- blogIdx에 해당하는 Aritcle 보기
- ArticleIdx에 해당하는 Comment 보기

# 5주차 과제

4주차 과제에 다음과 같은 기능을 추가합니다.

Article Table에 Image Field를 추가합니다.
Article을 작성할 때 이미지 파일도 업로드 할 수 있습니다.
[심화] 만약 하나의 게시글 에서 복수개의 이미지를 올릴 수 있다면 어떻게 할지 고민해보세요.

로그인 회원가입을 추가합니다.
이때 로그인에서 성공한 경우 token값을 반환해줍니다.
[심화] Token의 payload에는 어떤 값을 넣는 것이 좋은 지 고민해조세요.

모든 객체(블로그, 게시글, 댓글)의 작성, 수정, 삭제는 token을 이용해서 검증단계를 거칩니다.
[심화] 보충세미나에서 다룬 미들웨어를 어떻게 적용할 지 고민해보세요.
