"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoLambdas = void 0;
const cdk = require("@aws-cdk/core");
const lambdanodejs = require("@aws-cdk/aws-lambda-nodejs");
class TodoLambdas extends cdk.Construct {
    constructor() {
        super(...arguments);
        this.getHandler = new lambdanodejs.NodejsFunction(this, 'get');
    }
}
exports.TodoLambdas = TodoLambdas;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9kby1jb25zdHJ1Y3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0b2RvLWNvbnN0cnVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBcUM7QUFDckMsMkRBQTJEO0FBRTNELE1BQWEsV0FBWSxTQUFRLEdBQUcsQ0FBQyxTQUFTO0lBQTlDOztRQUNvQixlQUFVLEdBQWdDLElBQUksWUFBWSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDM0csQ0FBQztDQUFBO0FBRkQsa0NBRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnQGF3cy1jZGsvY29yZSc7XG5pbXBvcnQgKiBhcyBsYW1iZGFub2RlanMgZnJvbSAnQGF3cy1jZGsvYXdzLWxhbWJkYS1ub2RlanMnO1xuXG5leHBvcnQgY2xhc3MgVG9kb0xhbWJkYXMgZXh0ZW5kcyBjZGsuQ29uc3RydWN0IHtcbiAgICBwdWJsaWMgcmVhZG9ubHkgZ2V0SGFuZGxlcjogbGFtYmRhbm9kZWpzLk5vZGVqc0Z1bmN0aW9uID0gbmV3IGxhbWJkYW5vZGVqcy5Ob2RlanNGdW5jdGlvbih0aGlzLCAnZ2V0Jyk7XG59Il19