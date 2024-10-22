const cityModel = require("../models/city.model");

module.exports = {

  ///add data
  saveCityValues: async (payload) => {
    try {

      let cityPayload = new cityModel(payload);
      let result = await cityPayload.save();
      if (result) {
        return {
          status: true,
          data: result,
          message: "ok"
        };
      }
      return {
        status: false,
        data: result,
        message: "Failed to Save record"
      };
    } catch (error) {
      return {
        status: false,
        data: [],
        message: error.message
      };
    }
  },

  
  getCityDataById: async (findquery) => {
    try {
      let result = await cityModel.find(findquery);
      if (result) {
        return {
          status: true,
          data: result,
          message: "ok"
        };
      }
      return {
        status: false,
        data: result,
        message: "failed to get result"
      };
    } catch (error) {
      return {
        status: false,
        message: `MongoError: ${error.message}`,
        data: [],
      };
    }
  },


  getCityAllData: async (findquery) => {
    try {
      let result = await cityModel.find(findquery).sort({_id:-1});
      if (result) {
        return {
          status: true,
          data: result,
          message: "ok"
        };
      }
      return {
        status: false,
        data: result,
        message: "failed to get result"
      };
    } catch (error) {
      return {
        status: false,
        message: `MongoError: ${error.message}`,
        data: [],
      };
    }
  },


  deleteCityValues: async (findquery) => {
    try {
      let result = await cityModel.findOneAndDelete(findquery);
      if (result) {
        return {
          status: true,
          data: result,
          message: "ok"
        };
      }
      return {
        status: false,
        data: result,
        message: "Failed to delete record"
      };
    } catch (error) {
      return {
        status: false,
        message: `MongoError: ${error.message}`,
        data: [],
      };
    }
  },

  getCityData: async (findquery, searchField) => {
    try {
      if (searchField == '' || searchField == undefined || searchField == null) {
        var totalCounts = await cityModel.countDocuments();
        var result = await cityModel.find({}, {}, findquery).sort({_id:-1});
      } else {
        var counts = await cityModel.aggregate([
          {
            $addFields: {
              cityId: { $toString: '$cityId' },
            },
          },
          {
            $match: {
              $or: [
                { cityId: { $regex: searchField.toString(), $options: 'i' } },
                { cityName: { $regex: searchField, $options: 'i' } },
              ]
            }
          }
        ]);
        var totalCounts = counts.length;
        var result = await cityModel.aggregate([
          {
            $addFields: {
              cityId: { $toString: '$cityId' },
            },
          },
          {
            $match: {
              $or: [
                { cityId: { $regex: searchField.toString(), $options: 'i' } },
                { cityName: { $regex: searchField, $options: 'i' } },
              ]
            }
          }
        ]).skip(findquery.skip).sort({_id:-1}).limit(findquery.limit);
      }
      if (result) {
        return {
          status: true,
          data: {
            "totalItems": totalCounts,
            "totalPages": Math.ceil(totalCounts / findquery.limit),
            "pageNumber": findquery.page,
            "pageSize": result.length,
            "data": result
          },
          message: "ok"
        };
      }
      return {
        status: false,
        data: result,
        message: "Faild to get result"
      };
    } catch (error) {
      return {
        status: false,
        message: `MongoError: ${error.message}`,
        data: [],
      };
    }
  },
 

  updateCityValues: async (findquery, payload) => {
    try {
      let result = await cityModel.findOneAndUpdate(findquery, payload, { new: true });
      if (result) {
        return {
          status: true,
          data: result,
          message: "ok"
        };
      }
      return {
        status: false,
        data: result,
        message: "Failed to update record"
      };
    } catch (error) {
      return {
        status: false,
        message: `MongoError: ${error.message}`,
        data: [],
      };
    }
  },
 

}
