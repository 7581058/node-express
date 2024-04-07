## 왜 express 인가?
많은 사용자들이 선택한 프레임워크로  
http 모듈을 사용해 서버를 만들 수 있지만 http모듈의 기능 이외에도 다양한 기능이 포함되어 있음  

### 라우팅 
http 모듈을 사용했을 때는 if 문이나 switch 문으로 요청 메서드나 요청 url에 따라 라우팅 해야 했으나 익스프레스에서는 더욱 간편한 방법으로 라우팅을 할 수 있음.

### 미들웨어 
익스프레스에는 '미들웨어'라는 개념이 있어 요청과 응답 사이에서 여러 가지 기능을 실행할 수 있음. 이미 많은 사용자들이 미들웨어를 만들어 패키지로 제공하므로 자주 사용하는 미들웨어는 따로 만들 필요 없이 가져와 사용할 수 있음. 

### 템플릿 엔진 
html 페이지는 기본적으로 정적이지만 서버와 함께 사용해 동적인 html 페이지를 만들 수 있음. 애플리케이션에서 보이는 부분인 뷰를 담당. 

### 정적인 파일 지원 
익스프레스에서 동적인 파일만 생성하는 것이 아니라 css, js, 이미지 처럼 정적인 파일을 쉽게 서비스할 수 있는 기능도 제공. 

### express 설치 
```
npm i express 
```

## nodemon 패키지 
서버 코드를 수정했을 때 기존에 실행하던 서버를 멈추고 다시 서버를 실행해야만 수정된 내역이 반영이 되는데 여러번 테스트하고 수정해 반복해야하는데 서버 종료 다시실행을 계속 해야하는데 이런 번거로움을 줄이기 위해 사용하는 패키지   
코드를 수정했을 때 서버를 종료하지 않더라도 수정된 내용을 바로 적용시킬 수 있음.  

```
npm i nodemon --save-dev -g  
```

## 예제 
```javascript
const express = require("express")
const app = express()

app.get('/', (req, res) => {
  res.send("hello node")
})

app.listen(3000, () => {
  console.log("서버 실행 중")
})
```
실행
```
nodemon app 
``` 

## express 라우팅 
### post 해보기 
```javascript
const express = require("express")
const app = express()

app.get('/', (req, res) => {
  res.send("hello node")
})
app.get('/contacts', (req, res) => {
  res.send("Contacts Page")
})
//post 
app.post('/contacts', (req, res) => {
  res.send("Create Contacts")
})

app.listen(3000, () => {
  console.log("서버 실행 중")
})
```
GET 과 다르게 POST 는 주소창 접근으로 확인할 수 없으므로 POSTMAN 등을 사용할 수 있지만 VSCode 확장인 Thunder Client 를 활용할 수도 있음.  

### Thunder Client 
```
확장아이콘 -> thunder client 검색 -> 설치 
```
아이콘에서 선택 후 New Request 
요청방식과 경로 선택, 작성해 테스트 

### 라우트 파라미터 
특정 조건을 지정할 때 라우팅 코드에서 요청 url 뒤에 : 를 붙인 후 그 뒤에 변수 작성 
```
/요청url/:변수 
```

연락처 정보 중 아이디가 1인 것을 가져오려면
```
/contacts/1 
```

>GET /contacts/:id 는 id에 맞는 연락처 가져오기   
PUT /contacts/:id 는 id에 맞는 연락처 수정하기   
DELETE /contacts/:id는 id에 맞는 연락처 삭제하기  

### 예제 코드 
```javascript
const express = require("express")
const app = express()

app.get('/', (req, res) => {
  res.send("hello node")
})

//연락처 가져오기 
app.get('/contacts', (req, res) => {
  res.send("Contacts Page")
})

//연락처 1개 가져오기 
app.get('/contacts/:id', (req, res) => {
  res.send(`View Contact for ID : ${req.params.id}`)
})

//새 연락처 추가하기 
app.post('/contacts', (req, res) => {
  res.send("Create Contacts")
})

//연락처 수정하기 
app.put("/contacts/:id", (req,res) => {
  res.send(`Update Contact for ID : ${req.params.id}`)
})

//연락처 삭제하기 
app.delete("/contacts/:id", (req, res) => {
  res.send(`Delete Contact for ID : ${req.params.id}`)
})

app.listen(3000, () => {
  console.log("서버 실행 중")
})
```

## express 요청 객체의 속성 
### req.body
서버로 POST 요청할 때 넘겨준 정보를 담고 있음.  
예를들어 로그인 버튼을 눌렀을 때 사용자의 아이디와 비밀번호의 값이 들어있음. 

### req.cookies
클라이언트에 저장된 쿠키 정보를 서버로 함께 넘겼을 경우 쿠키 정보를 담고 있음. 

### req.headers
서버로 요청을 보낼 때 같이 보낸 헤더 정보를 담고 있음. 

### req.params
url 뒤에 라우트 파라미터가 포함되어 있을 경우 파라미터 정보를 담고 있음. 

### req.query
요청 url 에 포함된 질의 매개변수(쿼리, query)를 담고 있음.  
예를들어 검색 사이트에서 검색어를 입력하고 검색 버튼을 클릭했을 때 검색어와 관련된 질의 매개변수가 req.query에 담김.

## express 응답 객체의 함수
### res.download
파일을 내려받음

### res.end
응답 프로세스를 종료

### res.json
json응답을 전송

### res.jsonp
jsonp 지원을 통해 json 응답을 전송

### res.redirect
요청 경로를 재지정해서 강제 이동 

### res.render
뷰 템플릿을 화면에 렌더링

### res.send
어떤 유형이든 res.send()괄호 안의 내용을 전송

### res.sendFile
지정한 경로의 파일을 읽어서 내용을 전송

### res.sendStatus
상태 메시지와 함께 http 상태 코드 전송

### res.status
응답의 상태 코드를 설정 







