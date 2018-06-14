using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DevChat
{
    public class ChatRepository
    {
        public void Add(ChatUser user)
        {
            var list = (List<ChatUser>)HttpContext.Current.Application["UserList"];
            list.Add(user);
            HttpContext.Current.Application["UserList"] = list;
        }

        public IEnumerable<ChatUser> GetAll()
        {
            return (List<ChatUser>)HttpContext.Current.Application["UserList"];
        }

        public void Remove(ChatUser user)
        {
            var list = (List<ChatUser>)HttpContext.Current.Application["UserList"];
            list.Remove(user);
            HttpContext.Current.Application["UserList"] = list;
        }
    }
}