var express = require("express");
var router = express.Router();

var customerApi = require("../api/customerAPI");


router.post("/signup", customerApi.CustomerSignUp);
router.post("/login", customerApi.CustomerSignIn);
router.post("/addshows", customerApi.AddShows);
router.post("/shows", customerApi.GetAllShows);
router.post("/addmoneytowallet", customerApi.AddMoneyToWallet);
router.post("/placebooking", customerApi.BookTicketsForShow);
router.post("/refundbooking", customerApi.RefundSHowTickets);
router.get("/bookings", customerApi.GetAllBookings);


module.exports = router;
