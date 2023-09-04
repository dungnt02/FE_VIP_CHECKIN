import React from 'react'
import { GiMuscleUp } from 'react-icons/gi';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { SiAmazongames } from 'react-icons/si';
import { BsArrowRight } from 'react-icons/bs';
import { FiMapPin } from 'react-icons/fi';
import { BiTime } from 'react-icons/bi';
import 'animate.css';
import { BsQrCode } from 'react-icons/bs';
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const HomePage = () => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [showReqr, setShowReqr] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { rootMargin: "300px" }
    );
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [isIntersecting]);

  useEffect(() => {
    if (isIntersecting) {
      ref.current.querySelectorAll(".hidden").forEach((el) => {
        el.classList.add("show");
      });
    } else {
      ref.current.querySelectorAll(".hidden").forEach((el) => {
        el.classList.remove("show");
      });
    }
  }, [isIntersecting]);
  return (
    <>
      <div className="wrapper">
        <header className="header">
          <div className="header-container">
            <div className="header-top">
              <img srcSet='/logo-vip.png' alt="" className="header-logo" />
            </div>
            <div className="header-main">
              <div className="header-content">
                <h1 className="header-heading animate__animated animate__backInUp animate__delay-1s">
                  Registering <span>Online is now much easier </span>
                </h1>
                <p className="header-desc animate__animated animate__fadeIn animate__delay-2s">
                  Vip Website is an interesting platform that will help you
                </p>
                <div className="header-actions animate__animated animate__tada animate__delay-3s animate__infinite">
                  <Link to="/register" className="btn btn--primary">Join for birtday</Link>
                </div>
              </div>
            </div>
          </div>
        </header>
        <main ref={ref}>
          <section className="introduce hidden">
            <div className="introduce-header">
              <h2 className="global-heading">
                Hey Vipers <span>Are you ready!</span>
              </h2>
              <p className="introduce-desc global-text animate__animated animate__flash animate__infinite">
                Vip club is not just a club but also a family
              </p>
            </div>
            <div className="introduce-list">
              <div className="introduce-item">
                <div className="introduce-icon bg-purple">
                  <GiMuscleUp />
                </div>
                <h3 className="introduce-title">
                  Effortless Band
                </h3>
                <p className="introduce-desc">
                  Simple and secure control of your organization’s financial and
                  legal transactions. Send customized invoices and contracts
                </p>
              </div>
              <div className="introduce-item">
                <div className="introduce-icon bg-orange">
                  <RiKakaoTalkFill />
                </div>
                <h3 className="introduce-title">
                  Topic Band
                </h3>
                <p className="introduce-desc">
                  Automate and track emails to individuals or groups. Skilline’s
                  built-in system helps organize your organization
                </p>
              </div>
              <div className="introduce-item">
                <div className="introduce-icon bg-blue">
                  <SiAmazongames />
                </div>
                <h3 className="introduce-title">Game Band</h3>
                <p className="introduce-desc">
                  Automate and track emails to individuals or groups. Skilline’s
                  built-in system helps organize your organization
                </p>
              </div>
            </div>
          </section>
          <section className="feature hidden">
            <div className="feature-header">
              <h2 className="global-heading animate__animated animate__heartBeat animate__infinite">About <span>Birtday Event</span></h2>
            </div>
            <div className="feature-main">
              <div className="feature-section">
                <div className="feature-image">
                  <img src="/sn.jpg" alt="" />
                </div>
                <div className="feature-content">
                  <ul className="feature-list">
                    <li className="feature-item">
                      <div className="feature-icon">
                        <FiMapPin />
                      </div>
                      <p className="feature-text">
                        Teachers don’t get lost in the grid view and have a
                        dedicated Podium space.
                      </p>
                    </li>
                    <li className="feature-item">
                      <div className="feature-icon">
                        <BiTime />
                      </div>
                      <p className="feature-text">
                        Teachers don’t get lost in the grid view and have a
                        dedicated Podium space.
                      </p>
                    </li>
                    <li className="feature-item">
                      <div className="feature-icon">
                        <BsQrCode />
                      </div>
                      <p className="feature-text">
                        Teachers don’t get lost in the grid view and have a
                        dedicated Podium space.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          <section className="testimonial">
            <div className="testimonial-content">
              <h3 className="global-caption">TESTIMONIAL</h3>
              <h2 className="global-heading testimonial-heading">What They Say?</h2>
              <p className="global-text testimonial-desc">
                Skilline has got more than 100k positive ratings from our users
                around the world.
              </p>
              <p className="global-text testimonial-desc">
                Some of the students and teachers were greatly helped by the
                Skilline.
              </p>
              <p className="global-text testimonial-desc">
                Are you too? Please give your assessment
              </p>
              <a href="#!" className="testimonial-button">
                <span>See Instruction</span>
                <div className="testimonial-arrow">
                  <BsArrowRight />
                </div>
              </a>
            </div>
            <div className="testimonal-slider">
              <div className="testimonial-item"></div>
            </div>
          </section>
        </main>
      </div>
      {showReqr && <div className="overlay"></div>}
      <div className='sidebar'>
        <div className={showReqr ? `sidebarMenuShow` : `sidebarMenu`}>
          <div className="sidebarMenuInner">
            <div>
              <span>
                <img srcSet='/logo-vip.png' alt="" className="header-logo" />
              </span>
            </div>
            <Link to="/renew-qr" className="btn-qr">Lấy lại mã QR</Link>
            <div className='btn-qr' onClick={handleShow}>Mã QR chuyển khoản</div>
          </div>
          <label onClick={() => setShowReqr(!showReqr)} className="sidebarIconToggle">Cấp lại QR
          </label>
        </div>
      </div >
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <div className='transfer-content'>
            <div className='transfer-qr'>
              <img src="/qr-bank.png" alt="" />
            </div>
            <div className='transfer-infor'>
              <p>Chủ tài khoản: Nguyễn Tiến Dũng</p>
              <p>Ngân hàng: MB Bank</p>
              <p>STK: 0339832545</p>
              <p>Với kinh phí đóng về CLB là 180.000đ mỗi người, hãy quét mã QR sau với nội dung:</p>
              <p>Họ tên + "đóng tiền sinh nhật"</p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default HomePage