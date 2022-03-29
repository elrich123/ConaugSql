module.exports.ErrorCode = {
  ApplicationError: 500,
  Invalid_Request: 501,
  Success: 200,
  Invalid_Authentication: 10001,
  Invalid_Password: 10002,
  Invalid_Amount: 10003,
  Insufficient_Balance: 10003,
  Max_Tickets_booked: 10006,
  Cannot_Refund_Ticket: 10007

};

module.exports.ErrorMessage = {
  ApplicationError: "An Application Error Has Occured",
  Invalid_Request: "Invalid Request",
  Invalid_Login_Credentials: "Invalid username or password",
  Invalid_Authentication: "No matching records.",
  Invalid_Amount: "Amount has to be 100 minimum",
  Insufficient_Balance: "You have Insufficient balance in your wallet",
  Max_Tickets_booked: "Max tickets booked are 10",
  Cannot_Refund_Ticket: "Tickets can be cancelled max 3 days before event"

};
