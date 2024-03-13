import { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useQuery } from "@tanstack/react-query"
import { useDebounce } from "../../hooks/useDebounce"

function AgeComponent() {

  type Inputs = {
    name: string
  }

  const[value, setValue] = useState<string>('');
  const debouncedValue = useDebounce(value, 3000);

  const schema = yup.object().shape({
    name: yup.string().required('This field is required')
    .test('is-not-numeric', 'Значение должно быть текстовым', (value) => {
      return !/^\d+$/.test(value);
    })
  })

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
    resolver: yupResolver(schema)
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const fetchAge = async () => {
    if (!debouncedValue) {
      return null; // Возвращаем null, если значение пустое
    }
    const response = await fetch(`https://api.agify.io?name=${debouncedValue}`);
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json()
  }

  const {data} = useQuery({queryKey: ['name', debouncedValue], queryFn: fetchAge})
  console.log(data);


  return (
    <>
    <h1>AgeComponent</h1>
    <form onSubmit={handleSubmit((d) => console.log(d))}>
      {errors.name && <p>{errors.name.message}</p>}
      <input
        {...register("name")}
        onChange={handleChange}
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