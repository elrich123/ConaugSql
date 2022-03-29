var momentTimezone = require("moment-timezone");
class errorModel {
  constructor(errorMessage, errorCode) {
    this.ErrorCode = errorCode;
    this.ErrorMessage = errorMessage;
  }
}

class validateRequest {
  constructor(req) {
    (this.apiUri = req.path),
      (this.authToken = req.headers.authtoken),
      (this.authorization = req.headers.authorization),
      (this.appVersion = req.headers.appversion);
  }
}

class validateResponse {
  constructor() {
    (this.Error = null), (this.RequestID = null), (this.Details = null);
  }
}

class customerSignUpRequest {
  constructor(req) {
      this.name = req.body.Name ? req.body.Name : "";
      this.phone = req.body.Phone ? req.body.Phone : "";
      this.email = req.body.Email ? req.body.Email : "";
      this.password = req.body.Password ? req.body.Password : "";
      this.imgUrl = req.body.ImgUrl ? req.body.ImgUrl : "";
      this.currentTimestamp = momentTimezone
          .utc(new Date(), "YYYY-MM-DD HH:mm:ss")
          .tz("Asia/Kolkata")
          .format("YYYY-MM-DD HH:mm:ss ");
  }
}

class customerSignUpResponse {
  constructor() {
      this.Details = {
          CustomerRef: null,
          responseCode : null,
      };
      (this.Error = null);
  }
}

class customerSignInRequest {
  constructor(req) {
      this.email = req.body.Email ? req.body.Email : "";
      this.password = req.body.Password ? req.body.Password : "";
      this.currentTimestamp = momentTimezone
          .utc(new Date(), "YYYY-MM-DD HH:mm:ss")
          .tz("Asia/Kolkata")
          .format("YYYY-MM-DD HH:mm:ss ");
  }
}

class customerSignInResponse {
  constructor() {
      this.Details = {
          CustomerRef: null,
          Name: null,
          Phone: null,
          ImageUrl: null,
          WalletAmount: null,
          responseCode : null,
      };
      (this.Error = null);
  }
}

class addShowRequest {
  constructor(req) {
      this.name = req.body.Name ? req.body.Name : "";
      this.genre = req.body.Genre ? req.body.Genre : "";
      this.Date = req.body.Date ? req.body.Date : "";
      this.time = req.body.Time ? req.body.Time : "";
      this.price = req.body.Price ? req.body.Price : "";
      this.currentTimestamp = momentTimezone
      .utc(new Date(), "YYYY-MM-DD HH:mm:ss")
      .tz("Asia/Kolkata")
      .format("YYYY-MM-DD HH:mm:ss ");
  }
}

class addShowResponse {
  constructor() {
      this.Details = {
          ShowRef: null,
          responseCode: null
      };
      (this.Error = null);
  }
}

class getShowRequest {
  constructor(req) {
      this.name = req.body.Name ? req.body.Name : '';
      this.genre = req.body.Genre ? req.body.Genre : '';
      this.Date = req.body.Date ? req.body.Date : '';
  }
}

class getShowResponse {
  constructor() {
      this.Details = [];
      (this.Error = null);
  }
}

class addMoneyToWalletRequest {
  constructor(req) {
      this.userRef = req.body.UserRef ? req.body.UserRef : null;
      this.price = req.body.Price ? req.body.Price : null;
  }
}

class addMoneyToWalletResponse {
  constructor() {
      this.Details = {
          previousAmount: null,
          newAmount: null,
      };
      (this.Error = null);
  }
}

class bookticketsRequest {
  constructor(req) {
      this.UserRef = req.body.UserRef ? req.body.UserRef : null;
      this.bookingData = req.body.BookingData ? req.body.BookingData : null;
      this.currentTimestamp = momentTimezone
          .utc(new Date(), "YYYY-MM-DD HH:mm:ss")
          .tz("Asia/Kolkata")
          .format("YYYY-MM-DD HH:mm:ss ");
  }
}

class bookticketsResponse {
  constructor() {
    this.Details = {
        bookingRef: null,
    };
    (this.Error = null);
  }
}

class refundTicketsRequest {
  constructor(req) {
      this.UserRef = req.body.UserRef ? req.body.UserRef : null;
      this.bookingRef = req.body.BookingRef ? req.body.BookingRef : null;
  }
}

class refundTicketsResponse {
  constructor() {
    this.Details = {
        bookingRef: null,
        WalletAmount: null
    };
    (this.Error = null);
}
}

class getBookingsRequest {
  constructor(req) {
      this.UserRef = req.query.UserRef ? req.query.UserRef : null;
  }
}

class getBookingsResponse {
  constructor() {
    this.Details = [];
    (this.Error = null);
}
}


module.exports.ErrorModel = errorModel;
module.exports.ValidateRequest = validateRequest;
module.exports.ValidateResponse = validateResponse;
module.exports.CustomerSignUpRequest = customerSignUpRequest;
module.exports.CustomerSignUpResponse = customerSignUpResponse;
module.exports.CustomerSignInRequest = customerSignInRequest;
module.exports.CustomerSignInResponse = customerSignInResponse;
module.exports.AddShowRequest = addShowRequest;
module.exports.AddShowResponse = addShowResponse;
module.exports.GetShowRequest = getShowRequest;
module.exports.GetShowResponse = getShowResponse;
module.exports.AddMoneyToWalletRequest = addMoneyToWalletRequest;
module.exports.AddMoneyToWalletResponse = addMoneyToWalletResponse;
module.exports.BookticketsRequest = bookticketsRequest;
module.exports.BookticketsResponse = bookticketsResponse;
module.exports.RefundTicketsRequest = refundTicketsRequest;
module.exports.RefundTicketsResponse = refundTicketsResponse;
module.exports.GetBookingsRequest = getBookingsRequest;
module.exports.GetBookingsResponse = getBookingsResponse;