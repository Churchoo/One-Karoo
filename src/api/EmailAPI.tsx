import axios from 'axios';

export const sendEmail = async (email: InnerHTML, userName: string, userEmail: string, subject: string) => {

    const data = {
        userName,
        userEmail,
        body: email,
        subject
    }
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/getBox`,
      {
        headers: {
          "Access-Control-Allow-Origin": true,
          "Access-Control-Allow-Credentials": true,
        },
        data: data
      }
    );
    return response.data;
  };