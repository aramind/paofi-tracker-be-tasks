import { Spinner } from 'react-bootstrap';

function Loading() {
    return (
        <>
            <div className="text-center">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2">Processing, please wait...</p>
            </div>
        </>
    );
}

export default Loading;
