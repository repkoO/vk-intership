import { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

function AgeComponent() {

  type Inputs = {
    name: string
  }

  const[value, setValue] = useState<string>('');
  const schema = yup.object().shape({
    name: yup.string().required('This field is required')
    .test('is-not-numeric', 'Значение должно быть текстовым', (value) => {
      return !/^\d+$/.test(value);
    })
  })

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
    resolver: yupResolver(schema)
  })

  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <>
    <div>AgeComponent</div>

    <form onSubmit={handleSubmit((d) => console.log(d))}>
      {errors.name && <p>{errors.name.message}</p>}
      <input
        {...register("name")}
        onChange={changeValue}
        type="text"
        value={value}
        required
        name="name"
        placeholder='Введите имя' />
      <button type="submit">123</button>
    </form>
    </>
  )
}

export default AgeComponent