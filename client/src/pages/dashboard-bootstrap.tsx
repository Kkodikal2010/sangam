import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Container, Row, Col, Card, Button, Navbar, Nav, Badge } from "react-bootstrap";
import { apiRequest } from "@/lib/queryClient";

interface Profile {
  id: string;
  user: {
    first_name: string;
    last_name: string;
    email: string;
  };
  age: number;
  gender: string;
  location: string;
  bio: string;
  profile_completeness: number;
}

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const { data: profile, isLoading } = useQuery({
    queryKey: ['/profile/'],
    enabled: !!user,
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setLocation('/login');
  };

  if (isLoading) {
    return (
      <Container className="mt-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }

  return (
    <>
      <Navbar bg="white" expand="lg" className="shadow-sm border-bottom">
        <Container>
          <Navbar.Brand href="#" style={{ color: '#e91e63', fontWeight: 'bold', fontSize: '1.5rem' }}>
            Sangam
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#dashboard" className="fw-semibold">Dashboard</Nav.Link>
              <Nav.Link href="#matches" className="fw-semibold">Matches</Nav.Link>
              <Nav.Link href="#profile" className="fw-semibold">Profile</Nav.Link>
            </Nav>
            <Nav>
              <Button variant="outline-danger" onClick={handleLogout}>
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="my-5">
        <Row>
          <Col lg={8}>
            <Card className="mb-4">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <div className="flex-grow-1">
                    <h4 className="mb-1">Welcome back, {user?.first_name || 'User'}!</h4>
                    <p className="text-muted mb-0">Find your perfect match with Sangam</p>
                  </div>
                  <Badge 
                    bg={profile?.profile_completeness > 80 ? 'success' : profile?.profile_completeness > 50 ? 'warning' : 'danger'}
                    className="fs-6"
                  >
                    {profile?.profile_completeness || 0}% Complete
                  </Badge>
                </div>
                <Row>
                  <Col md={6}>
                    <Button 
                      variant="primary" 
                      size="lg" 
                      className="w-100 mb-2"
                      style={{ backgroundColor: '#e91e63', borderColor: '#e91e63' }}
                    >
                      Find Matches
                    </Button>
                  </Col>
                  <Col md={6}>
                    <Button variant="outline-primary" size="lg" className="w-100 mb-2">
                      Update Profile
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Card>
              <Card.Header className="bg-light">
                <h5 className="mb-0">Recent Activity</h5>
              </Card.Header>
              <Card.Body>
                <p className="text-muted">No recent activity to show. Start exploring matches!</p>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="mb-4">
              <Card.Header className="bg-light">
                <h5 className="mb-0">Your Profile</h5>
              </Card.Header>
              <Card.Body>
                {profile ? (
                  <>
                    <div className="text-center mb-3">
                      <div 
                        className="rounded-circle bg-secondary d-inline-flex align-items-center justify-content-center"
                        style={{ width: '80px', height: '80px' }}
                      >
                        <span className="text-white fs-3">
                          {profile.user.first_name?.charAt(0) || 'U'}
                        </span>
                      </div>
                    </div>
                    <h6 className="text-center mb-3">
                      {profile.user.first_name} {profile.user.last_name}
                    </h6>
                    <div className="small text-muted">
                      <p><strong>Age:</strong> {profile.age}</p>
                      <p><strong>Location:</strong> {profile.location || 'Not specified'}</p>
                      <p><strong>Gender:</strong> {profile.gender}</p>
                    </div>
                    <Button variant="outline-primary" size="sm" className="w-100">
                      Edit Profile
                    </Button>
                  </>
                ) : (
                  <p className="text-muted">Profile not found</p>
                )}
              </Card.Body>
            </Card>

            <Card>
              <Card.Header className="bg-light">
                <h5 className="mb-0">Quick Stats</h5>
              </Card.Header>
              <Card.Body>
                <div className="d-flex justify-content-between mb-2">
                  <span>Profile Views</span>
                  <Badge bg="secondary">0</Badge>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Matches</span>
                  <Badge bg="secondary">0</Badge>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Messages</span>
                  <Badge bg="secondary">0</Badge>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}