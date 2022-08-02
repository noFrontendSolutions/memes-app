<p align="center">
  <a  target="blank"><img src="https://www.dropbox.com/s/je9q398fafqnhys/react-logo.png?raw=1" alt="Nest Logo" /></a>
</p>

# Memes App

---

Similar to websites like **Giphy**, **Tenor**, or **Memedroid**, this is an app that lets you see, rate, and share memes (on the most basic level). It also features a simple editor to let your create your own memes.

Here is a link to a preview of to the prototype (deployed on Digital Ocean):

[To the App](http://46.101.193.133)
--
---


|                       Contributions                        |                    Create a Meme                    |
| :-------------------------------------------------------------------------: | :-------------------------------------------------------------------------: |
| ![](https://www.dropbox.com/s/ni40z8bmzj96djy/memes-home.jpg?raw=1) | ![](https://www.dropbox.com/s/9rhb4mfzp7bcvl2/memes-creator-wide.jpg?raw=1) |
<br>

|                       Vote on Memes and leave  Comments                     |                     JWT Authentication                     |
| :-------------------------------------------------------------------------: | :-------------------------------------------------------------------------: |
| ![](https://www.dropbox.com/s/y15yv3g0jpneb22/meme-details.jpg?raw=1) | ![](https://www.dropbox.com/s/ypwzw2b9017asn8/login.jpg?raw=1) |
<br>


## Tech Stack:

- Frontend: **React JS**, **Canvas JS**<br>
- API: **Nest JS**, **Prisma**, **Postgres** 
- Deploy: **Digital Ocean**, **Ubuntu**

Remark: I didn't use either **Create React App** or **Vite** to build the app, but I used my own cracker-jack React development environment to build the app: [CRASSR](https://github.com/noFrontendSolutions/crassr) (explaining the sizeable JS bundle of ~500kb :)

## Features:

- JWT authentication
- Data validation of inputs and files on both frontend and backend
- Extensive error handling
- Responsive design
- Uses Nginx as Webserver 

The link below leads to the repo with the source code for the **API**:

[https://github.com/noFrontendSolutions/memes-app-api](https://github.com/noFrontendSolutions/memes-app-api)

Theoretically there are still a gazillion features I could and should implement, but I'll probably move on to another project.