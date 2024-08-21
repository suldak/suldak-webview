import { useMutation } from '@tanstack/react-query';
import axiosInstance from 'apis/axiosInstance';

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

interface EnrollResponse {
  data: boolean;
  errorCode: number;
  message: string;
  success: boolean;
}

const enrollReservation = async (email: string): Promise<EnrollResponse> => {
  if (!email || !isValidEmail(email)) {
    throw new Error('Invalid email address');
  }

  try {
    const { data } = await axiosInstance.post<EnrollResponse>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/reservation/user`,
      {
        userEmail: email,
      },
    );

    return data;
  } catch (error) {
    console.error('Error enrolling reservation:', error);
    throw error;
  }
};

export const useEnrollReservation = () => {
  return useMutation({
    mutationFn: enrollReservation,
    onSuccess: (data) => {
      console.log('Reservation enrolled successfully:', data);
    },
    onError: (error) => {
      console.error('Error enrolling reservation:', error);
    },
  });
};
