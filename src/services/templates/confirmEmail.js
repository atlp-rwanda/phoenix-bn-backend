import dotenv from 'dotenv';

dotenv.config();

export const confirmEmail = (emailData) => {
  const link = `${process.env.HOST}/api/v1/users/verify/${emailData.token}`;
  const template = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'>
        <title>Document</title>
        <style>
        *{
            box-sizing: border-box;
            margin:0px;
            padding:0px;
        }
        html,body{
            font-family: poppins;
        }
        .logo{
            width:100%;
            height:auto;
            background:#f2f2f2;
            padding:5px 0px 5px 10px;
            
        }
        .logo > div{
            font-size:20px;
        }
        .content{
            padding:10px;
            color:#121111;
        }
        .button{
            background-color: #03CE75;
            padding:13px;
            border:0px;
            font-size:15px;
            margin-top:28px;
            text-decoration: none;
            color:#121111
        }
    </style>
    </head>
    <body>
        <div class="wrapper">
           <div class="logo">
            <div>BareFoot</div>
           </div>
          <center> <div class="content">
            <p>Hello ${emailData.name} ,Thank you for registering on barefoot</p>
            <p>To Finish your registration click on the button bellow</p>
            <br>
            <a href="${link}" class="button">Confirm My Account</a>
        </div></center>
        </div>
    </body>
    </html>`;
  return template;
};
