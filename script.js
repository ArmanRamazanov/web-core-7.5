let swiperInstance = null

const button_show_more = document.querySelector(".section__show-more-button");
const section__main_content_items = document.querySelectorAll(".section__main-content-item")
const button_show_more_image = document.querySelector(".section__show-more-button img")
const button_show_more_span = document.querySelector(".section__show-more-button span")
const arr = Array.from(section__main_content_items)

const breakpointmin768px = window.matchMedia("(min-width:768px)")
const breakpointmin1120px = window.matchMedia("(min-width:1120px)")

function breakPointChecker(swiperInstance){
    function handleBreakPointChange(){
        //break the swiper
        if(breakpointmin768px.matches){
            if(swiperInstance&&swiperInstance.destroy){
                swiperInstance.destroy(true,true);
                swiperInstance = null
            } 
            document.querySelector(".swiper-wrapper").style.display = "grid"    
        }

        //initialize the swiper
        else{
            if(!swiperInstance){
                document.querySelector(".swiper-wrapper").style.display = "flex"
                swiperInstance = new Swiper(".swiper",{
                    pagination:{
                        el:".swiper-pagination",
                        clickable:true,
                    },
                    
                    slidesPerView:1.5,
                    breakpoints:{
                        400:{
                            slidesPerView:2
                        },
                        450:{
                            slidesPerView:2.5
                        },
                        600:{
                            slidesPerView:3
                        },
                        768:{
                            enabled:false
                        }
                }})
            }
        }
    }
    

    breakpointmin768px.addEventListener("change",handleBreakPointChange)
    handleBreakPointChange()


}
breakPointChecker(swiperInstance)

//button "Показать все"
const button = button_show_more.addEventListener("click",()=>{
    button_show_more.classList.toggle("is-active")
    reset_items()
    const isActive = button_show_more.classList.contains("is-active")
    button_show_more_span.textContent = isActive ? "Скрыть" : "Показать все"
    button_show_more_image.style.transform = isActive ? "rotate(-180deg)" : "rotate(0deg)" 
})

breakpointmin768px.addEventListener("change",reset_items)
breakpointmin1120px.addEventListener("change",reset_items)

//resetting the initial setup
function reset_items(){
    const isActive = button_show_more.classList.contains("is-active")

    if(isActive){
        arr.forEach(el => el.style.display = "block")
        return
    }

    arr.forEach(el => el.style.display="block")
    if(breakpointmin768px.matches && !breakpointmin1120px.matches){
        arr.slice(arr.length-4).forEach(el => el.style.display = "none")
    }

    else if(breakpointmin1120px.matches){
        arr.slice(arr.length-2).forEach(el => el.style.display = "none")
    }
}

reset_items()
