
import React from 'react';


class AuthorForm extends React.Component {

    constructor(prop) {
        super(prop);
        this.state = {
            name: '',
            imageUrl: '',
            books: [],
            bookTemp: ''
        };

        this.onFieldChange = this.onFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this); 
        this.handleAddBook = this.handleAddBook.bind(this);
    }

    onFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event){
        event.preventDefault();
        this.props.onAddAuthor(this.state)
    }

    handleAddBook(event){
        event.preventDefault();
        this.setState({
            books: this.state.books.concat([this.state.bookTemp]),
            bookTemp: ''
        })
        
    }

    render() {
        return <form onSubmit={this.handleSubmit}>
            <div>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" value={this.state.name} onChange={this.onFieldChange}></input>
            </div>
            <div>
                <label htmlFor="imageUrl">Image URL</label>
                <input type="text" name="imageUrl" value={this.state.imageUrl} onChange={this.onFieldChange}></input>
            </div>
            <div>
                {this.state.books.map((book) => <p key={book}>{book}</p>)}
                <input type="text" name="bookTemp" value={this.state.bookTemp} onChange={this.onFieldChange}></input>
                <input type='button' value='+' onClick={this.handleAddBook}/>
            </div>
            <input type='submit' value='Add'/>
        </form>
    }
}

function AddAuthorForm({ match, onAddAuthor }) {
    return <div>
        <h1>Add Author</h1>
        <AuthorForm onAddAuthor={onAddAuthor} />
    </div>
}


export default AddAuthorForm;