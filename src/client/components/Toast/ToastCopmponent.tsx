import React, { FC } from 'react';
import { Row, Col, Toast } from 'react-bootstrap';

interface IToast {
  show: boolean;
  message: string;
  changeShow(status: boolean): void;
}

export const ToastCopmponent: FC<IToast> = (props: IToast) => {
  const changeHandler = () => {
    props.changeShow(false);
  };

  return (
    <Row>
      <Col>
        <Toast
          style={{
            position: 'absolute',
            bottom: 5,
            right: 20,
          }}
          onClose={changeHandler}
          show={props.show}
          delay={3000}
          autohide
          animation={true}
        >
          <Toast.Body>{props.message}</Toast.Body>
        </Toast>
      </Col>
    </Row>
  );
};
