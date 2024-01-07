export const YourComponent = () => {
  return (
    <div className="comp-container">
      <div className="auth-comp content">
        {/* Nav pills */}
        <ul className="nav nav-pills" role="tablist">
          <li className="nav-item">
            <a className="nav-link active" data-toggle="pill" href="#login">
              Login
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="pill" href="#regis">
              Register
            </a>
          </li>
        </ul>

        {/* Tab panes */}
        <div className="tab-content">
          <div id="login" className="container tab-pane active">
            <form>
              <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Email address</label>
                <input
                  type="email"
                  className="form-control is-valid"
                  id="exampleFormControlInput1"
                  placeholder="name@example.com"
                />
                <small id="emailHelp" className="form-text text-muted">
                  Well never share your email with anyone else.
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control is-invalid"
                  id="exampleInputPassword1"
                  placeholder="Password"
                />
                <small id="emailHelp" className="form-text text-muted">
                  Password incorrect.
                </small>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
          <div id="regis" className="container tab-pane fade">
            <form>
              <div className="form-group">
                <label htmlFor="InputName">Full Name</label>
                <input
                  type="text"
                  className="form-control is-valid"
                  id="InputName"
                  placeholder="Full Name"
                />
                <small id="emailHelp" className="form-text text-muted">
                  Well never share your email with anyone else.
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="InputUsername">Username</label>
                <input
                  type="text"
                  className="form-control is-valid"
                  id="InputUsername"
                  placeholder="Username"
                />
                <small id="emailHelp" className="form-text text-muted">
                  Well never share your email with anyone else.
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlInput2">Email address</label>
                <input
                  type="email"
                  className="form-control is-valid"
                  id="exampleFormControlInput2"
                  placeholder="name@example.com"
                />
                <small id="emailHelp" className="form-text text-muted">
                  Well never share your email with anyone else.
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword2">Password</label>
                <input
                  type="password"
                  className="form-control is-invalid"
                  id="exampleInputPassword2"
                  placeholder="Password"
                />
                <small id="emailHelp" className="form-text text-muted">
                  Password incorrect.
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPasswordVer">Verify Password</label>
                <input
                  type="password"
                  className="form-control is-invalid"
                  id="exampleInputPasswordVer"
                  placeholder="Password"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
