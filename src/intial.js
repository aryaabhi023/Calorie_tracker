//Initial work
function Initial() {
  const form1 = document.querySelector("#form1");
  const form2 = document.querySelector("#form2");
  const gridBtn1 = document.getElementById("grid-btn1");
  const gridBtn2 = document.getElementById("grid-btn2");

  gridBtn1.addEventListener("click", () => {
    if (form1.classList.contains("hide")) {
      form1.classList.remove("hide");
    } else {
      form1.classList.add("hide");
    }
  });

  gridBtn2.addEventListener("click", () => {
    if (form2.classList.contains("hide")) {
      form2.classList.remove("hide");
    } else {
      form2.classList.add("hide");
    }
  });
}

Initial();
export default Initial;
