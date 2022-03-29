var databaseHelper = require("../helper/databasehelper");
var coreRequestModel = require("../models/coreServiceModel");
var constant = require("../common/constant");
var appLib = require("applib");
var uuid = appLib.UUID.prototype;
var momentTimezone = require("moment-timezone");
const bcrypt = require('bcrypt');


module.exports.CustomerSignUp = async (req, res) => {
  var logger = new appLib.Logger();

  logger.logInfo(`CustomerSignUp invoked()`);

  var CustomerSignUpRequest = new coreRequestModel.CustomerSignUpRequest(
    req
  );

  var salt = await bcrypt.genSalt(10)
  var encryptedPassword = await bcrypt.hash(CustomerSignUpRequest.password, salt);

  var functionContext = {
    error: null,
    res: res,
    customerRef: uuid.GetTimeBasedID(),
    logger: logger,
  };

  logger.logInfo(
    `CustomerSignUpRequest() :: Customer request: ${JSON.stringify(CustomerSignUpRequest)}`
  );

  var requestContext = {
    Name: CustomerSignUpRequest.name,
    Phone: CustomerSignUpRequest.phone,
    Email: CustomerSignUpRequest.email,
    Password: encryptedPassword,
    ImageUrl: CustomerSignUpRequest.imgUrl,
    currentTimestamp: CustomerSignUpRequest.currentTimestamp,
  };


  try {
    let checkIfUserIsPresentInDBResult = await databaseHelper.AddUserToDb(
      functionContext,
      requestContext
    );

    isCustomerPresentResponse(functionContext, checkIfUserIsPresentInDBResult);
  } catch (errIsCustomerPresent) {
    if (!errIsCustomerPresent.ErrorMessage && !errIsCustomerPresent.ErrorCode) {
      logger.logInfo(`isCustomerPresent() :: Error :: ${errIsCustomerPresent}`);
      functionContext.error = new coreRequestModel.ErrorModel(
        constant.ErrorMessage.ApplicationError,
        constant.ErrorCode.ApplicationError
      );
    }

    logger.logInfo(
      `isCustomerPresent() :: Error :: ${JSON.stringify(errIsCustomerPresent)}`
    );
    isCustomerPresentResponse(functionContext, null);
  }
};

var isCustomerPresentResponse = (functionContext, resolvedResult) => {
  var logger = functionContext.logger;

  logger.logInfo(`isCustomerPresentResponse Invoked()`);

  var isCustomerPresentResponse = new coreRequestModel.CustomerSignUpResponse();

  isCustomerPresentResponse.RequestID = functionContext.requestID;
  if (functionContext.error) {
    isCustomerPresentResponse.Error = functionContext.error;
    isCustomerPresentResponse.Details = null;
  } else {
    isCustomerPresentResponse.Error = null;
    isCustomerPresentResponse.Details.CustomerRef = resolvedResult.paramCustomerRef
    isCustomerPresentResponse.Details.responseCode = 500;
  }
  appLib.SendHttpResponse(functionContext, isCustomerPresentResponse);
  logger.logInfo(
    `isCustomerPresentResponse  Response :: ${JSON.stringify(
      isCustomerPresentResponse
    )}`
  );
  logger.logInfo(`isCustomerPresentResponse completed`);
};

