import type { Context } from './context'
import { PubSub } from 'graphql-subscriptions'

const pubsub = new PubSub()

export const resolvers = {
  Subscription: {
    messageCreated: {
      subscribe: () => {
        pubsub.asyncIterator(['MESSAGE_CREATED'])
      },
    },
  },
  Query: {
    users: (_parent: any, _args: any, context: Context) => {
      return context.prisma.user.findMany()
    },

    user: (_parent: any, args: any, context: Context) => {
      return context.prisma.user.findUnique({ where: { id: args.id } })
    },

    getConversations: (_parent: any, args: any, context: Context) => {
      return context.prisma.conversation.findMany({
        include: {
          groupMember: {
            where: {
              NOT: [
                {
                  userId: {
                    equals: args.userId,
                  },
                },
              ],
            },
          },
        },
      })
    },

    getConversation: (_parent: any, args: any, context: Context) => {
      return context.prisma.conversation.findUnique({
        where: {
          id: args.conversationId,
        },
        include: {
          messages: true,
        },
      })
    },
  },
  Mutation: {
    createMessage: (_parent: any, args: any, context: Context) => {
      pubsub.publish('MESSAGE_CREATED', { messageCreated: args.input })

      return context.prisma.message.create({
        data: {
          text: args.input.text,
          userId: args.input.userId,
          conversationId: args.input.conversationId,
        },
      })
    },
  },
  GroupMember: {
    user: (parent: any, args: any, context: Context) => {
      return context.prisma.user.findUnique({
        where: {
          id: parent.userId,
        },
      })
    },
  },
  Conversation: {
    messages: (parent: any, args: any, context: Context) => {
      return context.prisma.message.findMany({
        where: {
          conversationId: parent.id,
        },
        include: {
          user: true,
        },
      })
    },
    groupMember: (parent: any, args: any, context: Context) => {
      return context.prisma.groupMember.findMany({
        where: {
          conversationId: parent.id,
        },
      })
    },
  },
}
