import React, { PureComponent } from "react";
import { connect as reduxConnect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Grid, Row, Col, PageHeader, Image, Button } from "react-bootstrap";
import { Link } from 'react-router-dom'
import Moment from "react-moment";
import { getJob, clearJob } from "../../actions/JobPosts";
import "./styles.css";
import "./stylesM.css";

const mapStateToProps = ({ JobDetail }) => ({
  JobDetail
});

const mapDispatchToProps = {
  getJob,
  clearJob
};

class JobDetail extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      interested: false
    };
  }

  componentWillMount() {
    this.getState(this.props);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getJob(id);
  }

  componentWillReceiveProps(nextProps) {
    this.getState(nextProps);
  }

  componentWillUnmount() {
    this.props.clearJob()
  }

  getState = props => {
    const { JobDetail } = props;
    this.setState({
      JobDetail
    });
  };

  workjob = () => {
    this.setState({ interested: !this.state.interested });
  };

  render() {
    const { JobDetail, interested } = this.state;
    return JobDetail ? (
      <Grid className="JobDetail">
        <Row>
          <Col xs={12}>
            <PageHeader style={{ textAlign: "center" }}>
              {JobDetail.title}
              <h4 style={{ textAlign: "center" }}>
                By: <Link className="jobAuthor" to={`/profile/${JobDetail.author}`}>{JobDetail.author_username}</Link>
              </h4>
            </PageHeader>
          </Col>
        </Row>
        <Row>
          <Col className="jobImage" xs={12}>
            <Image src={JobDetail.image} responsive rounded />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <i class="fas fa-map-marked-alt fa-2x"> {JobDetail.address}</i>
          </Col>
          <Col xs={12}>
            <i class="fas fa-tags fa-2x"> {JobDetail.tags}</i>
          </Col>
          {interested
            ? [
                <Col xs={12}>
                  <i class="fas fa-phone fa-2x"> {JobDetail.phone_number}</i>
                </Col>,
                <Col xs={12}>
                  <i class="fas fa-envelope fa-2x"> {JobDetail.email}</i>
                </Col>
              ]
            : null}
          <Col xs={12}>
            <i class="fas fa-clock fa-2x">
              {" "}
              <Moment fromNow>{JobDetail.date_created}</Moment>
            </i>
          </Col>
          <Col xs={12} className="Details">
            <div className="description blockNoWrap">
              <p>{JobDetail.description}</p>
            </div>
          </Col>
        </Row>
        <Button onClick={this.workjob} style={{marginBottom: '20px'}}>
          {interested ? "Close Job" : "Work This Job"}
        </Button>
      </Grid>
    ) : null;
  }
}
export default withRouter(
  reduxConnect(mapStateToProps, mapDispatchToProps)(JobDetail)
);
