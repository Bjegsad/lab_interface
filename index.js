var divMenu = document.createElement('div');
document.body.appendChild(divMenu);
divMenu.style.display = 'flex';
divMenu.style.flexDirection = 'column';
divMenu.style.justifyContent = 'center';

var div1 = document.createElement('div');
div1.textContent = "Количество карточек по вертикали/горизонтали:";
divMenu.append(div1);
div1.style.fontSize = '20px';
div1.style.width = '305px';

var input1 = document.createElement("INPUT");
input1.setAttribute("value", "");
divMenu.append(input1);
input1.style.width = '305px';
input1.style.fontSize = '20px';

button2 = document.createElement("BUTTON");
divMenu.append(button2);
button2.textContent = 'Начать игру';
button2.style.width = '313px';
button2.style.fontSize = '20px';

divMenu.style.display = 'flex';
divMenu.style.flexDirection = 'column';

button2.addEventListener('click', onClick);


function onClick()
{
    var multiply = Number(input1.value)*Number(input1.value);
    if ((Number(input1.value)% 2 != 0) || (Number(input1.value)<2  || Number(input1.value)>10)) 
    {
        alert("Введены некорректные данные! Введите четное количество карточек в диапазоне 1<x<11");
        input1.value = 4;
    }
    else{
        divMenu.style.display = 'none';
        onPlay(multiply);
    }
}
function RandomCards(multiply)
{
    let indCards = [];
    let indCards2 = [];
    while (indCards.length<multiply/2) 
    {
        let ran = Math.floor(Math.random() * 1000);
        if (indCards.indexOf(ran) === -1) indCards.push(ran);
    }
    for (arr of indCards) {
        indCards2.push(arr);
        indCards2.push(arr)

    }
    for(let i = indCards2.length - 1; i > 0; i--) {
        j = Math.floor(Math.random()*(i + 1));
        t = indCards2[j];
        indCards2[j] = indCards2[i];
        indCards2[i] = t;
    }
    console.log(indCards2);
    return indCards2;
}

function onPlay(multiply){
    console.log(multiply);
    var divGame = document.createElement('div');
    document.body.appendChild(divGame);
    divGame.style.display = 'flex';
    divGame.style.flexDirection = 'column';
 
    randomMass = RandomCards(multiply);

    var arr = new Array(multiply);
    s = 0

    var divArr = new Array(Number(input1.value));

    for (let j = 0; j<Number(input1.value);j++)
    {
        divArr[j] = document.createElement('div');
        divGame.append(divArr[j]);
        divArr[j].style.width = '100%'

        for (let i = 0; i < Number(input1.value); i++)
        {
            arr[s] = document.createElement('BUTTON');
            divArr[j].append(arr[s]);
            arr[s].setAttribute('value','');
            arr[s].value = randomMass[s];
            arr[s].textContent = '';

            arr[s].style.width = '230px';
            arr[s].style.height= '130px';
            arr[s].style.padding = '100px';
            s += 1
        }
    }
    onCardClick(arr, divGame);

}
function onCardClick(arr, divGame)
{
    var dataArr = []
    var dataIdArr = []
    counter = 1;
    for (let i = 0; i<arr.length; i++)
    {
        arr[i].addEventListener('click', onFlipCard);
        
        function onFlipCard(e){
            e.target.textContent = e.target.value;
            dataArr.push(e.target.value);
            dataIdArr.push(i);
            console.log(dataArr);
            if (counter ==  Math.floor(arr.length / 2) &&  dataArr.length == 2){
                if (confirm('Победа!!!\nНачать новую игру?'))
                {
                    divGame.style.display = 'none';
                    divMenu.style.display = 'flex';
                }
                else{

                }
            }
            if (dataArr.length == 3){
                console.log("ДВА ЭЛЕМЕНТА");
                if (Number(dataArr[0]) != Number(dataArr[1])){
                    console.log("DELETE");
                    arr[Number(dataIdArr[0])].textContent = '';
                    arr[Number(dataIdArr[1])].textContent = '';
                    dataArr = [Number(dataArr[2])]
                    dataIdArr = [Number(dataIdArr[2])];
                }
                else if (Number(dataArr[0]) == Number(dataArr[1])){
                    console.log("SAVE");
                    dataArr = [Number(dataArr[2])]
                    dataIdArr = [Number(dataIdArr[2])];
                    counter += 1;
                    console.log(counter);
                }
            }
        }
    }
}
