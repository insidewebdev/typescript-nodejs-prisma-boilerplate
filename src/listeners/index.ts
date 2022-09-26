import { eventEmitter } from "@/utils/event-emitter"
import { logger } from "@/utils/logger"

const eventLogger = {
    info: (message: string) => logger.info(`💥  ${message}`),
    error: (message: string) => logger.error(`💥  ${message}`)
}

export default {

    register() {

        // eventEmitter.on(EventType.USER_CREATED, async ({ user }: any) => {
        //     eventLogger.info(`User created ${user._id}`)

        // })

    }
}