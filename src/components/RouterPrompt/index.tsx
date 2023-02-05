import React, {
  ReactNode,
  FC,
  memo,
  useEffect,
  useCallback,
  useState,
  useRef,
} from "react";
import { Modal } from "antd";
import { useBlocker } from "hooks/usePrompt";

interface IProps {
  when: boolean;
  message: string | ReactNode;
  onOk?: () => void;
}

const RouterPrompt: FC<IProps> = (props) => {
  const { when, onOk, message } = props;
  const [open, setOpen] = useState<boolean>(false);
  const blockRef = useRef<any>(null);

  useBlocker((tx: any) => {
    setOpen(true);
    blockRef.current = tx;
  }, when);

  const handleConfirm = () => {
    blockRef.current.retry();
    onOk?.();
  };
  return (
    <Modal
      title="温馨提示"
      visible={open}
      onCancel={() => setOpen(false)}
      onOk={() => handleConfirm()}
    >
      {message}
    </Modal>
  );
};
export default memo(RouterPrompt);
