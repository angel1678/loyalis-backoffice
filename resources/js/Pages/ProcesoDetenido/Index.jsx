import { useState } from 'react';
import axios from 'axios';
import { router } from '@inertiajs/react';
import DialogMovimiento from '@/Components/DialogMovimiento';
import DataTableProceso from '@/Components/DataTableProceso';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function ProcesoDetenido({ procesos, search, statu, auth, errors }) {
  const breadCrumb = [
    { label: 'Judicial', icon: 'judicial' },
    { label: 'Detenido' }
  ];

  const [dialog, setDialog] = useState(false);
  const [procesoId, setProcesoId] = useState([]);
  const [movimiento, setMovimiento] = useState([]);

  const handleShowMovimientos = async (id) => {
    const { data } = await axios.get(route('proceso.movimiento', id));
    setProcesoId(id);
    setMovimiento(data);
    setDialog(true);
  };

  const handlePage = (page, statu, search) => {
    const data = Object.fromEntries(Object.entries({ page, statu, search })
      .filter(([_, v]) => v != null && v != ''));
    router.get(route('proceso-detenido.index'), data, { preserveState: true });
  };

  return (
    <AuthenticatedLayout
      auth={auth}
      title="Procesos Judiciales Detenidos"
      errors={errors}
      breadCrumb={breadCrumb}
    >
      <DialogMovimiento proceso={procesoId} model={movimiento} visible={dialog} onHide={() => setDialog(false)} />
      <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
        <div className="p-2">
          <DataTableProceso
            auth={auth}
            value={procesos.data}
            onMovimiento={handleShowMovimientos}

            filterSearch={search}
            filterStatu={statu}
            rows={100}
            first={procesos.from}
            totalRecords={procesos.total}
            onPage={handlePage}
          />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
