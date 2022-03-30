import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const useAlert = (icon, callback) => {// custom hook to show alert
    
    const showAlert = param => {
        const MySwal = withReactContent(Swal);
        let [html, showDenyButton, confirmButtonText] = ['', true, `Yes`];
        
        if (icon === 'question') {
            html = `<p class="alert-text">Would you like to see all results?</p><p class="alert-text">Your score: ${param}</p>`;
        } else {
            html = `<h1 class="alert-text">Something went wrong!</h1><p class="alert-text">${param}</p>`;
            [showDenyButton, confirmButtonText] = [false, `Ok`];
        }
        
        MySwal.fire({
            html, icon, showDenyButton, confirmButtonText,
            denyButtonText: `No`,
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        }).then(result => {
            if (result.isConfirmed) {
                callback();
            }
        });
    };
    return { showAlert };
}
 
export default useAlert;