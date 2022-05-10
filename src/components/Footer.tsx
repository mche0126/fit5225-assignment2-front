import React, { Component } from 'react';
import style from '@/app.module.scss';
import { Col, Container, Row } from 'react-bootstrap';

export default class Footer extends Component {
  render() {
    return (
      <>
        <div className={style.Footer}>
          <Container>
            <Row>
              <Col sm={4}>
                <img
                  className={style.footer_logo}
                  src="src/assets/icons/companyLogo.png"
                  alt="The company Logo"
                  height="100px"
                />
              </Col>
              <Col sm={8}>
                <Row>
                  <Col>
                    <div className={style.footer_col}>
                      <h4 className={style.footer_text}>
                        FIT5225 Assignment 2
                      </h4>
                      <ul>
                        <p className={style.footer_ul}>Group memeber:</p>
                        <li className={style.footer_text}>
                          Mingxuan Chen: 31303501{' '}
                        </li>
                        <li className={style.footer_text}>
                          Yanan Wu: 31093833{' '}
                        </li>
                        <li className={style.footer_text}>
                          Yuqi Xie: 31524605{' '}
                        </li>
                        <li className={style.footer_text}>
                          Zixuan Lei: 30392020{' '}
                        </li>
                      </ul>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}
