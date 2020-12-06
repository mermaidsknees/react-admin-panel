import React from 'react';
import './UserAddForm.css';
class UserAddForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            isGoldClient: false,
            salary: '',
            imgPath: '',
        };
    }


    updateName(event) {
        this.setState({ name: event.target.value });
    }

    updateEmail(event) {
        this.setState({ email: event.target.value });
    }

    updateSalary(event) {
        this.setState({ salary: event.target.value });
    }

    updateImgPath(event) {
        this.setState({ imgPath: event.target.value });
    }

    updateIsGoldClient(event) {
        console.log(event.target.checked);
        this.setState({ isGoldClient: event.target.checked });
    }

    render() {
        const { name, email, isGoldClient, salary, imgPath } = this.state;
        const { submitAddForm } = this.props;


        return (
            <form
                className="user-add-form"
                onSubmit={(event) => submitAddForm(event, name, email, isGoldClient, salary, imgPath)}
            >
                <h2>Adauga utilizatori:</h2>

                <input
                    type="text"
                    name="name"
                    placeholder="Nume:"
                    onChange={(event) => this.updateName(event)}
                />
                {this.props.nameError
                    ? <div className="error" style={{ color: 'red', fontSize: '15px'}}>{this.props.nameError}</div>
                    : null}
                <input
                    type="text"
                    name="email"
                    placeholder="Email:"

                    onChange={(event) => this.updateEmail(event)}
                />
                {this.props.emailError
                    ? <div className="error" style={{ color: 'red', fontSize: '15px' }}>{this.props.emailError}</div>
                    : null}


                {/* <label htmlFor="salary">Salary:</label> */}
                <input
                    type="text"
                    name="salary"
                    onChange={(event) => this.updateSalary(event)}
                    placeholder="Salary:"
                />

                <input
                    type="text"
                    name="imgPath"
                    onChange={(event) => this.updateImgPath(event)}
                    placeholder="Avatar Image Link:"
                />
                {this.props.avatarError
                    ? <div className="error" style={{ color: 'red', fontSize: '15px' }}>{this.props.avatarError}</div>
                    : null}

                <div className="checkbox">
                    <label htmlFor="is-gold-client">Client GOLD</label>
                    <input
                        type="checkbox"
                        name="is-gold-client"
                        className="isGold"
                        value="true"
                        onChange={(event) => this.updateIsGoldClient(event)}
                    />
                </div>

                <input className='submitButton' type="submit" value="Introdu utilizatorul" />
            </form>
        )
    }
}

export default UserAddForm;