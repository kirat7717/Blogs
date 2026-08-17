
import mongoose,{Schema,model} from "mongoose";

const messageSchema =  new Schema({
    conversationId : {
        type : Schema.Types.ObjectId,
        ref : "Conversation"

    },
    senderId : {
        type: Schema.Types.ObjectId,
        ref:"User"
    },
    message:{
        type:String,
        required:true,
        trim :true
    }
},{timestamps:true})

const Message = model("Message", messageSchema);

export default Message