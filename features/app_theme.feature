Feature: App theme 

Users can chose the option to chose a light theme or dark theme for the visual apperance of the app.

As a user, I want to have the option to change app theme from light to dark or dark to light, so there can be a level of 
customization that would make me use the app more or be better for my eyes visually.

 - Specific: Users have the option to change app's theme
 - Measurable: Users should be able to change app's theme with the click of a button
 - Achievable: Uses a dark or light theme to visually change the app apperance
 - Relevant: Enables users to have a customization that would please their eyes
 - Timebox: This should be implemented in phase 2

------------------------------------------------------------

Scenario: Change to dark theme

Given the user is in light theme while using the app
When the user goes to settings page and changes theme from light to dark
Then the app will change to a dark visual apperance and stay that way until it is chnaged again
