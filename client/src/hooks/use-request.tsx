import axios, { AxiosError } from "axios";
import { useState } from "react";

export default function useRequest({
  url,
  method,
  body,
  onSucess,
}: {
  url: string;
  method: "get" | "post";
  body: { [key: string]: any };
  onSucess?: () => void;
}) {
  const [errors, setErrors] = useState<{ message: string }[]>([]);

  const doRequest = async () => {
    try {
      const response = await axios[method](url, body);

      if (onSucess) {
        onSucess();
      }

      return response.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<{
          errors: { message: string }[];
        }>;
        setErrors(axiosError.response?.data.errors || []);
      }
    }
  };

  return { doRequest, errors };
}
