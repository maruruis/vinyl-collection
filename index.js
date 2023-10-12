fetch("http://localhost:3000/vinyl", {
    method:"GET"
})
.then((response)=> response.json())
.then((data)=> {
    // utilize the data
    console.log(data);
    const all_blogs = document.getElementById("all_vinyls")
    
    for(element of data){
       all_blogs.innerHTML += `<div  id="card">
         <img onclick="displaySingleVinyl(${element.id})" src="${element.image}"
         <h6>${element.title}</h6>
         <button onclick="deleteVinyl(${element.id})" id="deleteBtn">Delete</button>
         <button onclick="edit(${element.id})" >Edit</button>
         </div>`

    }


})


// display single blog
function displaySingleVinyl(id)
{
    fetch(`http://localhost:3000/vinyl/${id}`, {
    method:"GET"
    })
    .then((response)=> response.json())
    .then((data)=> {
        const single_vinyl = document.getElementById("single_vinyl")
        single_vinyl.innerHTML = `<div>
        <img src="${data.image}"
        <h6>${data.title}</h6>
        <p>${data.description}</p>
      </div>`

        console.log(data)
    })
}


// delete single blog
function deleteVinyl(id)
{
    fetch(`http://localhost:3000/vinyl/${id}`, {
    method:"DELETE"
    })
    .then((response)=> response.json())
    .then((data)=> {
        alert("vinyl deleted Successfully")
    })
}

// Add a vynil album
const addForm = document.getElementById("addForm")
addForm.addEventListener("submit", function(event){
    event.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const image_url = document.getElementById("image_url").value;
    
    fetch(`http://localhost:3000/vinyl`, {
        method:"POST",
        body: JSON.stringify({
            title: title,
            description: description,
            image: image_url
            
        }),
        headers: {
            "Content-Type": "application/json",
        }
        })
        .then((response)=> response.json())
        .then((data)=> {
            alert("Vinyl created")
        })


    console.log(title, " ", description, " ", image_url)
})

// edit function
function edit(id){
    fetch(`http://localhost:3000/vinyl/${id}`)
    .then((response)=> response.json())
    .then((res)=> {
        console.log(res);
        const updateContainer = document.getElementById("updateContainer")
        updateContainer.innerHTML=`
        <h6>Update Form</h6>
        <div>
            <input type="text" id="update_title" value="${res.title}" placeholder="Enter Title">
            <input type="text" id="update_description" value="${res.description}" placeholder="Enter description">
            <input type="text" id="update_image_url" value="${res.image}" placeholder="Enter image url">
            <button onclick="update(${id})" type="submit">Update</button>
        </div>
        `
    })

}


function update(id){
    const update_title = document.getElementById("update_title").value;
    const update_description = document.getElementById("update_description").value;
    const update_image_url = document.getElementById("update_image_url").value;
    
    fetch(`http://localhost:3000/vinyl/${id}`, {
        method:"PATCH",
        body: JSON.stringify({
            title: update_title,
            description: update_description,
            image: update_image_url
        }),
        headers: {
            "Content-Type": "application/json",
        }
        })
        .then((response)=> response.json())
        .then((data)=> {
            alert("vinyl Updated")
        })
    console.log(update_title)


}


