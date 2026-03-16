import { Cv } from '@/types/Cv';
import { format } from '@formkit/tempo';

export interface TablesCvsType {
    data: Cv[];
    renderMenu: (item: Cv) => React.ReactNode;
}

function TablesCvs({ data, renderMenu }: TablesCvsType) {
    return (
        <table className="table-auto w-full table-c1">
            <thead>
                <tr className="text-center">
                    <th>Acción</th>
                    <th>#ID</th>
                    <th>Título</th>
                    <th>Rol Objetivo</th>
                    <th>Empresa Objetivo</th>
                    <th>Versiones</th>
                    <th>Fecha creación</th>
                </tr>
            </thead>
            <tbody>
                {data?.map((item) => (
                    <tr key={item.id}>
                        <td className="text-center">{renderMenu(item)}</td>
                        <td className="text-center">
                            {String(item.id).padStart(4, '0')}
                        </td>
                        <td>{item.title || 'Sin título'}</td>
                        <td>{item.target_role || '-'}</td>
                        <td>{item.target_company || '-'}</td>
                        <td className="text-center">{item.versions?.length || 0}</td>
                        <td className="text-center">
                            {item.created_at ? format(item.created_at, 'medium', 'es-PE') : '-'}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
export default TablesCvs;
