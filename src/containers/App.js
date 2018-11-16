import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Row, Col} from 'antd';

import 'antd/dist/antd.css';

import * as prosConsSelectors from '../store/prosCons/selectors'
import * as prosConsActions from '../store/prosCons/actions'

import ProsConsTable from '../components/ProsConsTable';

class App extends Component {

    componentDidMount() {
        this.props.onGetProsCons();
    }

    render() {
        return (
            <div>
                <Row>
                    <Col span={12}>
                        <ProsConsTable name={`Pro's`} data={this.props.pros ? this.props.pros : []} onUpdate={this.props.onUpdatePros}/>
                    </Col>
                    <Col span={12}>
                        <ProsConsTable name={`Con's`} data={this.props.cons ? this.props.cons : []} onUpdate={this.props.onUpdateCons}/>
                    </Col>
                </Row>
            </div>
        );
    }
}

/**
 * @param state
 * @returns {{userId, pros, cons}}
 */
const mapStateToProps = (state) => {
    return {
        userId: prosConsSelectors.getUserId(state),
        pros: prosConsSelectors.getPros(state),
        cons: prosConsSelectors.getCons(state)
    }
};

/**
 * @param dispatch
 * @returns {{onGetProsCons: (function(): *), onUpdatePros: (function(*=): *), onUpdateCons: (function(*=): *)}}
 */
const mapDispatchToProps = (dispatch) => {
    return {
        onGetProsCons: () => dispatch(prosConsActions.getProsCons()),
        onUpdatePros: (pros) => dispatch(prosConsActions.updatePros(pros)),
        onUpdateCons: (cons) => dispatch(prosConsActions.updateCons(cons))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
