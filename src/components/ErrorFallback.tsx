import { Button, Result } from "antd"
import { FallbackProps } from "react-error-boundary"

function ErrorFallback({error, resetErrorBoundary}: FallbackProps) {
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100dvh"
        }}>
            <Result
                status="500"
                title="500"
                subTitle={error.message}
                extra={<Button type="primary" onClick={resetErrorBoundary}>Try again</Button>}
            />
        </div>
    )
  }
  
  export default ErrorFallback
