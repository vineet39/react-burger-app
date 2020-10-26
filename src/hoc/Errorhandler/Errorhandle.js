import React, { Component } from 'react';

class Errorhandle extends Component {
    constructor(props) {
        super(props)
        this.state = { errorOccurred: false }
    }

    componentDidCatch() {
        this.setState({ errorOccurred: true })
    }

    render() {
        return this.state.errorOccurred ? <h1 style={{display: "block", marginTop: "20px", textAlign: "center"}}> Something went wrong!</h1> : this.props.children
    }
}

export default Errorhandle;