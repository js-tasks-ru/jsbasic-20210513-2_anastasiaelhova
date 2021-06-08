function makeFriendsList(friends) {
    let listDom = document.createElement("ul");

    for(let friend of friends) {
        let li = document.createElement("li");
        li.append(`${friend.firstName} ${friend.lastName}`);
        listDom.append(li);
    }
    return listDom;
}