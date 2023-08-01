class APIfeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  // FOR SEARCH
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword, //The $regex property contains a regular expression pattern to match the keyword
            $options: "i", // The $options property is set to "i" to make the search case-insensitive (matching both capital and small letters).
          },
        }
      : {};
    console.log(keyword);

    this.query = this.query.find({ ...keyword });
    return this;
  }

  // FOR FILTER
  filter() {
    const queryCopy = { ...this.queryStr };
    // console.log(queryCopy);

    //REMOVING SOME FIELDS FOR CATEGORY

    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete queryCopy[key]);
    // console.log(queryCopy);

    // FILTER FOR PRICE AND RATING

    // console.log(queryCopy);

    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));

    // console.log(queryStr);
    return this;
  }

  // FOR PAGINANTIONS

  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;

    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }


}

module.exports = APIfeatures;
