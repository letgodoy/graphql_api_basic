import { commentMutations } from './resources/comment/comment.schema';
import { postMutations } from './resources/post/post.schema';
import { tokenMutations } from './resources/token/token.schema';
import { userMutations } from './resources/user/user.schema';
import { addressMutations } from './resources/address/address.schema';
import { anuncioMutations } from './resources/anuncio/anuncio.schema';
import { categoryMutations } from './resources/category/category.schema';
import { chatMutations } from './resources/chat/chats.schema';
import { habilidadeMutations } from './resources/habilidade/habilidade.schema';
import { newsMutations } from './resources/news/news.schema';
import { notificationMutations } from './resources/notifications/notifications.schema';
import { playerMutations } from './resources/player/player.schema';
import { proposeMutations } from './resources/propose/propose.schema';
import { rankMutations } from './resources/rank/rank.schema';
import { skillsMutations } from './resources/skills/skills.schema';

const Mutation = `
    type Mutation {
        ${commentMutations}
        ${postMutations}
        ${tokenMutations}
        ${userMutations}
        ${addressMutations}
        ${anuncioMutations}
        ${categoryMutations}
        ${chatMutations}
        ${habilidadeMutations}
        ${newsMutations}
        ${notificationMutations}
        ${playerMutations}
        ${proposeMutations}
        ${rankMutations}
        ${skillsMutations}
        
    }
`;

export {
    Mutation
}