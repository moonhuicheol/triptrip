
## :pushpin: 프로젝트명 
## TripTrip

> 여행을 좋아하는 유저
>
> 여행 경험을 얘기하고 나눌 수 있는 커뮤니케이션
>
> 여행숙소 예약 플랫폼

## 📆 개발기간
2024년 10월 ~ 진행중

## 시작가이드
**Requirements**
 -    Node.js 23.2.0
 -    Yarn 1.22.22

**Installation & start**
```
    $ git clone https://github.com/moonhuicheol/triptrip.git
    $ cd triptrip
    $ yarn install
    $ yarn dev
```

## 📚 기술스택
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"><img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=next.js&logoColor=white"><img src="https://img.shields.io/badge/tailwind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"><img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"><img src="https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=GraphQL&logoColor=white"><img src="https://img.shields.io/badge/ApolloClient-311C87?style=for-the-badge&logo=apollographql&logoColor=white"><img src="https://img.shields.io/badge/reacthookform-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white"><img src="https://img.shields.io/badge/zod-3E67B1?style=for-the-badge&logo=Zod&logoColor=white"><img src="https://img.shields.io/badge/zustand-F36D00?style=for-the-badge&logo=zustand&logoColor=white">

## 📺 화면구성
<img src = https://github.com/user-attachments/assets/0be7b2db-8a12-426a-af1c-84b5774deb68 with="300" height="300" />
<img src = https://github.com/user-attachments/assets/75c3eb49-bccf-4c24-8801-a12412ee3cb1 with="300" height="300" />
<img src = https://github.com/user-attachments/assets/c867f3ba-ecc2-42e5-8236-364039f81f65 with="300" height="300" />
<img src = https://github.com/user-attachments/assets/a90070e8-a936-4194-b4dc-13d9651bb8ac with="300" height="300" />
<img src = https://github.com/user-attachments/assets/497666b9-ffaa-43f0-a05f-8bd107e66f5b with="300" height="300" />


## 🎮 주요기능

### ⭐ 로그인 기능
    서버로부터 받은 acessToken를 전역상태로 관리
    react-hook-form 및 zod를 적용하여 불필요한 리렌더링 최소화 및 유효성 검사

### ⭐ 게시글 작성
    react-daum-postcode라이브러리를 이용하여 주소 입력
    react-youtube라이브러리를 이용하여 유튜브 영상 게시가능

### ⭐ 게시판
    페이지네이션 
    검색기능(디바운싱 적용)

### ⭐ 댓글
    댓글 CRUD
    별점 작성기능


## 🛠 트러블 슈팅 및 최적화 내용

### 1.불필요한 리렌더링 방지

    회원가입, 로그인 및 게시글 작성 등 텍스트를 입력하는 요소에 react-hook-form을 이용하여 리렌더링 방지했습니다.

    여러 컴포넌트들 사이에서 특정 컴포넌트 외 다른 컴포넌트들의 리렌더링을 방지하기 위해 memo를 사용했습니다.
<img src = https://github.com/user-attachments/assets/dbbd46c6-730d-453e-a802-e0fa940a6ddf with="230" height="230"/>
<img src = https://github.com/user-attachments/assets/409306e7-e6d2-4db1-9c11-8b32eca8bf2f with="230" height="230"/>



### 2.이미지 미리보기 개선

    이미지를 등록하고, 이미지를 미리보기 할 때 이미지를 서버에 등록하고, 주소를 받아와야하는 과정의 시간이 길어 사용자 경험이 좋지 않은 문제 발생

    임시 이미지 주소를 만들어 미리보기를 우선적으로 실행 후 이미지를 서버에 등록하고, 주소를 받아오게 했습니다.

    결과적으로 기존시간 = 3.36s (3360ms) // 개선된 시간 = 5ms => 약 99.85% 최적화
<img src = https://github.com/user-attachments/assets/5933b79f-aa9c-4985-888d-cf79e8bbd358 with="230" height="230"/>
<img src = https://github.com/user-attachments/assets/37c5998a-adf0-4732-b585-6632be49d20c with="230" height="230"/>


### 3.리패치(refetch) 성능 개선

    게시글을 등록/삭제 이후 refetch를 통해 목록을 업데이트를 해서 서버에 기본적으로 두 번의 요청을 보냈습니다.

    cache-state를 직접적으로 업데이트하여 서버에 부하를 줄이고 두번의 요청을 한번으로 줄였습니다.

### 4.좋아요 성능 개선(옵티미스틱-UI)

    좋아요를 누르게 되면 api요청이 되고, 백엔드 서버에서는 DB에 요청하여 좋아요 수를 올리고, 올린 좋아요 수를 다시 응답합니다. 이렇게 되면 느린환경의 컴퓨터에서는 해당 과정이 굉장히 느려 유저에게 좋은 경험을 줄 수 가 없다고 생각했습니다.

    cache-state에 접근해서 좋아요 수를 업데이트하고, 좋아요 요청이 서버에 도달하기전에 업데이트한 좋아요 수를 화면에빠르게 보여 주어 사용자 경험을 향상 시켰습니다.

    좋아요 수를 받아오기까지 두번의 api 요청이 필요하고, 총 37ms의 시간의 걸린 후에 업데이트된 좋아요 수가 보이지만 성능개선을 통해 19ms가 걸리는 하나의 api요청을 보내자마자 업데이트 된 좋아요 수를 보여 줄 수 있게 되었습니다.
<img src = https://github.com/user-attachments/assets/6ebc88cd-673a-4b1a-a637-bcc5d3cc4d57 with="230" height="230"/>
<img src = https://github.com/user-attachments/assets/a8aad70b-1327-4600-9599-3e4e166f3911 with="230" height="230"/>


### 5.데이터 조회 성능 개선

    해당 게시글 제목에 마우스를 hover했을 시

    prefetch를 하여 데이터를 미리 받아놓은 후 사용자가 게시글을 클릭하고 이동 후에 보다 빠른 데이터를 조회할 수 있게하여 사용자 경험을 향상 시켰습니다.

    또한 일반 텍스트보다 용량이 큰 이미지를 preload하여 마찬가지로 사용자가 해당 게시글로 이동할 때 Layout Shift 현상을 방지하여 사용자 경험을 향상 시켰습니다.


    
### 6.무한스크롤 성능 개선

    데이터가 많은 페이지에서 렌더링 성능이 떨어져 스크롤이 부드럽지 않게 되는 문제가 있습니다. 이 성능 저하 문제를 해결
    
    하기 위해 윈도잉 기법을 도입하여 한 번에 전체 리스트를 모두 렌더링하지 않고, 현재 보이는 영역(뷰포트)에 맞는 데이터만 렌더링하여 무한스크롤 성능을 개선하였습니다.

