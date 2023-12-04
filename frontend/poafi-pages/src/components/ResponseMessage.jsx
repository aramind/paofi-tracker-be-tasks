import { Alert } from 'react-bootstrap';

function ResponseMessage({ color, message }) {
    return (
        <>
            {
                message ? (
                    <div className="mt-3">
                        <Alert variant={color}>{message}</Alert>
                    </div>
                ) : ""
            }
        </>
    );
}

export default ResponseMessage;
