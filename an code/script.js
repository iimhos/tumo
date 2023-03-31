const button = document.getElementById('button');

function send_info(){
    const info = {
        name: document.getElementById('name').value,
        surname: document.getElementById('surname').value,
        age: document.getElementById('age').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value
    };

    if(document.getElementById('checkbox').checked != true){
        //throw new Error('дебіл, галочку постав');
    }

    fetch('/reg',
    {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(info)
    })
    console.log('111111123123');
}

button.addEventListener('click',send_info);
console.log('11');