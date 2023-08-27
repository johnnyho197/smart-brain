import React from 'react';
import Loading from '../Loading/Loading';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      errorMessage: '',
      isLoading: false,
    }
  }

  onNameChange = (event) => {
    this.setState({name: event.target.value})
  }

  onEmailChange = (event) => {
    this.setState({email: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({password: event.target.value})
  }

  onConfirmPasswordChange = (event) => {
    this.setState({confirmPassword: event.target.value})
  }

  onSubmitRegister = (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });
        
    const {password, confirmPassword} = this.state;
    if (password !== confirmPassword) {
      // Show an error message and keep the spinner visible for a brief moment
      this.setState({ errorMessage: "Passwords don't match" });
      setTimeout(() => {
        this.setState({ isLoading: false });
      }, 1000); // Delay to allow the spinner to show
      return;
    }
    setTimeout(()=>{
      fetch('https://arcane-island-25206-23d9d6621691.herokuapp.com/register', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
          name: this.state.name
        })
      })
        .then(response => response.json())    //     .catch((error)=> console.log("Error", error)) // TODO: handle errors better than just logging them to the console!  
        .then(user => {
          if (user.id) {
            this.props.loadUser(user)
            this.props.onRouteChange('home');
          } else {
            this.setState({ isLoading: false });
            this.setState({ errorMessage: "User exists" });
          }
        })
        .finally(() => {
          this.setState({ isLoading: false }); // Set isLoading back to false
        });
    },1000)
  }

  render() {
    if (this.state.isLoading){
      return (
        <Loading />
      )
    }
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <form className="measure" onSubmit={this.onSubmitRegister}>
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input
                  className="pa2 mb3 input-reset ba bg-transparent hover-bg-black hover-white w-100 f6"
                  type="text"
                  name="name"
                  required
                  id="name"
                  onChange={this.onNameChange}
                />
              </div>
              <div className="mv1">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  className="pa2 mb3 input-reset ba bg-transparent hover-bg-black hover-white w-100 f6"
                  type="email"
                  required
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv1">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                  className="pa2 mb3 input-reset ba bg-transparent hover-bg-black hover-white w-100 f6"
                  type="password"
                  required
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
              <div className="mv1">
                <label className="db fw6 lh-copy f6" htmlFor="password">Confirm Password</label>
                <input
                  className="pa2 mb3 input-reset ba bg-transparent hover-bg-black hover-white w-100 f6"
                  type="password"
                  required
                  name="password"
                  id="confirm-password"
                  onChange={this.onConfirmPasswordChange}
                />
              </div>
            </fieldset>
            <button className="b ph3 pv2 mt0 input-reset ba b--black bg-transparent grow pointer f5 dib">
              Register
            </button>
            <div className="error-message">
              {this.state.errorMessage && (
                <p className='b mt4 dark-red f4'>{this.state.errorMessage}</p>
              )}
            </div>
          </form>
        </main>
      </article>
    );
  }
}

export default Register;