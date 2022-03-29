var databaseModule = require("../database/database");
var coreRequestModel = require("../models/coreServiceModel");
var constant = require("../common/constant");
var general = require("./general");

module.exports.AddUserToDb = async (
  functionContext,
  resolvedResult
) => {
  var logger = functionContext.logger;
  logger.logInfo("AddUserToDb() Invoked!");
  try {
    let rows = await databaseModule.knex.raw(
      `CALL usp_customer_sign_up('${functionContext.customerRef}','${resolvedResult.Name}','${resolvedResult.ImageUrl}','${resolvedResult.Email}','${resolvedResult.Password}','${resolvedResult.Phone}','${resolvedResult.currentTimestamp}')`
    );
    logger.logInfo(
      `AddUserToDb() ::Returned Result :: ${JSON.stringify(
        rows[0][0][0]
      )}`
    );
    var result = rows[0][0][0] ? rows[0][0][0] : null;
    return result;
  } catch (errCheckIfUserPresentInDB) {
    logger.logInfo(
      `checkIfUserPresentInDB() :: Error :: ${JSON.stringify(
        errCheckIfUserPresentInDB
      )}`
    );
    functionContext.error = new coreRequestModel.ErrorModel(
      constant.ErrorMessage.ApplicationError,
      constant.ErrorCode.ApplicationError
    );

    throw functionContext.error;
  }
};

module.exports.SignInUserDB = async (
  functionContext,
  resolvedResult
) => {
  var logger = functionContext.logger;
  logger.logInfo("SignInUserDB() Invoked!");
  try {
    let rows = await databaseModule.knex.raw(
      `CALL usp_customer_sign_in('${resolvedResult.Email}')`
    );
    logger.logInfo(
      `SignInUserDB() ::Returned Result :: ${JSON.stringify(
        rows[0][0][0]
      )}`
    );
    var result = rows[0][0][0] ? rows[0][0][0] : null;
    return result;
  } catch (errCheckIfUserPresentInDB) {
    logger.logInfo(
      `checkIfUserPresentInDB() :: Error :: ${JSON.stringify(
        errCheckIfUserPresentInDB
      )}`
    );
    functionContext.error = new coreRequestModel.ErrorModel(
      constant.ErrorMessage.ApplicationError,
      constant.ErrorCode.ApplicationError
    );

    throw functionContext.error;
  }
};

module.exports.AddShowsToDB = async (
  functionContext,
  resolvedResult
) => {
  var logger = functionContext.logger;
  logger.logInfo("AddShowsToDB() Invoked!");
  try {
    let rows = await databaseModule.knex.raw(
      `CALL usp_add_shows('${functionContext.showRef}','${resolvedResult.Name}','${resolvedResult.Time}','${resolvedResult.Date}','${resolvedResult.Genre}','${resolvedResult.Price}','${resolvedResult.currentTimestamp}')`
    );
    logger.logInfo(
      `AddShowsToDB() ::Returned Result :: ${JSON.stringify(
        rows[0][0][0]
      )}`
    );
    var result = rows[0][0][0] ? rows[0][0][0] : null;
    return result;
  } catch (errCheckIfUserPresentInDB) {
    logger.logInfo(
      `checkIfUserPresentInDB() :: Error :: ${JSON.stringify(
        errCheckIfUserPresentInDB
      )}`
    );
    functionContext.error = new coreRequestModel.ErrorModel(
      constant.ErrorMessage.ApplicationError,
      constant.ErrorCode.ApplicationError
    );

    throw functionContext.error;
  }
};

module.exports.GetAllShowsFromDb = async (
  functionContext,
  resolvedResult
) => {
  var logger = functionContext.logger;
  logger.logInfo("GetAllShowsFromDb() Invoked!");
  try {
    let rows = await databaseModule.knex.raw(
      `CALL usp_search_shows('${resolvedResult.Name}','${resolvedResult.Genre}','${resolvedResult.Date}')`
    );
    logger.logInfo(
      `GetAllShowsFromDb() ::Returned Result :: ${JSON.stringify(
        rows[0][0]
      )}`
    );
    var result = rows[0][0] ? rows[0][0] : null;
    return result;
  } catch (errCheckIfUserPresentInDB) {
    logger.logInfo(
      `GetAllShowsFromDb() :: Error :: ${JSON.stringify(
        errCheckIfUserPresentInDB
      )}`
    );
    functionContext.error = new coreRequestModel.ErrorModel(
      constant.ErrorMessage.ApplicationError,
      constant.ErrorCode.ApplicationError
    );

    throw functionContext.error;
  }
};

