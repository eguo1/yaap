# Yet Another Analytics Platform

A different approach to the analytics engine created by [jmm526](https://github.com/jmm526) for our group project Pet Shop.

To demo the visualization -
1. It is deployed on Heroku [here](https://yet-another-analytics-platform.herokuapp.com/)
2. In a separate window or tab, access this personal fork of Pet Shop [here](https://pet-shop-demo.herokuapp.com/)
3. Click on any of the `Add to Cart` buttons on the landing page
4. (Optional) Visual breakdown by browser available at: https://yet-another-analytics-platform.herokuapp.com/browser

Built with a click event handler on a component in Pet Shop that sends a post request to a backend api route of the deployed YAAP. This data is saved in a PostgreSQL database.

Every second, YAAP component rendering the Victory bar chart requests an update from the db. The queried data is transformed into a format Victory can interface with through a couple Sequelize class and instance models.

Thanks for reading!
