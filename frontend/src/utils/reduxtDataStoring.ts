import { addUserData } from '../store/datas/userDataSlice';
import axios from 'axios';

export interface HomeProps {
  token: string;
  decoded: string;
  email: string;
  decodedToken: any;
}

interface UserData {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  userName: string;
}

export const fetchData = async (accessToken: string, decodedToken: HomeProps, dispatch: any) => {

  try {
    const userFullData = await axios.post<UserData>(
      "http://localhost:3000/auth/user/storedata",
      decodedToken,{
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    console.log(userFullData);

    if (userFullData !== null) {
      dispatch(
        addUserData({
          id: userFullData.data._id,
          firstName: userFullData.data.firstName,
          lastName: userFullData.data.lastName,
          email: userFullData.data.email,
          phoneNumber: userFullData.data.phoneNumber,
          userName: userFullData.data.userName,
        })
      );
    }
  } catch (error) {
    console.error(error);
  }
};
