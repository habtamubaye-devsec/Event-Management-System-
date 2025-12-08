const BookingModel = require("../model/bookingModel");
const EventModel = require("../model/eventsModel");

const getAdminReport = async (req, res) => {
  try {
    const { startDate, endDate, eventId } = req.body;

    let query = {};
    if (eventId) query = { event: eventId };

    if (startDate && endDate) {
      query = {
        ...query,
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate + "T23:59:59.999Z"),
        },
      };
    }

    const bookings = await BookingModel.find(query);

    const totalBooking = bookings.length;
    const cancelledBooking = bookings.filter(
      (b) => b.status === "canceled"
    ).length;
    const totalTickets = bookings.reduce((acc, b) => acc + b.ticketCount, 0);
    const cancelledTickets = bookings
      .filter((b) => b.status === "canceled")
      .reduce((acc, b) => acc + b.ticketCount, 0);
    const totalRevenueCollected = bookings.reduce(
      (acc, b) => acc + b.totalAmount,
      0
    );
    const totalRevenueRefunded = bookings
      .filter((b) => b.status === "canceled")
      .reduce((acc, b) => acc + b.totalAmount, 0);

    const responseObj = {
      totalBooking,
      cancelledBooking,
      totalTickets,
      cancelledTickets,
      totalRevenueCollected,
      totalRevenueRefunded,
    };

    if (!eventId) {
  return res.status(200).json({ data: responseObj });
}

// Fetch single event correctly
const event = await EventModel.findById(eventId);
if (!event) {
  return res.status(404).json({ message: "Event not found" });
}

const ticketTypesInEvent = event.ticketTypes || [];

// Build ticket sales breakdown
const ticketTypesAndThierSales = ticketTypesInEvent.map((ticketType) => {
  const bookingWithTicketType = bookings.filter(
    (booking) => booking.ticketType === ticketType.name
  );

  return {
    name: ticketType.name,
    ticketsSold: bookingWithTicketType.reduce(
      (acc, booking) => acc + booking.ticketCount,
      0
    ),
    revenue: bookingWithTicketType.reduce(
      (acc, booking) => acc + booking.totalAmount,
      0
    ),
  };
});

responseObj.ticketTypesAndThierSales = ticketTypesAndThierSales;


    return res.status(200).json({ data: responseObj });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getUserReport = async (req, res) => {
  try {
    const userId = req.user._id
    const booking = await BookingModel.find({user: userId});

    const totalBooking = booking.length;
    const cancelledBooking = booking.filter(
      (booking) => booking.status === "canceled"
    ).length;
    const totalTickets = booking.reduce(
      (acc, booking) => acc + booking.ticketCount,
      0
    );
    const cancelledTickets = booking
      .filter((booking) => booking.status === "canceled")
      .reduce((acc, booking) => acc + booking.ticketCount, 0);
    const totalAmountSpent = booking.reduce(
      (acc, booking) => acc + booking.totalAmount,
      0
    );
    const totalAmountReceivedAsRefund = booking
      .filter((booking) => booking.status === "canceled")
      .reduce((acc, booking) => acc + booking.totalAmount, 0);

    const responseObj = {
      totalBooking,
      cancelledBooking,
      totalTickets,
      cancelledTickets,
      totalAmountSpent,
      totalAmountReceivedAsRefund,
    };

    return res.status(200).json({ data: responseObj });
  } catch (error) {
    res.starus(500).json({ message: error.message });
  }
};

module.exports = { getAdminReport, getUserReport };