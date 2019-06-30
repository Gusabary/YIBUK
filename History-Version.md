# History Version

### v1.0 

**2019.3.30** release

**v1.1**  2019.4.2

- fixed a bug, which resulted in that when books in cart were deleted from booklist by administrator, some books would not be displayed properly in cart page
- updated version of one of the back-end dependencies, commons-fileupload, to 1.3.3

### v2.0

**2019.4.23** 

- refactored back-end to SpringBoot + Hibernate 
- adjusted HTTP api

**v2.1** 2019.4.28

- fixed bugs, which resulted in that
  - visitors and administrators could add to cart and purchase
  - time displayed in orders were not correct due to timezone problems
  - ISBN could not be shown normally
- some beautification
  - the shadow of iconButton + and - is a circle now
  - filter bar is more beautiful now

**v2.2** 2019.5.1

- can empty cart now
- beautified dialogs
- toggling validity will not lead to page refreshing now
- administrators' info won't be shown when managing customers

### v3.0

**2019.5.17**

- refactored database, adding OrderItem table
- adjusted HTTP api

**v3.1** 2019.5.29

- added Test in back-end
- applied Spring Security with JWT to protect api

### v4.0

**2019.5.31** deploy

+ deployed the whole project to cloud server
+ applied some strategies to defend flooding attack

**v4.1** 2019.6.11

+ added api about book review, stored using MongoDB
+ added dao layer at back-end 

### v5.0

**2019.6.30** 

+ applied Drone, can CI/CD now
+ added comment function
+ beautified front-end UI

##### Last-modified date: 2019.6.30, 6 p.m.

