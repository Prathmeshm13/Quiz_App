const sessiontoUserMap= new Map();
function setUser(id,user){
    sessiontoUserMap.set(id,user);
}

function getUser(id){
    sessiontoUserMap.get(id);
}

module.exports={
    setUser,
    getUser,
};