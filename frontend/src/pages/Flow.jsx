import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react'
import * as customer from '../services/customer';
import * as vendor from '../services/vendor';
import Alert from 'react-bootstrap/Alert';

const CustomerFlow = ({ setShowDangerAlert }) => {
  const [flow, setFlow] = useState('signin');

  const CustomerSignIn = () => {
    // State for email and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault(); 

      try {
        await customer.signin({
          email,
          password,
        })

        window.location.reload();
      } catch (error) {
        setShowDangerAlert(true);
        setTimeout(() => setShowDangerAlert(false), 3000);
      }
    };
  
    return (
      <>
        <div>
          <h1 style={{ display: 'inline' }}>Sign in </h1>
          <span>
            or <a href="#" onClick={() => { setFlow('signup'); }} style={{ color: 'blue' }}>Sign up</a>
          </span>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="vendorEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
  
          <Form.Group className="mb-3" controlId="vendorPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </>
    );
  };
  
  const CustomerSignUp = () => {
    // State for each input field
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
  
    
    const handleSubmit = async (e) => {
      e.preventDefault(); 

      try {
        await customer.siginup({
          name,
          email,
          password,
          retypePassword,
        })

        window.location.reload();
      } catch (error) {
        setShowDangerAlert(true);
        setTimeout(() => setShowDangerAlert(false), 3000);
      }
    };
  
    return (
      <>
        <div>
          <h1 style={{ display: 'inline' }}>Sign up </h1>
          <span>
            or <a href="#" onClick={() => { setFlow('signin'); }} style={{ color: 'blue' }}>Sign in</a>
          </span>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="vendorName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)} // Update name state
            />
          </Form.Group>
  
          <Form.Group className="mb-3" controlId="vendorEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
  
          <Form.Group className="mb-3" controlId="vendorPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state
            />
          </Form.Group>
  
          <Form.Group className="mb-3" controlId="vendorRetypePassword">
            <Form.Label>Retype-Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={retypePassword}
              onChange={(e) => setRetypePassword(e.target.value)} // Update retypePassword state
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </>
    );
  };

  return (
    <>
      {
        flow === 'signin' ? 
        <CustomerSignIn/> :
        <CustomerSignUp/>
      }
    </>
  )
}

const VendorSignin = ({ setShowDangerAlert }) => {
  // State for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      await vendor.signin({
        email,
        password,
      })

      window.location.reload();
    } catch (error) {
      setShowDangerAlert(true);
      setTimeout(() => setShowDangerAlert(false), 3000);
    }
  };

  return (
    <>
      <div>
        <h1>Sign In</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="vendorEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="vendorPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

const Flow = ({ setMode, mode }) => {
  const [showDangerAlert, setShowDangerAlert] = useState(false);

  return (
    <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', height: '100vh', padding: '1rem'}}>
      <main>
        <div style={{margin: '1rem'}}>
          {
            mode === 'vendor' ?
            <VendorSignin setShowDangerAlert={setShowDangerAlert}/> :
            <CustomerFlow setShowDangerAlert={setShowDangerAlert}/>
          }
        </div>
        <Alert variant='danger' show={showDangerAlert}>Operation unsucessful, please try again!</Alert>
      </main>
      <footer style={{ marginTop: "auto" }}>
        {console.log(mode)}
        <Button variant={mode === 'vendor' ? "primary" : "secondary"} onClick={() => setMode('vendor')}>Vendor</Button>{' '}
        <Button variant={mode === 'customer' ? "primary" : "secondary"} onClick={() => setMode('customer')}>Customer</Button>
      </footer>
    </div>
  )
}

export default Flow;