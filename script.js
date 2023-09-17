const images = document.querySelectorAll(".img-wrapper > img");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const allDots = document.querySelectorAll(".dot");

let counter = 0;

nextBtn.addEventListener("click", nextSlide);
function nextSlide() {
  images[counter].style.animation = "nextOut 2s forwards";
  if (counter >= images.length - 1) {
    counter = 0;
  } else {
    counter++;
  }
  images[counter].style.animation = "nextIn 2s forwards";
  pointerDot();
}

prevBtn.addEventListener("click", prevSlide);
function prevSlide() {
  images[counter].style.animation = "prevOut 2s forwards";
  if (counter == 0) {
    counter = images.length - 1;
  } else {
    counter--;
  }
  images[counter].style.animation = "prevIn 2s forwards";
  pointerDot();
}

function autoSliding() {
  deletInterval = setInterval(function () {
    nextSlide();
    pointerDot();
  }, 3000);
}
autoSliding();

const slideContainer = document.querySelector(".slide-container");
slideContainer.addEventListener("mouseover", function () {
  clearInterval(deletInterval);
});

slideContainer.addEventListener("mouseleave", function () {
  autoSliding();
});

function pointerDot() {
  for (let i = 0; i < allDots.length; i++) {
    allDots[i].className = allDots[i].className.replace("active", "");
  }
  allDots[counter].className += " active";
}

allDots.forEach(function (dot) {
  dot.addEventListener("click", function (e) {
    e.currentTarget.classList.add("active");
    const dotIndex = e.currentTarget.getAttribute("attr");
    if (dotIndex > counter) {
      images[counter].style.animation = "nextOut 2s forwards";
      counter = dotIndex;
      images[counter].style.animation = "nextIn 2s forwards";
    } else if (dotIndex == counter) {
      return;
    } else {
      images[counter].style.animation = "prevOut 2s forwards";
      counter = dotIndex;
      images[counter].style.animation = "prevIn 2s forwards";
    }
    pointerDot();
  });
});




function getdata() {
  $.get("http://149.28.139.16/api/movie?search"+search+"&page="+page+"&size="+size, function (objectdata, status) {


      const datalist = $("#data_table");
      datalist.empty();
      //pagination
      const pagination=$("#pagination")
      totalElement=objectdata.totalElements
      totalPage=objectdata.totalPages
      var st=""
      st+=("<li class=\"page-item\" onclick=\"onClickPagination("+(page-1)+")\" ><a class=\"page-link\" href=\"#\">Previous</a></li>\n")
      for(var i = 0;i < totalPage;i++){
          st+=("<li class=\"page-item "+((i==page)? "active":"")+"\" onclick=\"onClickPagination("+i+")\" ><a class=\"page-link\" href=\"#\">" + (i+1) + "</a></li>\n")
      }
      st+=("<li class=\"page-item\" onclick=\"onClickPagination("+(page+1)+")\" ><a class=\"page-link\" href=\"#\">Next</a></li>\n")
      pagination.html(st)
      //showdata
      datalist.empty()
      objectdata.data.forEach((dt) => {
          datalist.append("<tr>" +
              "<td>" + dt.id + "</td>" +
              "<td>" + dt.name + "</td>" +
              "<td>" + dt.description + "</td>" +
              "<td><img src='" + dt.image + "' alt='image' width='100px'></td>" +
              "<td><button class='edit-data btn btn-primary' data-id='" + dt.id + "'>Edit</button></td> " +
              "<td><button class='delete-data btn btn-danger' data-id='" + dt.id + "'>Delete</button></td>" +
              "</tr>");
      });
          attachEditDeleteHandlers();
      
  });
}
