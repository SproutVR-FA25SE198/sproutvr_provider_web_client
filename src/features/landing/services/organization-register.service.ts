import axios, { AxiosError } from 'axios';

const ACCOUNT_BASE_URL = import.meta.env.VITE_BASE_ACCOUNT_URL;

export interface OrganizationRegisterRequestDto {
  OrganizationName: string;
  Address: string;
  ContactPhone: string;
  ContactEmail: string;
}

const getLocalizedErrorMessage = (apiMessage: string): string => {
  if (apiMessage?.startsWith('Organization with this email or phone requested!')) {
    return 'Ai đó đã yêu cầu đăng ký tổ chức bằng email hoặc số điện thoại này. Vui lòng liên hệ với chúng tôi nếu bạn cho rằng đây là sự nhầm lẫn.';
  }
  return 'Yêu cầu đăng ký thất bại. Vui lòng thử lại sau';
};

export const submitOrganizationRegisterRequest = async (payload: OrganizationRegisterRequestDto) => {
  if (!ACCOUNT_BASE_URL) {
    throw new Error('Missing environment variable: VITE_BASE_ACCOUNT_URL');
  }

  try {
    const url = `${ACCOUNT_BASE_URL}/organization-register-requests`;
    const { data } = await axios.post(url, payload);
    console.log(data)
    return data;
  } catch (error: any) {
    console.log(error.response?.data)
    const apiMessage = error.response?.data.Message || '';
    console.log(apiMessage);
    const localizedMessage = getLocalizedErrorMessage(apiMessage);
    throw new AxiosError(localizedMessage);
  }
};