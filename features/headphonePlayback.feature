Feature: HeadPhone Playback

Users can play a note and hear that note be played back at them through their headphones.

As a user, I want to hear the note in tune so I can match that with my own instrument and play along.

 - Specific: Users can use headphones to hear the note being played in tune
 - Measurable: Users should be able to hear the note in tuner clearly through their headphones
 - Achievable: Uses Phone audio output function
 - Relevant: Enables users to play along with the note they are hearing, to help with tuning
 - Timebox: This should be implemented in phase 2

------------------------------------------------------------

Scenario: the user play a note on their insturment 

Given the user plays a note while connected to their headphones 
When the app picks up on the note played
Then the app will play back the note but in tune 

