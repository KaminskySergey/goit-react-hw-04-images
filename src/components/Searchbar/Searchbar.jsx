import PropTypes from 'prop-types';
import { useState } from 'react';


import {SearchFormButton, SearchForm, Header, FormInput} from './Searchbar.styled'

const  Searchbar = ({onSubmit}) =>  {
  const [name, setName] = useState('');
  const [disabled, setDisabled] = useState(true);
  
  
  const handleChange = (e) => {
    const {value} = e.target;
    setName(value)
      if(value.length > 0){
        setDisabled(false)
      }
  }
  

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(name)
    reset()
    setDisabled(true)
  }
  
  const reset =() => {
    setName('')
  }

  return (
          <Header>
<SearchForm  onSubmit={handleSubmit}>
  <SearchFormButton type="submit"  disabled={disabled}>
    <span>Search</span>
  </SearchFormButton>

  <FormInput
    
    type="text"
    autoComplete="off"
    autoFocus
    placeholder="Search images and photos"
    onChange={handleChange}
    name='name'
    value={name}
    disabled={false}
  />
</SearchForm>
</Header>
    )
}

export default Searchbar;

// class Searchbar extends Component {
//     state = {
//       name: '',
//       disabled: true,
//     }
    
//     handleChange = (e) => {
//       const {name, value} = e.target;
//         this.setState({[name]: value})
//         if(e.target.value.length > 0){
//           this.setState(({
//             disabled: false
//           }))
//         }
//     }
    

//     handleSubmit = (e) => {
//       e.preventDefault()
//       this.props.onSubmit(this.state.name)
//       this.reset()
//       this.setState({disabled: true})
//     }
    
//     reset(){
//       this.setState({name: ''})
//     }

//     render(){
//       const {name, disabled} = this.state
//         return (
//             <Header>
//   <SearchForm  onSubmit={this.handleSubmit}>
//     <SearchFormButton type="submit"  disabled={disabled }>
//       <span>Search</span>
//     </SearchFormButton>

//     <FormInput
      
//       type="text"
//       autoComplete="off"
//       autoFocus
//       placeholder="Search images and photos"
//       onChange={this.handleChange}
//       name='name'
//       value={name}
//       disabled={false}
//     />
//   </SearchForm>
// </Header>
//       )
//     }
// }

// export default Searchbar;

Searchbar.propTypes = {
  disabled: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
}