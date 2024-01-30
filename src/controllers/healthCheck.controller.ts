import { Get, Controller, Route, Tags } from "tsoa";

@Route("healthCheck")
@Tags("HealthCheck")
export class HealthCheckController extends Controller {
  @Get()
  public getHealth(): string {
    this.setStatus(201);
    return "Up and Running";
  }
}
