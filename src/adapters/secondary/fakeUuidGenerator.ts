import { UuidGenerator } from '../../coreLogic/gateways/uuidGenerator'

export class FakeUuidGenerator implements UuidGenerator {
  private nextUuids: Array<string> = []

  setNextUuids(...nextUuids: Array<string>) {
    this.nextUuids = nextUuids
  }

  generate(): string {
    const nextUuid = this.nextUuids[0]
    this.nextUuids.shift()
    return nextUuid
  }
}