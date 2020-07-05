import React from 'react'
import { connect } from 'react-redux'
import { startLogin } from '../actions/auth'

export const LoginPage = ({ startLogin }) => (
    <div className="box-layout">
        <div className="box-layout__box">
            <h1 className="box-layout__title">Expense Tracker</h1>
            <p>Let's monitor your expenses from today!</p>
            <button onClick={startLogin} className="button button--login">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" className="button--login-google-sign-in-img"/> Log in with Google
            </button>
            <p style={{fontSize:9, fontWeight:300, marginTop:'10px'}}>Please enable third-party cookies to use the app</p>
        </div>
    </div>
)

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
})

export default connect(undefined, mapDispatchToProps)(LoginPage)