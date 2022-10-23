class template {
  async showJson(res, status = 200, data) {
    return await res.status(status).json(data);
  }
  async getRequest(req) {
    return await req.body;
  }
}

module.exports = new template();
