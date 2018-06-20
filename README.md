# Yet Another Analytics Platform

A different approach to the analytics engine created by [jmm526](https://github.com/jmm526) for our group project Pet Shop.

To demo the visualization -
1. It is deployed on Heroku [here](https://yet-another-analytics-platform.herokuapp.com/)
2. In a separate window or tab, access this personal fork of Pet Shop [here](https://pet-shop-demo.herokuapp.com/)
3. Click on any of the `Add to Cart` buttons on the landing page
4. (Optional) Visual breakdown by browser available at: https://yet-another-analytics-platform.herokuapp.com/browser

A click event handler on Pet Shop that sends a post request to an API endpoint of YAAP and the event is logged. Every second, the YAAP client requests an update from its db. The queried data is transformed using Sequelize class/instance methods into a format that the Victory component can interface with.

Thanks for checking it out!
