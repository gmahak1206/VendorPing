# VendorPing
VendorPing is a real-time, location-based notification system that bridges the gap between customers and street vendors, especially in large apartment complexes or high-rise colonies. The system ensures that customers do not miss their chance to purchase items, such as fresh vegetables, from vendors passing by, even when the vendors' presence might otherwise go unnoticed due to distance or low sound. By notifying customers when a vendor is within proximity, VendorPing helps vendors increase their sales and provides customers with more convenience.

## Features
* Vendor Registration: Vendors can register and update their location in real-time via GPS.
* Customer Registration: Customers can sign up and receive notifications when a vendor is within 500 meters of their location.
* Real-Time Notifications: Customers are alerted when a registered vendor is nearby, ensuring they never miss out on purchasing fresh goods.
* Location Tracking: Vendor locations are tracked every 10 seconds to ensure timely notifications.
* Proximity-Based Search: The system uses MongoDB’s $near query to fetch customers within a 500-meter range of a vendor’s current location.
## Technology Stack
* Frontend: React (or HTML, CSS, and JavaScript if needed)
* Backend: Node.js with Express for routing
* Database: MongoDB (for storing vendor and customer data, including location coordinates)
* Location Services: GPS-based tracking for vendors
* Notifications: Push notifications (or alternative method) to alert customers

## Project overview and instructions
* Installation
  
Clone the repository: 

`git clone https://github.com/gmahak1206/VendorPing.git`


# Usage
* Vendors can sign in through the frontend, register their location, and update their product availability. The system will track their location every 10 seconds and store it for proximity-based notifications.

* Customers can register to receive notifications. When a vendor comes within 500 meters of their location, they will be notified in real-time, ensuring they don't miss the vendor.

## Future Enhancements
* Integration of more precise location-tracking methods using advanced GPS APIs.
* Adding support for various notification methods, such as SMS or in-app notifications.
* Vendor-Customer interaction features, such as product pre-ordering or requests.
* A map interface for customers to visually track nearby vendors.
