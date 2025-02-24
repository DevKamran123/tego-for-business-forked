import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function PageNotFound () {
    const navigate = useNavigate();
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100dvh"
        }}>
            <Result
              status="404"
              title="404"
              subTitle="Sorry, the page you visited does not exist."
              extra={<Button type="primary" onClick={()=>navigate(-1)}>Go Back</Button>}
            />
        </div>
    )
};

