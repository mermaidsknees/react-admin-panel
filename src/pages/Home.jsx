import React from 'react'

//Router
import {Link} from 'react-router-dom'

//Components
import PostList from '../components/PostList';
import UserAddForm from '../components/UserAddForm';
import UserList from '../components/UserList';

//CSS
import '../Home.css';

class Home extends React.Component {
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

        //Bind example
        this.BINDED_submitAddForm = this.BINDED_submitAddForm.bind(this);
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(data => {
                data = data.filter(user => user.id < 4);
                data.forEach(user => {
                    user.isGoldClient = false;
                    user.salary = '';
                    user.imgPath = 'https://www.quseapp.com/assets/img/dummy.jpg';
                });
                //API data
                this.setState({ users: data });
            })
    }

    changeColor(event) {
        this.setState({ background: event.target.value });
        // setState is async
        console.log(this.state.background);

    }

    changeTextColor(event) {
        this.setState({ color: event.target.value })
    }

    deleteUser(id) {
        const array = [...this.state.users]
        array.splice((id - 1), 1)
        this.setState({ users: array })
    }

    getMaxId(users) {
        let maxId = 0;

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
        if (!imgPath.match(/\.(jpeg|jpg|gif|png)$/)) {
            avatarError = 'Please upload an image'
            this.setState({ avatarError })
            return false;
        } else {
            avatarError = ''
            this.setState({ avatarError })
        }

        return true;
    }

    submitAddForm(event, name, email, isGoldClient, salary, imgPath) {
        event.preventDefault();

        const isValid = this.validate(name, email, imgPath)
        if (isValid) {
            this.setState(prevState => {
                return {
                    users: [
                        ...prevState.users,
                        {
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
    //Wrong method
    WRONG_submitAddForm(event, name, email, isGoldClient) {
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

    // Works because of bind in constructor
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

    // Works but not recommended
    NOT_RECOMMENDED_submitAddForm = (event, name, email, isGoldClient) => {
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

    render() {
        return (
            <div className="home" style={{ background: this.state.background, color: this.state.color }}>
                <h1>Admin panel</h1>
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

                <div className='link'><Link className='link-text' to='/about'>Go To About Page</Link></div>

                {
                    this.state.showPosts
                        ? <PostList />
                        : null
                }

                {
                    this.state.showUsers
                        ? <UserList users={this.state.users} deleteUser={(id) => this.deleteUser(id)} />
                        : null
                }


            </div>
        );
    }
}

export default Home