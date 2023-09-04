import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UserInfor from './UserInfor';
import Password from './Password';
import History from './History';

const Profile = ({ show, setShow }) => {
    return (
        <>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>User Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs
                        defaultActiveKey="profile"
                        id="justify-tab-example"
                        className="mb-3"
                        justify
                    >
                        <Tab eventKey="home" title="User Information">
                            <UserInfor show={show} setShow={setShow} />
                        </Tab>
                        <Tab eventKey="profile" title="Change Password">
                            <Password show={show} setShow={setShow} />
                        </Tab>
                        <Tab eventKey="contact" title="History">
                            <History />
                        </Tab>
                    </Tabs>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Profile;