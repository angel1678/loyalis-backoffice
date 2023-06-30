import { useState } from 'react';
import axios from 'axios';
import { Head } from '@inertiajs/react';
import DialogMovimiento from '@/Components/DialogMovimiento';
import DataTableProceso from '@/Components/DataTableProceso';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DialogLastUpdate from '@/Components/DialogLastUpdate';

export default function Proceso({ procesos, auth, errors }) {
  const [dialog, setDialog] = useState(false);
  const [procesoId, setProcesoId] = useState([]);
  const [movimiento, setMovimiento] = useState([]);

  const [dialogLastUpdate, setDialogLastUpdate] = useState(false);
  const [lastDetalle, setLastDetalle] = useState([]);

  const handleLastUpdates = async () => {
    const { data } = await axios.get(route('proceso-last-update.index'));
    setLastDetalle(data);
    setDialogLastUpdate(true);
  };

  const handleShowMovimientos = async (id) => {
    const { data } = await axios.get(route('proceso.movimiento', id));
    setProcesoId(id);
    setMovimiento(data);
    setDialog(true);
  };

  return (
    <AuthenticatedLayout
      auth={auth}
      errors={errors}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Procesos Judiciales</h2>}
    >
      <Head title="Procesos Judiciales" />

      <DialogMovimiento proceso={procesoId} model={movimiento} visible={dialog} onHide={() => setDialog(false)} />

      <DialogLastUpdate isAdmin={auth.isAdmin} model={lastDetalle} visible={dialogLastUpdate} onHide={() => setDialogLastUpdate(false)} />

      <div className="py-6">
        <div className="max-w-[96rem] mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <DataTableProceso
                auth={auth}
                modal={procesos}
                isCrud
                isLastUpdates
                onLastUpdates={handleLastUpdates}
                onMovimiento={handleShowMovimientos}
              />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
