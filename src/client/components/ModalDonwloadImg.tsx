import React, { useState } from 'react';
import { Button, Form, Modal, ProgressBar } from 'react-bootstrap';
import { ToastCopmponent } from './Toast/ToastCopmponent';
import superagent, { ResponseError, Response } from 'superagent';
import { useAuth } from '../context/auth.context';
import { useTranslation } from 'react-i18next';

interface IProps {
  show: boolean;
  onHide: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Event<T = EventTarget> {
  target: T;
}

interface authToke {
  Authorization: string;
}

export const ModalDonwloadImg: React.FC<IProps> = (props: IProps) => {
  const { token } = useAuth();
  const { t } = useTranslation();
  const [imgFile, setImgFile] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [isLoad, setIsLoad] = useState(false);
  const [loadPerCent, setLoadPerCent] = useState(0);

  const loadHandler = (event: Event<HTMLInputElement>) => {
    if (event.target.files[0].type === 'image/jpeg') {
      setImgFile({ imgFile, ...event });
    } else {
      setToastMessage('Type does not fit. Need jpg.');
      setShowToast(true);
    }
  };

  const sendFile = (event: Event<HTMLInputElement>, header: authToke) => {
    superagent
      .post('http://127.0.0.1:3333/api/auth/upload')
      .attach('file', event.target.files[0])
      .on('progress', (event) => {
        if (!isLoad) {
          setIsLoad(true);
        }
        setLoadPerCent(event.percent);
      })
      .set(header)
      .set('accept', 'json')
      .end(function (err: ResponseError, res: Response) {
        setToastMessage(res.text);
        setShowToast(true);
        if (res.status === 200) {
          setIsLoad(false);
          setImgFile(null);
        }
      });
  };

  const submitFileHandler = (event: React.MouseEvent<HTMLElement>) => {
    sendFile(imgFile, { Authorization: `Bearer ${token}` });

    setToastMessage('Enter name.');
    setShowToast(true);

    event.preventDefault();
  };

  const changeShow = (status: boolean) => {
    setShowToast(status);
    setToastMessage(null);
  };

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered className="modal-wrapper">
      <div>{isLoad ? <ProgressBar now={loadPerCent} label={`${Math.trunc(loadPerCent)}%`} /> : null}</div>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{t('Profile_upload_window')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.File id="formcheck-api-custom" custom>
            <Form.File.Input isValid type="file" onChange={loadHandler} />
            <Form.File.Label data-browse={t('Select a file')}>{t('Click to select a file')}</Form.File.Label>
            {showToast ? <ToastCopmponent show={showToast} message={toastMessage} changeShow={changeShow} /> : null}
          </Form.File>
        </Form>
      </Modal.Body>
      <Button className="btn-modal-donwload" onClick={submitFileHandler}>
        {t('Download')}
      </Button>
      <Modal.Footer>
        <Button onClick={() => props.onHide(false)}>{t('Close')}</Button>
      </Modal.Footer>
    </Modal>
  );
};
