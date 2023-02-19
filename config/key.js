if (process.env.NODE_ENV === "production") {
  // 배포환경이면,
  module.exports = require("./production"); // production.js 파일 코드를 사용하고,
} else {
  // 배포환경 이외의 환경이라면 (현재는 배포,개발환경 2가지이기때문에!)
  module.exports = require("./development"); // development.js파일 코드를 사용한다.
}
