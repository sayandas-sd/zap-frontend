
export default function Input({
    label,
    onChange,
    placeholder,
    type = "text"
}: {
    label: string;
    onChange: (e: any)=> void;
    placeholder: string;
    type?: "text" | "password"
}) {
    return <div>
        <div className="text-sm">
            <label>{label}</label>
        </div>
        <input className="border rounded-xl px-2 py-2" 
               type={type} 
               placeholder={placeholder} 
               onChange={onChange}
        />
    </div>
}
