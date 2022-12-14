import HealthCheck from '@ioc:Adonis/Core/HealthCheck'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HealthController {
  public async health({ response }: HttpContextContract) {
    const report = await HealthCheck.getReport()
    return report.healthy ? response.ok(report) : response.badRequest(report)
  }
}
