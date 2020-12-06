import React from 'react';
import UserList from './components/UserList';
// Importam formularul.
import UserAddForm from './components/UserAddForm';
import './App.css';
import PostList from './components/PostList';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      background: '#f5f5f5',
      color: 'black',
      users: [],
      showUsers: false,
      showPosts: false,
      nameError: '',
      emailError: ''
    };

    // In cazul in care nu folosim arrow functions la declararea functiilor pasate catre alte componente,
    // ar trebuie sa facem bind in constructor.
    this.BINDED_submitAddForm = this.BINDED_submitAddForm.bind(this);
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        // Inainte de a actualiza state-ul, filtram userii, astfel incat sa ramanem doar cu primii 3.
        data = data.filter(user => user.id < 4);
        // Pentru fiecare user ramas, ii setam valoarea false pentru cheia isGoldClient
        data.forEach(user => {
          user.isGoldClient = false;
          user.salary = '';
          user.imgPath = 'https://www.quseapp.com/assets/img/dummy.jpg';
        });
        // Vectorul users din state este populat dupa ce ne vin datele de la API.
        this.setState({ users: data });
      })
  }

  changeColor(event) {
    this.setState({ background: event.target.value });
    // setState e asincron, deci nu face modificarea imediat!!
    // render e apelat cand state-ul e schimvat
    console.log(this.state.background);
    // Putem sa ii pasam lui setState un callback ca parametru, dupa pasarea obiectului, pentru a vedea ce se intampla
    // DUPA actualizarea state-ului! (DECOMENTATI codul de mai jos si comentati setState-ul de mai sus pt a vedea)
    // this.setState({background: event.target.value}, () => {console.log(this.state.background)});
  }

  changeTextColor(event) {
    this.setState({ color: event.target.value })
  }

  deleteUser(id) {
    // event.persist()
    // event.preventDefault()
    // console.log(event.target.value)
    const array = [...this.state.users]
    array.splice((id - 1), 1)

    this.setState({ users: array })
  }

  // functia getMaxId calculeaza Id-ul maxim pentru un vector de useri
  getMaxId(users) {
    let maxId = 0;

    // parcurge fiecare user si verifica daca id-ul lui e mai mare decat cel mai mare id de pana atunci
    users.forEach(user => {
      if (user.id > maxId) {
        maxId = user.id;
      }
    });

    return maxId;
  }

  validate = (name, email, imgPath) => {
    console.log()
    let nameError = '';
    let emailError = '';
    let avatarError = '';
    if (name === '') {
      nameError = 'Please tell us your name'
      this.setState({ nameError })
      return false;
    } else {
      nameError = ''
      this.setState({ nameError })
    }
    if (!email.includes('@')) {
      emailError = 'This is not a valid email'
      this.setState({ emailError })
      return false;
    } else {
      emailError = ''
      this.setState({ emailError })

    }
    if ( !imgPath.match(/\.(jpeg|jpg|gif|png)$/)){
      avatarError = 'Please upload an image'
      this.setState({ avatarError })
      return false;
    } else {
      avatarError = ''
      this.setState({ avatarError })
    }

    return true;
  }


  // ATENTIE! Metoda submitAddForm este apelata din componenta userAddForm. Respectivei componente trebuie sa ii
  // pasam functia ca props. Nu uitati ca la declansarea unui event, pe langa parametri primiti de functia asociata
  // eventului respectiv, primul parametru primit este chiar evenimentul!
  submitAddForm(event, name, email, isGoldClient, salary, imgPath) {
    // ATENTIE! Nu uitati de event.preventDefault, altfel la submiterea formularului se va reincarca pagina!
    event.preventDefault();

    const isValid = this.validate(name, email, imgPath)
    // Trebuie sa adaugam un nou obiect in vectorul users din state. Deci trebuie sa actualizam partial campul
    // users din state => setState nu va mai primi ca parametru un obiect, ci o functie! (Check teorie)
    // Cand setState primeste ca parametru o functie, functia respectiva primeste ca parametru state-ul de dinaintea
    // aplicarii setState-ului curent.
    if (isValid) {
      this.setState(prevState => {
        // Functia trebuie sa returneze un obiect care are ca cheie campul din state care va fi modificat.
        return {
          // ATENTIE! Facemn Array destructuring si apoi compunem un nou array care contine userii din state-ul anterior,
          // la care adaugam un nou user cu atributele venite din formular. Astfel, actualizam campul users din state.
          users: [
            ...prevState.users,
            {
              // Pentru id luam valoarea maxima din state-ul precedent si il incrementam cu 1.
              id: this.getMaxId(prevState.users) + 1,
              name,
              email,
              isGoldClient,
              salary,
              imgPath
            }
          ]
        }
      });
    }
  }


  showUsers() {
    this.setState(prevState => ({
      showUsers: !prevState.showUsers,
      showPosts: false
    }));
  }

  showPosts() {
    this.setState(prevState => ({
      showPosts: !prevState.showPosts,
      showUsers: false
    }));
  }
  // ATENTIE! Metoda asta nu va merge! De ce? Din cauza ca atunci cand va fi apelata din userAddForm, THIS
  // nu va fi App! Din nou, topicul asta e mai complex, vizitati teoria!
  WRONG_submitAddForm(event, name, email, isGoldClient) {
    event.preventDefault();
    // AICI E BINE! Este doar o alta metoda de a spune functia care este trimisa ca parametru lui setState
    // va returna un obiect.
    this.setState(prevState => ({
      users: [
        ...prevState.users,
        {
          id: this.getMaxId(prevState.users) + 1,
          name,
          email,
          isGoldClient
        }
      ]
    }));
  }

  // Metoda aceasta va functiona, pentru ca i-am facut bind in constructor (vezi teorie).
  BINDED_submitAddForm(event, name, email, isGoldClient) {
    event.preventDefault();
    this.setState(prevState => ({
      users: [
        ...prevState.users,
        {
          id: this.getMaxId(prevState.users) + 1,
          name,
          email,
          isGoldClient
        }
      ]
    }));
  }

  // Cu toate ca va functiona si nu mai e nevoie de arrow function la pasarea metodei, NU ESTE RECOMANDAT
  // sa folositi sintaxa asta(class field methods), din rațiuni de performanță și testare. Din nou, go to teorie!
  NOT_RECOMMENDED_submitAddForm = (event, name, email, isGoldClient) => {
    event.preventDefault();
    // AICI E BINE! Este doar o alta metoda de a spune functia care este trimisa ca parametru lui setState
    // va returna un obiect.
    this.setState(prevState => ({
      users: [
        ...prevState.users,
        {
          id: this.getMaxId(prevState.users) + 1,
          name,
          email,
          isGoldClient
        }
      ]
    }));
  }

  render() {
    return (
      <div className="app" style={{ background: this.state.background, color: this.state.color }}>
        <h1>Admin panel</h1>
        {/* De ce am inclus componenta UserAddForm in App.js? UserAddForm va modifica state-ul lui App! */}
        {/* Trebuie sa pasam DEFINITIA functiei submitAddForm ca prop catre UserAddForm. Ulterior, in UserAddForm,
        submitAddForm va fi executata. ATENTIE! Cand extragem in UserAddForm functia pasata ca props cu
        this.props.submitAddForm, numele din this.props trebuie sa fie acelasi cu numele atributului pasat aici. */}
        {/* De asemenea, nu uitați că la pasarea funcției trebuie să folosim arrow functions pentru ca this să
        refere în continuare la App.js!!! Iar dacă folosim arrow functions, trebuie să pasăm și parametri corespunzători! */}
        <UserAddForm emailError={this.state.emailError} nameError={this.state.nameError} avatarError={this.state.avatarError} submitAddForm={(event, name, email, isGoldClient, salary, imgPath) => this.submitAddForm(event, name, email, isGoldClient, salary, imgPath)} />


        <div className='settings-buttons'>
         <div>
         <label>Background Color:</label>
          <input type="color" onChange={(event) => this.changeColor(event)} />
         </div>
          <div>
          <label>Item Text Color:</label>
          <input type="color" onChange={(event) => this.changeTextColor(event)} />
          </div>
        </div>
       <div className="button-container">
        <button className="styledButton" onClick={() => this.showUsers()}> Show Users</button>
        <button className="styledButton" onClick={() => this.showPosts()}> Show Posts</button>

       </div>

        {
          this.state.showPosts
            ? <PostList />
            : null
        }

        {/* Decomentati linia de mai jos si comentati UserAddForm-ul de mai sus pentru a testa functia
        WRONG_submitAddForm. */}
        {/* <UserAddForm submitAddForm={this.WRONG_submitAddForm}/> */}

        {/* Decomentati linia de mai jos si comentati UserAddForm-ul de mai sus pentru a testa functia
        BINDED_submitAddForm. */}
        {/* <UserAddForm submitAddForm={this.BINDED_submitAddForm}/> */}

        {/* Decomentati linia de mai jos si comentati UserAddForm-ul de mai sus pentru a testa functia
        NOT_RECOMMENDED_submitAddForm. */}
        {/* <UserAddForm submitAddForm={this.NOT_RECOMMENDED_submitAddForm}/> */}

        {/* Randam componenta UserList, careia ii trimitem ca proprietati userii din state. */}
        {
          this.state.showUsers
            ? <UserList users={this.state.users} deleteUser={(id) => this.deleteUser(id)} />
            : null
        }


      </div>
    );
  }
}

export default App;
