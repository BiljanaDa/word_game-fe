import HttpService from "./Http.service";

export default class GameService extends HttpService {
  static async wordsGame(data) {
    const response = await this.request({
      method: "POST",
      url: "/word",
      data: data,
    });
    return response;
  }
}
