## Spring Boot + React Classroom Application ##

This example will show how to :

~ register user by name;

~ listing all users in table; 

~ perform logout of the current user without Security implementations and delete this user from the list;

~ raising/lower hand of the current user.

Could be useful, for example, if you are trying to implement a real-time classroom(Teams) logic with ReactJS.


### Build and run

#### Prerequisites

- Java >16
- Maven > 3.0

#### From terminal
1. Open *MyVirtualClassroom* folder in CommandPrompt, then type:
    ```
    $ mvn spring-boot:run
   
   (Alternatyvely you can run this command from 
       your IDE in Maven plugin)

2. Go on project's *frontend* folder, then type:
    ```
    $ npm install
    $ npm start
    ```
### Usage

- After launching the application on the client side(localhost:3000),
  you can log in into it with any name
- You can check, that the name you entered appeared on the screen
- Now you can click on your name in the upper right corner of the screen => 
  logout function will appear. Using this function, 
  you will be taken to the login screen, and your name will be removed from the table.
- Login one more time with a different name. 
- Make sure that the past name was deleted from the table and replaced by your new name.
- Now click on the Actions context menu, and the Raise Hand Up button will appear. 
  Click on the button (alas, nothing will change right now because there is no websocket connection),
  go back to that context menu and make sure the button name has changed to Raise Hand Down.   
- Now click the button again to make Raise Hand Up appear and use it one last time. 
  Now refresh the page and make sure that the hand appears next to your name.

