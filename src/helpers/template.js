class template {
  async showJson(res, status = 200, data) {
    return await res.status(status).json(data);
  }
  async getRequest(req) {
    return await req.body;
  }

  async userGetFromToken(req) {
    return await req.user;
  }

  async storeIdGetFromToken(req) {
    return await req.store;
  }
}

module.exports = new template();
