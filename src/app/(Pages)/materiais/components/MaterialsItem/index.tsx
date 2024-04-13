import {
  DeleteOutlineOutlined,
  EditOutlined,
  InfoOutlined,
} from '@mui/icons-material';
import { IOtherMaterials } from '../../types';
import { Tooltip } from '@mui/material';

interface Props {
  material: IOtherMaterials;
}

const MaterialsItem = ({ material }: Props) => {
  const noImageLink = 'https://img.icons8.com/fluency/70/no-camera.png';
  function MathValue() {
    const value: number =
      parseFloat(material.value.replace('.', '').replace(',', '.')) /
      parseFloat(material.weight.replace(',', '.'));
    return value.toFixed(2).replace('.', ',');
  }

  return (
    <div className="flex items-center justify-between gap-3 p-3 border rounded shadow-md">
      <div className="flex gap-3 items-center w-2/4">
        <img
          className="rounded-full shadow"
          width={70}
          height={70}
          src={material.imageLink ? material.imageLink : noImageLink}
          alt="Imagem do material"
        />
        <div>
          <h2 className="font-bold text-xl">{material.name}</h2>
          <h3 className="text-sm">
            {material.type === 'weight' ? 'Peso' : 'Unidade'}
          </h3>
        </div>
      </div>
      <div className="w-1/4">
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
      <div className="flex gap-4 w-1/4 justify-center">
        <Tooltip
          title={
            material.otherInformations
              ? material.otherInformations
              : 'Sem informações adicionais'
          }
          arrow
          placement="left"
          enterDelay={100}
          leaveDelay={100}
        >
          <InfoOutlined className="text-green-500" />
        </Tooltip>
        <Tooltip
          title="Editar"
          arrow
          placement="bottom"
          enterDelay={100}
          leaveDelay={100}
        >
          <EditOutlined className="cursor-pointer text-blue-700" />
        </Tooltip>
        <Tooltip
          title="Deletar"
          arrow
          placement="bottom"
          enterDelay={100}
          leaveDelay={100}
        >
          <DeleteOutlineOutlined className="cursor-pointer text-red-800" />
        </Tooltip>
      </div>
    </div>
  );
};

export default MaterialsItem;
