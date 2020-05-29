import { CommentModel } from "../models/CommentsModel";
import { UserModel } from "../models/UserModel";
import { AddressModel } from './../models/AddressModel';
import { CategoryModel } from './../models/CategoryModel';
import { ChatModel } from './../models/ChatModel';
import { HabilidadeModel } from './../models/HabilidadeModel';
import { NewsModel } from './../models/NewsModel';
import { NotificationModel } from './../models/NotificationModel';
import { PostModel } from './../models/PostModel';
import { SkillsModel } from './../models/SkillsModel';
import { RankModel } from './../models/RankModel';
import { AnuncioModel } from './../models/AnuncioModel';
import { ProposeModel } from './../models/ProposeModel';
import { PlayerModel } from './../models/PlayerModel';
import { FileModel } from '../models/FileModel';

export interface ModelsInterface {

    Comment: CommentModel;
    User: UserModel;
    Address: AddressModel;
    Category: CategoryModel;
    Chat : ChatModel;
    Habilidade: HabilidadeModel;
    News: NewsModel;
    Notification: NotificationModel;
    Post: PostModel;
    Skills: SkillsModel;
    Rank: RankModel;
    Anuncio: AnuncioModel;
    Propose: ProposeModel;
    Player: PlayerModel;
    File: FileModel;

}