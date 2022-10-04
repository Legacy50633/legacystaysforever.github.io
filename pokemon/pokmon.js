https://raw.githubusercontent.com/pokeAPI/sprites/master/sprites/pokemon/1.png
for(i=1;i<899;i++)
{
    let div = document.createElement('div')
    let span = document.createElement('span')
    span.innerText = `#${i}`;
   
    let img = document.createElement('img')
    let base = "https://raw.githubusercontent.com/pokeAPI/sprites/master/sprites/pokemon/"
    img.src = `${base}${i}.png`
    let body = document.querySelector('body')

    let h1 = document.querySelector('h1')
    
    body.appendChild(div)
    body.appendChild(img)
    body.appendChild(span)
    
}
