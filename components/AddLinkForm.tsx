import { useForm } from 'react-hook-form';
import axios, { AxiosRequestConfig } from 'axios';

type Link = {
  link: string;
};

type SetLinkId = (linkId: string) => void;

const AddLinkForm = ({ setLinkId }: { setLinkId: SetLinkId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Link>();
  const onFormSubmit = async (values: Link) => {
    const config: AxiosRequestConfig = {
      url: '/api/addlink',
      headers: {
        'Content-Type': 'application/json',
      },
      data: values,
      method: 'post',
    };
    const res = await axios(config);
    if (res.status === 200) {
      setLinkId(res.data.link);
    }
  };
  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <input
        {...register('link', {
          required: {
            value: true,
            message: 'You must provide a URL',
          },
          pattern: {
            value: RegExp(
              `((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)`
            ),
            message:
              'You must submit a URL with the correct format. Example: https://www.google.com',
          },
        })}
        type='text'
        placeholder='Enter URL'
      />
      <div> {errors?.link?.message} </div>

      <button type='submit'>Shorten</button>
    </form>
  );
};

export default AddLinkForm;
