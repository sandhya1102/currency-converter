const APIKEY  = "https://2024-03-06.currency-api.pages.dev/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for (let select of dropdowns) {
  for (code in countryList) {
    let newoption = document.createElement("option");
    newoption.innerText = code;
    newoption.value = code;
    select.append(newoption);
  }
  select.addEventListener("change", (evt) => {
    currFlag(evt.target);
  });
}

const currFlag = (element) => {
  let code = element.value;
  let countrycode = countryList[code];
  let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newsrc;
};

const btn = document.querySelector(".btn");

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amtval = amount.value;
  if (amtval === "" || amtval < 1) {
    amtval = 1;
    amount.value = "1";
  }

  let fromLowCur = fromCurr.value.toLowerCase();
  let toLowCur = toCurr.value.toLowerCase();
  const URL = `${APIKEY}/${fromLowCur}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  console.log(data);
  let rate = data[fromLowCur][toLowCur];

  let finalAmount = amtval * rate;
  msg.innerText = `${amtval} ${fromLowCur} = ${finalAmount} ${toLowCur}`;
});
