import React from 'react';
import Loading from '../Loading/Loading'

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: '',
      isLoading: false,
    }
  }

  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  }

  onSubmitSignIn = () => {
    this.setState({ isLoading: true }); // Set isLoading to true
  
    // Introduce a delay of 300 milliseconds (adjust as needed)
    setTimeout(() => {
      fetch('http://localhost:3000/signin', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: this.state.signInEmail,
          password: this.state.signInPassword
        })
      })
        .then(response => response.json())
        .then(user => {
          if (user.id) {
            this.props.loadUser(user);
            this.props.onRouteChange('home');
          }
        })
        .catch(err => console.log(err))
        .finally(() => {
          this.setState({ isLoading: false }); // Set isLoading back to false
        });
    }, 300); // Adjust the delay time as needed
  }

  render() {
    const { onRouteChange } = this.props;
    if (this.state.isLoading){
      return (
        <Loading />
      )
    }
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <form className="measure" onSubmit={this.onSubmitSignIn}>
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 f6"
                  type="email"
                  required
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 f6"
                  type="password"
                  name="password"
                  required
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt3">
              <h3>Don't have an account?</h3>
              <p  onClick={() => onRouteChange('register')} className="f5 link dim black db pointer">Register</p>
            </div>
          </form>
        </main>
      </article>
    );
  }
}

export default Signin;