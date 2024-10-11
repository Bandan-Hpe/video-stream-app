class ApiResponce {
  constructor(statusCode, data, message = "success", succss) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.succss = statusCode < 400;
  }
}
export { ApiResponce };
