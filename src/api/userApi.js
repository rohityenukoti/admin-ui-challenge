const API_URL = 'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json';

export const fetchUsers = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    // console.log('Fetched users:', data);
    return data;
  } catch (error) {
    console.error('There was a problem fetching the users:', error);
    return [];
  }
};