module.exports.CustomerSignIn = async (req, res) => {
  var logger = new appLib.Logger();

  logger.logInfo(`CustomerSignIn invoked()`);

  var CustomerSignInRequest = new coreRequestModel.CustomerSignInRequest(
    req
  );

  var functionContext = {
    error: null,
    res: res,
    logger: logger,
  };

  logger.logInfo(
    `CustomerSignInRequest() :: Customer request: ${JSON.stringify(CustomerSignInRequest)}`
  );

  var requestContext = {
    Email: CustomerSignInRequest.email,
  };


  try {
    let checkIfUserIsPresentInDBResult = await databaseHelper.SignInUserDB(
      functionContext,
      requestContext
    );

    if (!checkIfUserIsPresentInDBResult) {
      errorCode = constant.ErrorCode.Invalid_Authentication;
      errorMessage = constant.ErrorMessage.Invalid_Authentication;

      functionContext.error = new coreRequestModel.ErrorModel(
        errorMessage,
        errorCode
      );
      CustomerSignInResponse(functionContext);
    } else {
      var typedPassword = CustomerSignInRequest.password;
      var comparePwd = bcrypt.compareSync(typedPassword, checkIfUserIsPresentInDBResult.Password)

      if (comparePwd) {
        CustomerSignInResponse(functionContext, checkIfUserIsPresentInDBResult);
      } else {
        errorCode = constant.ErrorCode.Invalid_Password;
        errorMessage = constant.ErrorMessage.Invalid_Password;

        functionContext.error = new coreRequestModel.ErrorModel(
          errorMessage,
          errorCode
        );
        CustomerSignInResponse(functionContext);
      }


    }

    isCustomerPresentResponse(functionContext, checkIfUserIsPresentInDBResult);
  } catch (errIsCustomerPresent) {
    if (!errIsCustomerPresent.ErrorMessage && !errIsCustomerPresent.ErrorCode) {
      logger.logInfo(`isCustomerPresent() :: Error :: ${errIsCustomerPresent}`);
      functionContext.error = new coreRequestModel.ErrorModel(
        constant.ErrorMessage.ApplicationError,
        constant.ErrorCode.ApplicationError
      );
    }

    logger.logInfo(
      `isCustomerPresent() :: Error :: ${JSON.stringify(errIsCustomerPresent)}`
    );
    CustomerSignInResponse(functionContext, null);
  }
};

var CustomerSignInResponse = (functionContext, resolvedResult) => {
  var logger = functionContext.logger;

  logger.logInfo(`CustomerSignInResponse invoked`);

  var CustomerSignInResponse = new coreRequestModel.CustomerSignInResponse();

  if (functionContext.error) {
    CustomerSignInResponse.Error = functionContext.error;
    CustomerSignInResponse.Details = null;
  } else {
    CustomerSignInResponse.Error = null;
    CustomerSignInResponse.Details.CustomerRef = resolvedResult.CustomerRef;
    CustomerSignInResponse.Details.Name = resolvedResult.Name;
    CustomerSignInResponse.Details.Phone = resolvedResult.Phone;
    CustomerSignInResponse.Details.ImageUrl = resolvedResult.Image;
    CustomerSignInResponse.Details.responseCode = 500;
    CustomerSignInResponse.Details.WalletAmount = resolvedResult.Amount

  }
  appLib.SendHttpResponse(functionContext, CustomerSignInResponse);
  logger.logInfo(
    `CustomerSignInResponse  Response :: ${JSON.stringify(
      CustomerSignInResponse
    )}`
  );
  logger.logInfo(`CustomerSignInResponse completed`);
};

module.exports.AddShows = async (req, res) => {
  var logger = new appLib.Logger();

  logger.logInfo(`AddShowRequest invoked()`);

  var addShowRequest = new coreRequestModel.AddShowRequest(
    req
  );

  var functionContext = {
    error: null,
    res: res,
    showRef: uuid.GetTimeBasedID(),
    logger: logger,
  };

  logger.logInfo(
    `AddShowRequest() :: Customer request: ${JSON.stringify(addShowRequest)}`
  );

  var requestContext = {
    Name: addShowRequest.name,
    Time: addShowRequest.time,
    Genre: addShowRequest.genre,
    Date: addShowRequest.Date,
    Price: addShowRequest.price,
    CreatedOn: addShowRequest.currentTimestamp
  };


  try {
    let addShowsToDbResult = await databaseHelper.AddShowsToDB(
      functionContext,
      requestContext
    );

    addShowResponse(functionContext, addShowsToDbResult);
  } catch (errIsCustomerPresent) {
    if (!errIsCustomerPresent.ErrorMessage && !errIsCustomerPresent.ErrorCode) {
      logger.logInfo(`isCustomerPresent() :: Error :: ${errIsCustomerPresent}`);
      functionContext.error = new coreRequestModel.ErrorModel(
        constant.ErrorMessage.ApplicationError,
        constant.ErrorCode.ApplicationError
      );
    }

    logger.logInfo(
      `isCustomerPresent() :: Error :: ${JSON.stringify(errIsCustomerPresent)}`
    );
    addShowResponse(functionContext, null);
  }
};

