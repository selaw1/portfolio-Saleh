// Dollar or percent input used by the zakat calculator (number helpers live in src/lib/numbers.ts)

export function AmountInput({
  id,
  label,
  hint,
  value,
  onChange,
  unit = '$',
}: {
  id: string;
  label: string;
  hint: string;
  value: string;
  onChange: (value: string) => void;
  unit?: '$' | '%';
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="block text-[15px] font-medium">{label}</span>
      <span className="mt-2 flex items-center rounded-xl bg-white ring-1 ring-inset ring-ink/15 focus-within:ring-2 focus-within:ring-evergreen">
        {unit === '$' && (
          <span className="pl-4 text-fog" aria-hidden="true">
            $
          </span>
        )}
        <input
          id={id}
          inputMode="decimal"
          autoComplete="off"
          placeholder="0"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full rounded-xl bg-transparent py-3 text-[16px] outline-none ${unit === '$' ? 'px-2' : 'pl-4 pr-2'}`}
        />
        {unit === '%' && (
          <span className="pr-4 text-fog" aria-hidden="true">
            %
          </span>
        )}
      </span>
      <span className="mt-1.5 block text-sm leading-snug text-fog">{hint}</span>
    </label>
  );
}
