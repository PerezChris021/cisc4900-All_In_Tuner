Feature: Tuner Design

Users will have the option to change how the tuner looks visually

As a user, I want to have the customization to change the tuner apperance, 
so that I better visually see the tuner in terms of the data it is outputing to the phone screen

 - Specific: Users will have ~2 options to chose from to change the tuner apperance(visually)
 - Measurable: Users should be able to change the tuner apperance without any error or lack of other fuctions
 - Achievable: Uses the phone's setting page to chose the option that best pleases the user
 - Relevant: Enables users to have customization in the tuner apperance and the best that suits their style
 - Timebox: This should be implemented in phase 2

------------------------------------------------------------

Scenario: A user who doesn't like the tuner visually and how it shows information

Given the user is using the tuner to tune the instrument 
When the user goes to the setting page and changes the tuner apperance to another option 
Then the app will then update the tuner page with the new option chosen by the user
