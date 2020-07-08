import React, {Component} from 'react';
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxiliary";

const WithErrorHandler = (WrappedComponent, axios) => {

   return class extends Component {

      state = {
         error: null
      }

      // Add functionality to axios of the WrappedComponent on componentDidMount()
      componentDidMount = () => {
         axios.interceptors.request.use(request => {
            // Clear the errors object on every new HTTP request
            this.setState({error: null});
            return request;
         });

         // We are here mostly interested in the response error if any
         axios.interceptors.response.use(response => response, error => {
            this.setState({error: error})
            return Promise.reject(error);
         });
      }

      errorConfirmedHandler = () => {
         this.setState({error: null});
      }

      render() {
         return (
            <Aux>
               <Modal
                  show={this.state.error}
                  modalClosed={this.errorConfirmedHandler}
               >
                  {this.state.error ? "Sorry! " + this.state.error.message : null}
               </Modal>
               <WrappedComponent {...this.props}/>
            </Aux>
         );
      }
   }
}
export default WithErrorHandler;
