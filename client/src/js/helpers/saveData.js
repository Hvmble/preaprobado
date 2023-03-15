export const saveData = async (body) => {
    const url = 'http://localhost:8080/api/clients/'
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  
    const data = await resp.json()
    return console.log(data)
  }