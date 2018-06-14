$(document).ready(function () {

    let userId = null;
    let nickName = null;
    let scrollValue = 100;
    const nickNameModal = $('#nickname-modal');
    const nickNameInput = $('#nickname-input');
    const chatInput = $('#chat-input');
    const btnSend = $('#btn-send');
    const btnSaveNickName = $('#btn-save-nickname');
    const usersList = $('#user-list');
    const chat = $.connection.chatHub;

    $(window).on('load', function () {
        $(nickNameModal).modal('show');
    });

    $(nickNameInput).keypress(function (e) {
        var key = e.which;
        if (key == 13) {
            $(btnSaveNickName).click();
            return false;
        }
    });

    $(chatInput).keypress(function (e) {
        var key = e.which;
        if (key == 13) {
            $(btnSend).click();
            return false;
        }
    });

    function getNickName() {
        return (nickName != null) ? nickName : "Annonymous";
    }

    function scrollDisplay() {
        $('#chat-body').animate({ scrollTop: scrollValue }, 50);
        scrollValue += scrollValue;
    }

    function updateUserList(allUsers) {
        $(usersList).empty();
        $(allUsers).each(function (index) {
            $(usersList).append(`<li id="${allUsers[index].Id}" class="list-group-item">${allUsers[index].Name}</li>`);
        })
    }

    window.onbeforeunload = function () {
        chat.server.logout(nickName);
    };

    chat.client.broadcastMessage = function (name, message, date) {
        $('#chat-body').append(`<blockquote class="blockquote">
                                <p class ="mb-0">${message}</p>
                                <footer class ="blockquote-footer">said ${name} at ${date}</footer>
                                </blockquote>`);

        scrollDisplay();
    };

    chat.client.broadcastLogin = function (message, date, allUsers) {
        $('#chat-body').append(`<blockquote class="blockquote">
                                <p class ="mb-0">${message}</p>
                                <footer class ="blockquote-footer">at ${date}</footer>
                                </blockquote>`);

        updateUserList(allUsers);      
        scrollDisplay();
    };

    chat.client.broadcastLogout = function (message, date, allUsers) {
        $('#chat-body').append(`<blockquote class="blockquote">
                                <p class ="mb-0">${message}</p>
                                <footer class ="blockquote-footer">at ${date}</footer>
                                </blockquote>`);

        updateUserList(allUsers);
        scrollDisplay();
    };

    // Start the connection.
    $.connection.hub.start().done(function () {

        $(btnSend).on('click', function () {
            chat.server.send(nickName, $(chatInput).val());
            $(chatInput).val('').focus();
        });

        $(btnSaveNickName).on('click', function () {
            nickName = $(nickNameInput).val();
            $(nickNameModal).modal('hide');
            $(chatInput).focus();
            chat.server.login(nickName);
        })

    });
})