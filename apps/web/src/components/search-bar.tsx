'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { searchRideSchema, type SearchRideInput } from '@sharetaxi/validation';

export function SearchBar({ cities }: { cities: Array<{ id: string; name: string }> }) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SearchRideInput>({
    resolver: zodResolver(searchRideSchema),
    defaultValues: {
      from: 'Kochi',
      to: 'Bengaluru',
      date: '2026-10-25',
      passengers: 2
    }
  });

  const onSubmit = (data: SearchRideInput) => {
    // Synthetic action for the prototype; kept explicit and development-safe.
    console.info('Search request', data);
  };

  return (
    <form className="search-panel" onSubmit={handleSubmit(onSubmit)}>
      <div className="input-wrap">
        <label htmlFor="from">From</label>
        <select id="from" {...register('from')}>
          {cities.map((city) => (
            <option key={city.id} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
        {errors.from ? <small>{errors.from.message}</small> : null}
      </div>

      <div className="input-wrap">
        <label htmlFor="to">To</label>
        <select id="to" {...register('to')}>
          {cities.map((city) => (
            <option key={city.id} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
        {errors.to ? <small>{errors.to.message}</small> : null}
      </div>

      <div className="input-wrap">
        <label htmlFor="date">Date</label>
        <input id="date" type="date" {...register('date')} />
        {errors.date ? <small>{errors.date.message}</small> : null}
      </div>

      <div className="input-wrap">
        <label htmlFor="passengers">Passengers</label>
        <input id="passengers" type="number" min={1} max={6} {...register('passengers')} />
        {errors.passengers ? <small>{errors.passengers.message}</small> : null}
      </div>

      <button className="primary-button" type="submit" style={{ gridColumn: 'span 4' }}>
        Search rides
      </button>
    </form>
  );
}
