// router.js
const { API_KEY, API_SECRET } = require("./config");
const Amadeus = require("amadeus");
const express = require("express");

// Create router
const router = express.Router();
// Create Amadeus API client
const amadeus = new Amadeus({
  clientId: process.env.client_id,
  clientSecret: process.env.client_secret,
});
const API = "api";
const hotelIds = [];
// City search suggestions
router.get(`/${API}/search`, async (req, res) => {
  try {
    const { keyword } = req.query;
    const response = await amadeus.referenceData.locations.get({
      keyword,
      subType: Amadeus.location.city,
    });

    await res.json(JSON.parse(response.body));
  } catch (err) {
    await res.json(err);
  }
});

// Querying hotels
router.get(`/${API}/hotels`, async (req, res) => {
  const { cityCode } = req.query;
  const response = await amadeus.referenceData.locations.hotels.byCity.get({
    cityCode,
  });
  try {
    await res.json(JSON.parse(response.body));
  } catch (err) {
    await res.json(err);
  }
});

// Querying hotel offers
router.get(`/${API}/hoteloffers`, async (req, res) => {
  try {
    const { hotelIds } = req.query;
    const response = await amadeus.shopping.hotelOffersSearch.get({
      hotelIds,
    });

    await res.json(JSON.parse(response.body));
  } catch (err) {
    await res.json(err);
  }
});

// Querying hotel offers
router.get(`/${API}/offers`, async (req, res) => {
  try {
    const { hotelId } = req.query;
    console.log(checkInDate + '' + checkOutDate);
    const response = await amadeus.shopping.hotelOffersByHotel.get({
      hotelId,
      checkInDate,
      checkOutDate
    });

    await res.json(JSON.parse(response.body));
  } catch (err) {
    await res.json(err);
  }
});
// Confirming the offer
router.get(`/${API}/offer`, async (req, res) => {
  try {
    const { offerId } = req.query;
    const response = await amadeus.shopping.hotelOffer(offerId).get();

    await res.json(JSON.parse(response.body));
  } catch (err) {
    await res.json(err);
  }
});
// Booking
router.post(`/${API}/booking`, async (req, res) => {
  try {
    const { offerId } = req.query;
    const { body } = req;
    const response = await amadeus.booking.hotelBookings.post(
      JSON.stringify({
        data: {
          offerId,
          guests: body.guests,
          payments: body.payments,
        },
      })
    );

    await res.json(JSON.parse(response.body));
  } catch (err) {
    await res.json(err);
  }
});

module.exports = router;
