function makeFriendsList(friends) {
    let listDom = document.createElement("ul");
    friends.map((friend) => {
        let li = document.createElement("li");
        li.append(`${friend.firstName} ${friend.lastName}`);
        listDom.append(li);
    });
    return listDom;
}