var addShowResponse = (functionContext, resolvedResult) => {
  
  var logger = functionContext.logger;

  logger.logInfo(`getShowsResponse invoked()`);
  
  var addShowResponse = new coreRequestModel.AddShowResponse();

  if (functionContext.error) {
    addShowResponse.Error = functionContext.error;
    addShowResponse.Details = null;
  } else {
    addShowResponse.Error = null;
    addShowResponse.Details.ShowRef = resolvedResult.paramShowRef;
    addShowResponse.Details.responseCode = 500;

  }
  appLib.SendHttpResponse(functionContext, addShowResponse);
  logger.logInfo(
    `addShowResponse  Response :: ${JSON.stringify(
        addShowResponse
      )}`
  );
  logger.logInfo(`addShowResponse completed`);
};

module.exports.GetAllShows = async (req, res) => {
  var logger = new appLib.Logger();

  logger.logInfo(`GetAllShows invoked()`);

  var GetShowRequest = new coreRequestModel.GetShowRequest(
    req
  );

  var functionContext = {
    error: null,
    res: res,
    showRef: uuid.GetTimeBasedID(),
    logger: logger,
  };

  logger.logInfo(
    `GetShowRequest() :: Customer request: ${JSON.stringify(GetShowRequest)}`
  );

  var requestContext = {
    Name: GetShowRequest.name,
    Genre: GetShowRequest.genre,
    Date: GetShowRequest.Date,
  };


  try {
    let getShowsToDbResult = await databaseHelper.GetAllShowsFromDb(
      functionContext,
      requestContext
    );

    getShowsResponse(functionContext, getShowsToDbResult);
  } catch (errIsCustomerPresent) {
    if (!errIsCustomerPresent.ErrorMessage && !errIsCustomerPresent.ErrorCode) {
      logger.logInfo(`getShowsResponse() :: Error :: ${errIsCustomerPresent}`);
      functionContext.error = new coreRequestModel.ErrorModel(
        constant.ErrorMessage.ApplicationError,
        constant.ErrorCode.ApplicationError
      );
    }

    logger.logInfo(
      `getShowsResponse() :: Error :: ${JSON.stringify(errIsCustomerPresent)}`
    );
    getShowsResponse(functionContext, null);
  }
};

var getShowsResponse = (functionContext, resolvedResult) => {
  
  var logger = functionContext.logger;

  logger.logInfo(`getShowsResponse invoked()`);

  var getShowsResponse = new coreRequestModel.GetShowResponse();

  if (functionContext.error) {
      getShowsResponse.Error = functionContext.error;
      getShowsResponse.Details = null;
  } else {
      getShowsResponse.Error = null;
      if(resolvedResult.length){
      for (let index = 0; index < resolvedResult.length; index++) {
          getShowsResponse.Details.push({
              ShowRef: resolvedResult[index].ShowRef,
              Name: resolvedResult[index].Name,
              Time: resolvedResult[index].Time,
              Genre: resolvedResult[index].Genre,
              Price: resolvedResult[index].Price,
              Date: resolvedResult[index].Date,
          })
          getShowsResponse.Details.responseCode = 500;
      }
    }else{
      getShowsResponse.Details = null;
    }
      
  }
  appLib.SendHttpResponse(functionContext, getShowsResponse);
  logger.logInfo(
    `getShowsResponse  Response :: ${JSON.stringify(
      getShowsResponse
    )}`
  );
  logger.logInfo(`getShowsResponse completed`);
};


