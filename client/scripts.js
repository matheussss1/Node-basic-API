const ul = document.querySelector("ul")
const input = document.querySelector("input")
const form = document.querySelector('form')

load()

async function load() {
    const res = await fetch('http://localhost:5000').then((data) => data.json())
    res.urls.map(url => addElement(url))
}

function addElement({ name, url }) {
    const li = document.createElement('li')
    const a = document.createElement("a")
    const trash = document.createElement("span")

    a.href = url
    a.innerHTML = name
    a.target = "_blank"

    trash.innerHTML = "x"
    trash.onclick = () => removeElement(name, url, trash)

    li.append(a)
    li.append(trash)
    ul.append(li)
}

function removeElement(name, url, el) {
    if (confirm('Tem certeza que deseja deletar?'))
        el.parentNode.remove()
        fetch(`http://localhost:5000?name=${name}&url=${url}&del=1`).then(() => console.log('Deletado'))
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let { value } = input

    if (!value) 
        return alert('Preencha o campo')

    const [name, url] = value.split(",")

    if (!url) 
        return alert('formate o texto da maneira correta')

    if (!/^http/.test(url)) 
        return alert("Digite a url da maneira correta")

    fetch(`http://localhost:5000?name=${name}&url=${url}`).then(() => addElement({name, url}))

    input.value = ""
})