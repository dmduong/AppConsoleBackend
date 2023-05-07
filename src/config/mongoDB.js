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

  async insert (data, table) {
    if (table) {
      const status = await table(data);
      status.save();
      return status;
    } else {
      return false;
    }
  }

  async deleteOne (where, table) {
    try {
      if (table) {
        const items = await table.deleteOne(where);
        if (items) {
          return true;
        } else {
          return false;
        }
      }
    } catch (error) {
      return false;
    }
  }

  async updateOne (fields, table, where) {
    if (table) {
      const field = {...fields, updatedAt: Date.now()};
      const items = await table.updateOne(where,field);
      if (items) {
        return true;
      } else {
        return false;
      }
    }
  }
}

module.exports = new mongooes();
