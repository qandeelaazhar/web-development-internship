let faqs = document.querySelectorAll(".box");
faqs.forEach(function(faq){
    faq.querySelector(".question").addEventListener("click", function(){  // the answers that are visible will be hidden
        faqs.forEach(function(item){
            if(item !== faq){
                item.querySelector(".answer").style.display = "none";
                item.querySelector(".icon").innerText = "+";
            }
        });
        let answer = faq.querySelector(".answer");
        let icon = faq.querySelector(".icon");
        if(answer.style.display === "block"){  //if the answer already visible display:none
            answer.style.display = "none";
            icon.innerText = "+";
        }
        else{
            answer.style.display = "block";
            icon.innerText = "-";
        }
    });
});
