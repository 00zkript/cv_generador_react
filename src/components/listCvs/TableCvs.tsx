import { Cv } from '@/types/Cv';
import { format } from '@formkit/tempo';

export interface TablesCvsType {
    data: Cv[];
    renderMenu: (item: Cv) => React.ReactNode;
}

function TablesCvs({ data, renderMenu }: TablesCvsType) {
    return (
        <table className="table-auto w-full">
            <thead>
                <tr className="text-center bg-muted">
                    <th className="px-4 py-2">Acción</th>
                    <th className="px-4 py-2">#ID</th>
                    <th className="px-4 py-2">Título</th>
                    <th className="px-4 py-2">Rol Objetivo</th>
                    <th className="px-4 py-2">Empresa</th>
                    <th className="px-4 py-2">Versiones</th>
                    <th className="px-4 py-2">Fecha</th>
                </tr>
            </thead>
            <tbody>
                {data?.map((item) => (
                    <tr key={item.id} className="border-b">
                        <td className="text-center px-2 py-3">{renderMenu(item)}</td>
                        <td className="text-center px-2 py-3">
                            {String(item.id).padStart(4, '0')}
                        </td>
                        <td className="px-2 py-3">{item.title || 'Sin título'}</td>
                        <td className="px-2 py-3">{item.target_role || '-'}</td>
                        <td className="px-2 py-3">{item.target_company || '-'}</td>
                        <td className="text-center px-2 py-3">{item.versions?.length || 0}</td>
                        <td className="text-center px-2 py-3">
                            {item.created_at ? format(item.created_at, 'medium', 'es-PE') : '-'}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
export default TablesCvs;
