import { useForm } from 'react-hook-form';
import axios, { AxiosRequestConfig } from 'axios';

type Link = {
  link: string;
};

type SetLinkId = React.Dispatch<React.SetStateAction<string | null>>;

interface AddLinkFormProps {
  setLinkId: SetLinkId;
}

const AddLinkForm: React.FC<AddLinkFormProps> = ({ setLinkId }) => {
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
    <form onSubmit={handleSubmit(onFormSubmit)} className='fixed'>
      <input
        className='bg-slate-700 h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none'
        {...register('link', {
          required: {
            value: true,
            message: 'You must provide a URL',
          },
          pattern: {
            value: RegExp(
              `((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)`
            ),
            message: 'You must submit a URL with the correct format.',
          },
        })}
        type='text'
        placeholder='Enter long URL'
      />
      <div> {errors?.link?.message} </div>

      <button
        type='submit'
        className='absolute top-2 right-2 p-1 rounded-md dark:hover:bg-gray-600 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent'
      >
        <svg
          stroke='currentColor'
          fill='currentColor'
          strokeWidth='0'
          viewBox='0 0 20 20'
          className='h-4 w-4 rotate-90'
          height='1em'
          width='1em'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z'></path>
        </svg>
      </button>
    </form>
  );
};

export default AddLinkForm;
