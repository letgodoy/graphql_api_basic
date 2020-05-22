import { commentQueries } from './resources/comment/comment.schema';
import { postQueries } from './resources/post/post.schema';
import { userQueries } from './resources/user/user.schema';
import { addressQueries } from './resources/address/address.schema';
import { anuncioQueries } from './resources/anuncio/anuncio.schema';
import { categoryQueries } from './resources/category/category.schema';
import { chatQueries } from './resources/chat/chats.schema';
import { habilidadeQueries } from './resources/habilidade/habilidade.schema';
import { newsQueries } from './resources/news/news.schema';
import { notificationQueries } from './resources/notifications/notifications.schema';
import { playerQueries } from './resources/player/player.schema';
import { proposeQueries } from './resources/propose/propose.schema';
import { rankQueries } from './resources/rank/rank.schema';
import { skillsQueries } from './resources/skills/skills.schema';

const Query = `
    type Query {
        ${commentQueries}
        ${postQueries}
        ${userQueries}
        ${addressQueries}
        ${anuncioQueries}
        ${categoryQueries}
        ${chatQueries}
        ${commentQueries}
        ${habilidadeQueries}
        ${newsQueries}
        ${notificationQueries}
        ${playerQueries}
        ${proposeQueries}
        ${rankQueries}
        ${skillsQueries}
        
    }
`;

export {
    Query
}