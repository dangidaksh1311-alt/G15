function FormField({ label, name, type = "text", value, onChange, error, placeholder, autoComplete }) {
  return <div className="form-field">
    <label htmlFor={name}>{label}</label>
    <input id={name} name={name} type={type} value={value} onChange={onChange} placeholder={placeholder || label} autoComplete={autoComplete} aria-invalid={Boolean(error)} aria-describedby={error ? `${name}-error` : undefined} />
    {error && <small className="field-error" id={`${name}-error`}>{error}</small>}
  </div>;
}
export default FormField;
