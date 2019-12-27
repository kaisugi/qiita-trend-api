import { 
  APIGatewayProxyEvent, 
  Context, 
  APIGatewayProxyCallback 
// @ts-ignore
} from "@types/aws-lambda"

exports.handler = (
  event: APIGatewayProxyEvent, 
  context: Context, 
  callback: APIGatewayProxyCallback
) => {
  callback(null, {
    statusCode: 200,
    body: "Hello, World"
  });
};