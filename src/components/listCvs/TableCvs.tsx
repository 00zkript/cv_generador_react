import { CvItem } from '@/types/Cv';
import { format } from '@formkit/tempo';

export interface TablesCvsType {
    data: CvItem[];
    renderMenu: (item: CvItem) => React.ReactNode;
}

function TablesCvs({ data, renderMenu }: TablesCvsType) {
    return (
        <table className="table-auto w-full table-c1">
            <thead>
                <tr className="text-center">
                    <th>Acción</th>
                    <th>Idioma</th>
                    <th>Nombre</th>
                    <th>Propósito</th>
                    <th>Version</th>
                    <th>Fecha creación</th>
                    <th>Ultima modificación</th>
                </tr>
            </thead>
            <tbody>
                {data?.map((item, index) => (
                    <tr key={index}>
                        <td className="text-center">{renderMenu(item)}</td>
                        <td>{item.language}</td>
                        <td>{item.name}</td>
                        <td>{item.subject}</td>
                        <td className="text-center">{item.version}</td>
                        <td className="text-center">
                            {format(item.created_at ?? '', 'medium', 'es-Pe')}
                        </td>
                        <td className="text-center">
                            {format(item.updated_at ?? '', 'medium', 'es-Pe')}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
export default TablesCvs;
