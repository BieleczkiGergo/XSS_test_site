function makeHandler(input, output, purifier){
  function handler(){
    console.log("handler called");
    output.innerHTML = purifier(input.value);

  }

  return handler;
}

/** make a new xss challenge
 *
 */
function makeChallenge(title, ID, purifier){
  const inputField = document.createElement("input");

  const output = document.createElement("div");
  output.className = "out";
  output.id = ID + "out";

  const insertButton = document.createElement("button");
  insertButton.type = "button";
  insertButton.innerText = "insert";
  insertButton.addEventListener("click", makeHandler(inputField, output, purifier));

  const titleHeader = document.createElement("h2");
  titleHeader.innerText = title;

  const wrapper = document.createElement("section");

  const container = document.getElementById("container");
  
  wrapper.appendChild(titleHeader);
  wrapper.appendChild(inputField);
  wrapper.appendChild(insertButton);
  wrapper.appendChild(output);

  container.appendChild(wrapper);
  
}

makeChallenge("No purification", "nochange", val => val);
makeChallenge("Code is put inside comment", "commented", val => `<!-- ${val} -->`);
makeChallenge("Parenteses are cut out", "parentheses", val => val.replaceAll(/\(\)/g, ''));

