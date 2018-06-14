using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DevChat
{
    public class ChatUser
    {
        public ChatUser(string name)
        {
            Id = Guid.NewGuid();
            Name = name;
        }
        public Guid Id { get; set; }
        public string Name { get; set; }
    }
}