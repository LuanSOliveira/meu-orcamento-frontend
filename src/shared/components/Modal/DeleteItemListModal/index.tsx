import { useAppDispatch } from '@/store/hooks';
import { changeProgressBarState } from '@/store/reducers/ProgressBarSlice';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

interface Props {
  modalStatus: boolean;
  setModalStatus: (value: boolean) => void;
  titleText: string;
  itemName: string;
  confirmActionText: string;
  cancelActionText: string;
  confirmAction: () => void;
}

const DeleteItemListModal = ({
  modalStatus,
  setModalStatus,
  titleText,
  itemName,
  confirmActionText,
  cancelActionText,
  confirmAction,
}: Props) => {
  const dispatch = useAppDispatch();

  function OnConfirm() {
    confirmAction();
    dispatch(changeProgressBarState({ value: true }));
    setModalStatus(false);
  }

  return (
    <Dialog
      open={modalStatus}
      onClose={() => setModalStatus(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{titleText}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Tem certeza que deseja deletar:{' '}
          <span className="font-bold">{itemName}</span>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setModalStatus(false)}>
          {cancelActionText}
        </Button>
        <Button onClick={() => OnConfirm()}>{confirmActionText}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteItemListModal;
