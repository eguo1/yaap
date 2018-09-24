# Yet Another Analytics Platform

[![Watch a Video Demo Here!](https://img.youtube.com/vi/zjRDirITviM/0.jpg)](https://www.youtube.com/watch?v=zjRDirITviM)

To demo the visualization -
1. It is deployed on Heroku [here](https://yet-another-analytics-platform.herokuapp.com/)
2. In a separate window or tab, access this personal fork of Pet Shop [here](https://pet-shop-demo.herokuapp.com/)
3. Click on any of the `Add to Cart` buttons on the landing page
4. (Optional) Visual breakdown by browser available at: https://yet-another-analytics-platform.herokuapp.com/browser

A click event handler on Pet Shop sends a post request to an endpoint of YAAP. The event is logged.

Every second, the YAAP React frontend requests an update from its db. The queried data is transformed using Sequelize class/instance methods into the specific format that the Victory component can use to visualize.

Thanks for checking it out!