module.exports.GetCustomerDetailsFromDB = async (
  functionContext,
  resolvedResult
) => {
  var logger = functionContext.logger;
  logger.logInfo("GetCustomerDetailsFromDB() Invoked!");
  try {
    let rows = await databaseModule.knex.raw(
      `CALL usp_get_customer_details('${resolvedResult.UserRef}')`
    );
    logger.logInfo(
      `GetCustomerDetailsFromDB() ::Returned Result :: ${JSON.stringify(
        rows[0][0][0]
      )}`
    );
    var result = rows[0][0][0] ? rows[0][0][0] : null;
    return result;
  } catch (errCheckIfUserPresentInDB) {
    logger.logInfo(
      `GetCustomerDetailsFromDB() :: Error :: ${JSON.stringify(
        errCheckIfUserPresentInDB
      )}`
    );
    functionContext.error = new coreRequestModel.ErrorModel(
      constant.ErrorMessage.ApplicationError,
      constant.ErrorCode.ApplicationError
    );

    throw functionContext.error;
  }
};

module.exports.updateCustomerWalletInDB = async (
  functionContext,
  resolvedResult
) => {
  var logger = functionContext.logger;
  logger.logInfo("updateCustomerWalletInDB() Invoked!");
  try {
    let rows = await databaseModule.knex.raw(
      `CALL usp_add_money_wallet('${resolvedResult.UserRef}','${resolvedResult.Amount}')`
    );
    logger.logInfo(
      `updateCustomerWalletInDB() ::Returned Result :: ${JSON.stringify(
        rows[0][0][0]
      )}`
    );
    var result = rows[0][0][0] ? rows[0][0][0] : null;
    return result;
  } catch (errCheckIfUserPresentInDB) {
    logger.logInfo(
      `GetCustomerDetailsFromDB() :: Error :: ${JSON.stringify(
        errCheckIfUserPresentInDB
      )}`
    );
    functionContext.error = new coreRequestModel.ErrorModel(
      constant.ErrorMessage.ApplicationError,
      constant.ErrorCode.ApplicationError
    );

    throw functionContext.error;
  }
};

module.exports.GetShowDetailsFromDB = async (
  functionContext,
  resolvedResult
) => {
  var logger = functionContext.logger;
  logger.logInfo("GetShowDetailsFromDB() Invoked!");
  try {
    let rows = await databaseModule.knex.raw(
      `CALL usp_get_show_details('${resolvedResult.ShowRef}')`
    );
    logger.logInfo(
      `GetShowDetailsFromDB() ::Returned Result :: ${JSON.stringify(
        rows[0][0][0]
      )}`
    );
    var result = rows[0][0][0] ? rows[0][0][0] : null;
    return result;
  } catch (errCheckIfUserPresentInDB) {
    logger.logInfo(
      `GetShowDetailsFromDB() :: Error :: ${JSON.stringify(
        errCheckIfUserPresentInDB
      )}`
    );
    functionContext.error = new coreRequestModel.ErrorModel(
      constant.ErrorMessage.ApplicationError,
      constant.ErrorCode.ApplicationError
    );

    throw functionContext.error;
  }
};

