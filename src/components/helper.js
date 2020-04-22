const Helper = {
    reload(){
        window.location.reload();
    },
    toggleProfileMenuState(){
        if (document.getElementById("eProfileMenu").classList.contains("hideMe")){
            document.getElementById("eProfileMenu").classList.remove("hideMe");
        }
        else{
            document.getElementById("eProfileMenu").classList.add("hideMe");
        }
    },
    
}

export default Helper;