module.exports.AddMoneyToWallet = async (req, res) => {
  var logger = new appLib.Logger();

  logger.logInfo(`AddMoneyToWallet invoked()`);

  var AddMoneyToWalletRequest = new coreRequestModel.AddMoneyToWalletRequest(
    req
  );

  var functionContext = {
    error: null,
    res: res,
    logger: logger,
    prevAmount: 0
  };

  logger.logInfo(
    `AddMoneyToWalletRequest() :: Customer request: ${JSON.stringify(AddMoneyToWalletRequest)}`
  );

  var requestContext = {
    UserRef: AddMoneyToWalletRequest.userRef,
    Amount: AddMoneyToWalletRequest.price,
  };


  try {
    let getCustomerDetailsDbResult = await databaseHelper.GetCustomerDetailsFromDB(
      functionContext,
      requestContext
    );

    functionContext.prevAmount = getCustomerDetailsDbResult.Amount;


    if (getCustomerDetailsDbResult.Amount + requestContext.Amount >= 100) {

      requestContext.Amount = getCustomerDetailsDbResult.Amount + requestContext.Amount;

      let updateCustomerWalletDbResult = await databaseHelper.updateCustomerWalletInDB(
        functionContext,
        requestContext
      );

      AddMoneyToWalletResponse(functionContext, updateCustomerWalletDbResult);
    }else{
      errorCode = constant.ErrorCode.Invalid_Amount;
      errorMessage = constant.ErrorMessage.Invalid_Amount;

      functionContext.error = new coreRequestModel.ErrorModel(
          errorMessage,
          errorCode
        );
        AddMoneyToWalletResponse(functionContext);
    }

  } catch (errIsCustomerPresent) {
    if (!errIsCustomerPresent.ErrorMessage && !errIsCustomerPresent.ErrorCode) {
      logger.logInfo(`AddMoneyToWalletResponse() :: Error :: ${errIsCustomerPresent}`);
      functionContext.error = new coreRequestModel.ErrorModel(
        constant.ErrorMessage.ApplicationError,
        constant.ErrorCode.ApplicationError
      );
    }

    logger.logInfo(
      `AddMoneyToWalletResponse() :: Error :: ${JSON.stringify(errIsCustomerPresent)}`
    );
    AddMoneyToWalletResponse(functionContext, null);
  }
};

var AddMoneyToWalletResponse = (functionContext, resolvedResult) => {
    
  var AddMoneyToWalletResponse = new coreRequestModel.AddMoneyToWalletResponse();

  if (functionContext.error) {
      AddMoneyToWalletResponse.Error = functionContext.error;
      AddMoneyToWalletResponse.Details = null;
  } else {
      AddMoneyToWalletResponse.Error = null;
      AddMoneyToWalletResponse.Details.previousAmount = functionContext.prevAmount;
      AddMoneyToWalletResponse.Details.newAmount = resolvedResult.paramAmount;
  }
  appLib.SendHttpResponse(functionContext, AddMoneyToWalletResponse);
  logger.logInfo(
    `AddMoneyToWalletResponse  Response :: ${JSON.stringify(
      AddMoneyToWalletResponse
    )}`
  );
  logger.logInfo(`AddMoneyToWalletResponse completed`);
};