module.exports.saveBookingDetailsToDb = async (
  functionContext,
  resolvedResult
) => {
  var logger = functionContext.logger;
  logger.logInfo("saveBookingDetailsToDb() Invoked!");
  try {
    let rows = await databaseModule.knex.raw(
      `CALL usp_book_tickets_for_shows('${resolvedResult.CustomerRef}','${resolvedResult.BookingRef}','${resolvedResult.ShowRef}','${resolvedResult.Quantity}','${resolvedResult.Amount}','${resolvedResult.currentTimestamp}')`
    );
    logger.logInfo(
      `saveBookingDetailsToDb() ::Returned Result :: ${JSON.stringify(
        rows[0][0][0]
      )}`
    );
    var result = rows[0][0][0] ? rows[0][0][0] : null;
    return result;
  } catch (errValidateRequest) {
    logger.logInfo(
      `errValidateRequest() :: Error :: ${JSON.stringify(
        errValidateRequest
      )}`
    );

    var errorCode = null;
    var errorMessage = null;

    if (
      errValidateRequest.sqlState &&
      errValidateRequest.sqlState == constant.ErrorCode.Max_Tickets_booked
    ) {
      errorCode = constant.ErrorCode.Max_Tickets_booked;
      errorMessage = constant.ErrorMessage.Max_Tickets_booked;
    }

    functionContext.error = new coreRequestModel.ErrorModel(
      constant.ErrorMessage.Max_Tickets_booked,
      constant.ErrorCode.Max_Tickets_booked
    );

    throw functionContext.error;
  }
};

module.exports.GetShowDetailsFromBookingRefDB = async (
  functionContext,
  resolvedResult
) => {
  var logger = functionContext.logger;
  logger.logInfo("GetShowDetailsFromBookingRefDB() Invoked!");
  try {
    let rows = await databaseModule.knex.raw(
      `CALL usp_get_Show_details_from_bookingref('${resolvedResult.BookingRef}')`
    );
    logger.logInfo(
      `GetShowDetailsFromBookingRefDB() ::Returned Result :: ${JSON.stringify(
        rows[0][0][0]
      )}`
    );
    var result = rows[0][0][0] ? rows[0][0][0] : null;
    return result;
  } catch (errCheckIfUserPresentInDB) {
    logger.logInfo(
      `GetShowDetailsFromBookingRefDB() :: Error :: ${JSON.stringify(
        errCheckIfUserPresentInDB
      )}`
    );
    functionContext.error = new coreRequestModel.ErrorModel(
      constant.ErrorMessage.ApplicationError,
      constant.ErrorCode.ApplicationError
    );

    throw functionContext.error;
  }
};

module.exports.RefundShowDetailsFromDB = async (
  functionContext,
  resolvedResult
) => {
  var logger = functionContext.logger;
  logger.logInfo("RefundShowDetailsFromDB() Invoked!");
  try {
    let rows = await databaseModule.knex.raw(
      `CALL usp_cancel_booked_tickets('${resolvedResult.CustomerRef}','${resolvedResult.BookingRef}')`
    );
    logger.logInfo(
      `RefundShowDetailsFromDB() ::Returned Result :: ${JSON.stringify(
        rows[0][0][0]
      )}`
    );
    var result = rows[0][0][0] ? rows[0][0][0] : null;
    return result;
  } catch (errCheckIfUserPresentInDB) {
    logger.logInfo(
      `usp_cancel_booked_tickets() :: Error :: ${JSON.stringify(
        errCheckIfUserPresentInDB
      )}`
    );
    functionContext.error = new coreRequestModel.ErrorModel(
      constant.ErrorMessage.ApplicationError,
      constant.ErrorCode.ApplicationError
    );

    throw functionContext.error;
  }
};

module.exports.getAllBookingDetails = async (
  functionContext,
  resolvedResult
) => {
  var logger = functionContext.logger;
  logger.logInfo("getAllBookingDetails() Invoked!");
  try {
    let rows = await databaseModule.knex.raw(
      `CALL usp_get_all_bookings('${resolvedResult.UserRef}')`
    );
    logger.logInfo(
      `getAllBookingDetails() ::Returned Result :: ${JSON.stringify(
        rows[0][0]
      )}`
    );
    var result = rows[0][0] ? rows[0][0] : null;
    return result;
  } catch (errCheckIfUserPresentInDB) {
    logger.logInfo(
      `getAllBookingDetails() :: Error :: ${JSON.stringify(
        errCheckIfUserPresentInDB
      )}`
    );
    functionContext.error = new coreRequestModel.ErrorModel(
      constant.ErrorMessage.ApplicationError,
      constant.ErrorCode.ApplicationError
    );

    throw functionContext.error;
  }
};