import React from 'react';
// Atentie la sintaxa de import a css-ului!
// SI MAI MARE ATENTIE: nu conteaza in ce componenta importi un fisier CSS,
// respectivul fisier va fi vizibil la nivelul intregii aplicatii!!
import './UserAddForm.css';
class UserAddForm extends React.Component {
    // UserAddForm primeste props ca parametru pentru constructor si ii paseaza ca parametru pentru super.
    constructor(props) {
        super(props);
        // Daca utilizatorul ar da submit la formular, fara sa completeze nimic,
        // acestea ar fi valorile trimise.
        this.state = {
            name: '',
            email: '',
            isGoldClient: false,
            salary: '',
            imgPath: '',
            // emailError: this.props.emailError
        };
    }


    // NU UITATI ca metodele apelate la declansarea unui event primesc automat ca parametru event-ul respectiv.
    updateName(event) {
        // Practic, in campul din state corespunzator se stocheaza valoarea introdusa de utilizator.

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
        // HINT: Daca nu sunteti siguri ce valoare are o anumita variabila, console.log-ati-o!
        // La checkboxuri event.target.value nu ar fi dat rezultatul dorit, avem nevoie de event.target.checked.
        console.log(event.target.checked);
        // ATENTIE! Niciodata sa includeti this.state in interiorul lui this.setState()
        // this.setState({isGoldClient: !this.state.isGoldClient}) NU FACETI ASTA!
        // REPET, NICIODATA NU INCLUDETI THIS.STATE IN THIS.SETSTATE !!!
        this.setState({ isGoldClient: event.target.checked });
    }

    render() {
        // ATENTIE! Destructuring-ul se face inainte de return! Ne ajuta sa scriem mai putin cand apelam
        // submitAddForm mai jos!
        const { name, email, isGoldClient, salary, imgPath } = this.state;
        const { submitAddForm } = this.props;


        return (
            <form
                className="user-add-form"
                onSubmit={(event) => submitAddForm(event, name, email, isGoldClient, salary, imgPath)}
            >
                <h2>Adauga utilizatori:</h2>
                {/* ATENTIE! In JSX, for este pentru structuri repetitive. Pentru for din HTML
                se foloseste htmlFor! */}
                {/* <label htmlFor="name">Nume:</label> */}

                <input
                    type="text"
                    name="name"
                    placeholder="Nume:"
                    // Cand utilizatorul va tasta ceva nou, se va declansa eventul onChange.
                    // La declansare, se va executa metoda updateName.
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