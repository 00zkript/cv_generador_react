export default function NoRecords({ text = ' registros'}: { text?: string }) {
    return (
        <div className="text-center p-2 bg-slate-300 dark:bg-slate-600 uppercase">No hay {text}</div>
    )
}