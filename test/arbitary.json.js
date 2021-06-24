()=>{
    fetch('https://localhost:5000/blogs',{
        method:'GET',
        headers:{
            'Content-Type':'application/json'
        }
    })
}