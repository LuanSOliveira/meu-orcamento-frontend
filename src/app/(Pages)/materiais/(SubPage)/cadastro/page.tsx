'use client';
import CreateMaterialForm from './components/CreateMaterialForm';

const CreateMaterialsPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Cadastrar Novo Material</h1>
      <CreateMaterialForm />
    </div>
  );
};

export default CreateMaterialsPage;
