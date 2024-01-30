import axios from 'axios';

interface Account {
  id:number, 
  Username: string, 
  EmailAddress:string, 
  Password:string, 
  salt:string, 
  GoogleUser: boolean
}
export const CreateAccount = async (account: Account) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/CreateAccount`,
      {
        headers: {
          "Access-Control-Allow-Origin": true,
          "Access-Control-Allow-Credentials": true,
        },
        data: account
      }
    );
    return response.data;
  };

  export const GetAccount = async (account: Account) => {
  console.log(account)
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/GetAccount`,
      {
        headers: {
          "Access-Control-Allow-Origin": true,
          "Access-Control-Allow-Credentials": true,
        },
        data: account
      }
    );
    return response.data;
  };