
export const getSportUserData = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/sport-user`)
    const data = await res.json()
    return data
}