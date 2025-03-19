Feature: Metronome

Users will have the option to use a metronome to use while they practice wwith their instrument. 

As a user, I want to have an additional tool like a meternome, 
so that I can practice with my instrument outside of using the tuner only.

 - Specific: Users have an additional musican tool that would be aviable in the same app
 - Measurable: Users should be able to use the metronome without any errors in audio output
 - Achievable: Uses the phone's audio output to deliver the beat or clicky sound 
 - Relevant: Enables users to have an additional tool other than the main function(tuner)
 - Timebox: This should be implemented in phase 2

------------------------------------------------------------

Scenario: A musician who want to be in time

Given the user is practicing a music piece and wants to 'in time'
When the user goes to the metronome page and selects the options and how fast they would the metronome to be
Then the app will provide audio click or beat sound and act like a metronome for them to use as a tool
