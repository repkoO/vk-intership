import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useQuery } from "@tanstack/react-query"


function AgeComponent() {

  type Inputs = {
    name: string
  }

  const[value, setValue] = useState<string>('');
  const [fetchEnabled, setFetchEnabled] = useState<boolean>(false)

  const schema = yup.object().shape({
    name: yup.string().required('This field is required')
    .test('is-not-numeric', 'Значение должно быть текстовым', (value) => {
      return !/^\d+$/.test(value);
    })
  })

  const { register, formState: { errors } } = useForm<Inputs>({
    resolver: yupResolver(schema)
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const fetchAge = async () => {
    if (!value) {
      return null;
    }
    const response = await fetch(`https://api.agify.io?name=${value}`);
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json()
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setFetchEnabled(true)
    }, 3000)

    return () => {
      clearTimeout(timer)
      setFetchEnabled(false)
    }
  }, [value]);

  const {data} = useQuery({
    queryKey: ['name', value],
    queryFn: fetchAge,
    enabled: fetchEnabled
  });

  const handleFetch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setFetchEnabled(true)
  }

  return (
    <>
    <h1>AgeComponent</h1>
    <form>
      {errors.name && <p>{errors.name.message}</p>}
      <input
        {...register("name")}
        onChange={handleChange}
        type="text"
        value={value}
        required
        name="name"
        placeholder='Введите имя' />
      <button type="submit" onClick={handleFetch}>Show your age</button>

      {data && <p>Age: {data.age}</p>}
    </form>
    </>
  )
}

export default AgeComponent