module.exports.BookTicketsForShow = async (req, res) => {
  var logger = new appLib.Logger();

  logger.logInfo(`BookTicketsForShow invoked()`);

  var BookTicketsRequest = new coreRequestModel.BookticketsRequest(
    req
  );

  var functionContext = {
    error: null,
    res: res,
    logger: logger,
  };

  logger.logInfo(
    `BookTicketsRequest() :: Customer request: ${JSON.stringify(BookTicketsRequest)}`
  );

  try {
    for (let index = 0; index < BookTicketsRequest.bookingData.length; index++) {

      let getCustomerDetailsDbResult = await databaseHelper.GetCustomerDetailsFromDB(
        functionContext,
        BookTicketsRequest
      );

      let getshowDetailsDbResult = await databaseHelper.GetShowDetailsFromDB(
        functionContext,
        BookTicketsRequest.bookingData[index]
      );

      var ShowTicketAmount = getshowDetailsDbResult.Amount;
      var TotalPriceToPay = getshowDetailsDbResult.Amount * BookTicketsRequest.bookingData[index].Quantity

      var WalletAmount = getCustomerDetailsDbResult.Amount;

      if(TotalPriceToPay > WalletAmount){
        errorCode = constant.ErrorCode.Insufficient_Balance;
        errorMessage = constant.ErrorMessage.Insufficient_Balance;
  
        functionContext.error = new coreRequestModel.ErrorModel(
            errorMessage,
            errorCode
          );
          BookTicketsResponse(functionContext);
      }else{

        var items = {
          CustomerRef: BookTicketsRequest.UserRef,
          BookingRef: uuid.GetTimeBasedID(),
          ShowRef: BookTicketsRequest.bookingData[index].ShowRef,
          Quantity: BookTicketsRequest.bookingData[index].Quantity,
          Amount: TotalPriceToPay,
          currentTimestamp: BookTicketsRequest.currentTimestamp,
        }

        let saveBookingDetailsToDB = await databaseHelper.saveBookingDetailsToDb(
          functionContext,
          items
        );
        BookTicketsResponse(functionContext, saveBookingDetailsToDB);
      }
    }
    
  } catch (errIsCustomerPresent) {
    if (!errIsCustomerPresent.ErrorMessage && !errIsCustomerPresent.ErrorCode) {
      logger.logInfo(`AddMoneyToWalletResponse() :: Error :: ${errIsCustomerPresent}`);
      functionContext.error = new coreRequestModel.ErrorModel(
        constant.ErrorMessage.ApplicationError,
        constant.ErrorCode.ApplicationError
      );
    }

    logger.logInfo(
      `BookTicketsResponse() :: Error :: ${JSON.stringify(errIsCustomerPresent)}`
    );
    BookTicketsResponse(functionContext, null);
  }
};

var BookTicketsResponse = (functionContext, resolvedResult) => {

  var logger = functionContext.logger;

    
  var BookTicketsResponse = new coreRequestModel.BookticketsResponse();

  if (functionContext.error) {
    BookTicketsResponse.Error = functionContext.error;
    BookTicketsResponse.Details = null;
  } else {
    BookTicketsResponse.Error = null;
    BookTicketsResponse.Details.bookingRef = resolvedResult.paramShowRef;
  }
  appLib.SendHttpResponse(functionContext, BookTicketsResponse);
  logger.logInfo(
    `BookTicketsResponse  Response :: ${JSON.stringify(
      BookTicketsResponse
    )}`
  );
  logger.logInfo(`BookTicketsResponse completed`);
};

module.exports.RefundSHowTickets = async (req, res) => {
  var logger = new appLib.Logger();

  logger.logInfo(`RefundSHowTickets invoked()`);

  var RefundSHowTicketsRequest = new coreRequestModel.RefundTicketsRequest(
    req
  );

  var functionContext = {
    error: null,
    res: res,
    showRef: uuid.GetTimeBasedID(),
    logger: logger,
    currentTs: momentTimezone
    .utc(new Date(), "YYYY-MM-DD HH:mm:ss.SSS")
    .tz("Asia/Kolkata")
    .format("YYYY-MM-DD"),
  };

  logger.logInfo(
    `RefundSHowTicketsRequest() :: Customer request: ${JSON.stringify(RefundSHowTicketsRequest)}`
  );

  var requestContext = {
    CustomerRef: RefundSHowTicketsRequest.UserRef,
    BookingRef: RefundSHowTicketsRequest.bookingRef,
  };


  try {
    let getShowsToDbResult = await databaseHelper.GetShowDetailsFromBookingRefDB(
      functionContext,
      requestContext
    );

    const date1 = new Date(functionContext.currentTs);
    const date2 = new Date(getShowsToDbResult.Date);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    if(diffDays >= 3){

      let refundShowsFromDB = await databaseHelper.RefundShowDetailsFromDB(
        functionContext,
        requestContext
      );


    getRefundResponse(functionContext, refundShowsFromDB);


    }else{
      errorCode = constant.ErrorCode.Cannot_Refund_Ticket;
      errorMessage = constant.ErrorMessage.Cannot_Refund_Ticket;

      functionContext.error = new coreRequestModel.ErrorModel(
          errorMessage,
          errorCode
        );
        getRefundResponse(functionContext);
    }
  } catch (errIsCustomerPresent) {
    if (!errIsCustomerPresent.ErrorMessage && !errIsCustomerPresent.ErrorCode) {
      logger.logInfo(`getRefundResponse() :: Error :: ${errIsCustomerPresent}`);
      functionContext.error = new coreRequestModel.ErrorModel(
        constant.ErrorMessage.ApplicationError,
        constant.ErrorCode.ApplicationError
      );
    }

    logger.logInfo(
      `getRefundResponse() :: Error :: ${JSON.stringify(errIsCustomerPresent)}`
    );
    getRefundResponse(functionContext, null);
  }
};

