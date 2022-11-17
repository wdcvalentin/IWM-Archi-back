import { nanoid } from 'nanoid'
import { UuidGenerator } from '../../coreLogic/gateways/uuidGenerator'

export class RealUuidGenerator implements UuidGenerator {
  generate(): string {
    return nanoid()
  }
}