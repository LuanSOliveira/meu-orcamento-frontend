import {
  DeleteOutlineOutlined,
  EditOutlined,
  InfoOutlined,
} from '@mui/icons-material';
import { IOtherMaterials } from '../../types';

interface Props {
  material: IOtherMaterials;
}

const MaterialsItem = ({ material }: Props) => {
  function MathValue() {
    const value: number =
      parseFloat(material.value.replace('.', '').replace(',', '.')) /
      parseFloat(material.weight.replace(',', '.'));
    return value.toFixed(2).replace('.', ',');
  }

  return (
    <div className="flex items-center justify-between gap-3 p-3 border rounded shadow-md">
      <div className="flex gap-3 items-center">
        <img
          className="rounded-full shadow"
          width={70}
          height={70}
          src={material.imageLink}
          alt="Imagem do material"
        />
        <div>
          <h2 className="font-bold text-xl">{material.name}</h2>
          <h3 className="text-sm">
            {material.type === 'weight' ? 'Peso' : 'Unidade'}
          </h3>
        </div>
      </div>
      <div>
        <h2 className="font-bold text-xl">
          {`R$ ${material.value}`}
          <span className="text-sm">{` (R$ ${MathValue()})`}</span>
        </h2>
        <h3 className="text-xl">
          {material.type === 'weight'
            ? `${material.weight}g`
            : `${material.weight}un`}
          <span className="text-sm">
            {material.type === 'weight' ? ` (1g)` : ' (1un)'}
          </span>
        </h3>
      </div>
      <div className="flex gap-4">
        <InfoOutlined />
        <EditOutlined />
        <DeleteOutlineOutlined />
      </div>
    </div>
  );
};

export default MaterialsItem;
