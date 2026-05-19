
export const getSportUserData = async () => {
    const res = await fetch('http://localhost:8000/sport-user')
    const data = await res.json()
    return data
}