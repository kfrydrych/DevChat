using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DevChat
{
    public class ChatHub : Hub
    {
        private string _time = DateTime.Now.ToShortTimeString();
        private ChatRepository _repository;

        public ChatHub()
        {
            _repository = new ChatRepository();
        }

        public void Send(string name, string message)
        {
            Clients.All.broadcastMessage(name, message, _time);
        }

        public void Login(string name)
        {
            _repository.Add(new ChatUser(name));
            var allUsers = _repository.GetAll();
            Clients.All.broadcastLogin(name + " has entered the chat", _time, allUsers);
        }

        public void Logout(string name)
        {
            var user = _repository.GetAll().SingleOrDefault(x => x.Name == name);
            _repository.Remove(user);
            var allUsers = _repository.GetAll();
            Clients.All.broadcastLogout(name + " has left the chat", _time, allUsers);
        }
    }
}