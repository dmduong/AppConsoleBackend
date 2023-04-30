class mongooes {
  async load(
    select,
    table,
    where = {},
    populate = new Array(),
    limit = "",
    offset = "",
    sort = {}
  ) {
    const result = await table
      .find(where)
      .select(select)
      .limit(limit)
      .skip(offset)
      .sort(sort)
      .populate(populate);
    return result;
  }

  async pagination(page, limit, count = new Array(), dataPage = new Array()) {
    let data = {
      page: page,
      pages: Math.ceil(count.length / limit),
      limit: limit,
      total: count.length,
      dataOfPage: dataPage.length,
    };

    return data;
  }
}

module.exports = new mongooes();