var getRefundResponse = (functionContext, resolvedResult) => {
  var logger = functionContext.logger;
    
  var getRefundResponse = new coreRequestModel.RefundTicketsResponse();

  if (functionContext.error) {
    getRefundResponse.Error = functionContext.error;
    getRefundResponse.Details = null;
  } else {
    getRefundResponse.Error = null;
    getRefundResponse.Details.bookingRef = resolvedResult.paramBookingRef;
    getRefundResponse.Details.WalletAmount = resolvedResult.varFinalAmount;

  }
  appLib.SendHttpResponse(functionContext, getRefundResponse);
  logger.logInfo(
    `getRefundResponse  Response :: ${JSON.stringify(
      getRefundResponse
    )}`
  );
  logger.logInfo(`getRefundResponse completed`);
};


module.exports.GetAllBookings = async (req, res) => {
  var logger = new appLib.Logger();

  logger.logInfo(`GetAllBookings invoked()`);

  var GetBookingsRequest = new coreRequestModel.GetBookingsRequest(
    req
  );

  var functionContext = {
    error: null,
    res: res,
    logger: logger,
  };

  logger.logInfo(
    `GetBookingsRequest() :: Customer request: ${JSON.stringify(GetBookingsRequest)}`
  );

  var requestContext = {
    UserRef: GetBookingsRequest.UserRef,
  };


  try {
    let getCustomerDetailsDbResult = await databaseHelper.getAllBookingDetails(
      functionContext,
      requestContext
    );

    GetBookingsResponse(functionContext, getCustomerDetailsDbResult);
  } catch (errIsCustomerPresent) {
    if (!errIsCustomerPresent.ErrorMessage && !errIsCustomerPresent.ErrorCode) {
      logger.logInfo(`GetBookingsResponse() :: Error :: ${errIsCustomerPresent}`);
      functionContext.error = new coreRequestModel.ErrorModel(
        constant.ErrorMessage.ApplicationError,
        constant.ErrorCode.ApplicationError
      );
    }

    logger.logInfo(
      `GetBookingsResponse() :: Error :: ${JSON.stringify(errIsCustomerPresent)}`
    );
    GetBookingsResponse(functionContext, null);
  }
};

var GetBookingsResponse = (functionContext, resolvedResult) => {
  var logger = functionContext.logger;
    
  var GetBookingsResponse = new coreRequestModel.GetBookingsResponse();

  if (functionContext.error) {
    GetBookingsResponse.Error = functionContext.error;
    GetBookingsResponse.Details = null;
  } else {
    GetBookingsResponse.Error = null;
    for (let index = 0; index < resolvedResult.length; index++) {
      GetBookingsResponse.Details.push({
        CustomerId: resolvedResult[index].Id,
        ShowName: resolvedResult[index].Name,
        Date: resolvedResult[index].Date,
        Time: resolvedResult[index].Time,
        Genre: resolvedResult[index].Genre,
        Quantity: resolvedResult[index].Quantity,
        Amount: resolvedResult[index].Amount,
      })
    }
  }
  appLib.SendHttpResponse(functionContext, GetBookingsResponse);
  logger.logInfo(
    `GetBookingsResponse  Response :: ${JSON.stringify(
      GetBookingsResponse
    )}`
  );
  logger.logInfo(`getRefundResponse completed`);
};