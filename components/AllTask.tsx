export default function AllTask({
    type,
    index
}:{
    type?: string;
    index: number
}) {
    return <div className="border border-black py-8 px-4 w-[300px] justify-center">
        <div className="flex justify-center text-xl ">
            <div className="font-bold">
                {index}.
            </div>
            <div>
                {type}
            </div>
        </div>
    </div>
}