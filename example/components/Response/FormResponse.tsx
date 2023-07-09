
type FormReponseType = {
  message: string,
  status: boolean,
}

const FormSubmitResponse = ({ message, status }: FormReponseType ) => {
  return (
    <div className={`w-full py-2 ${status ? 'text-green-600 border-green-600': 'text-red-600 border-red-600'} rounded-md mb-2 border-2 flex items-center justify-center `}>
      {message}
    </div>
  )
}

export default FormSubmitResponse