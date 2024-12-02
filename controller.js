import axios from "axios"

const getYoutubeUrl = async (ytId, type) => {
    try {
        const ytApiUrl = type === "Reel" ? `https://yt-api.p.rapidapi.com/channel/shorts?id=${ytId}&sort_by=newest` : `https://yt-api.p.rapidapi.com/channel/videos?id=${ytId}&sort_by=newest`
        const response = await axios.get(ytApiUrl, {
            headers: {
                "X-RapidAPI-Host": "yt-api.p.rapidapi.com",
                "X-RapidAPI-Key": process.env.RAPID_API_KEY
            }
        })
        const url = type === "Reel" ? `https://www.youtube.com/shorts/${response?.data?.data[0]?.videoId}` : `https://www.youtube.com/watch?v=${response?.data?.data[0]?.videoId}`
        const title = response?.data?.data[0]?.title
        return { url, title }
    } catch (error) {
        console.log(error)
    }
}

const getInstagramUrl = async (username) => {
    try {
        const instaApiUrl = `https://instagram-scraper-api2.p.rapidapi.com/v1.2/posts?username_or_id_or_url=${username}`
        const response = await axios.get(instaApiUrl, {
            headers: {
                "X-RapidAPI-Host": "instagram-scraper-api2.p.rapidapi.com",
                "X-RapidAPI-Key": process.env.RAPID_API_KEY
            }
        })

        const url = `https://www.instagram.com/reel/${response?.data?.data?.items[0]?.code}`
        return url
    } catch (error) {
        console.log(error)
    }
}

const getFbUrl = async (pageId) => {
    try {
        const fbUrl = `https://facebook-scraper3.p.rapidapi.com/page/posts?page_id=${pageId}`
        const response = await axios.get(fbUrl, {
            headers: {
                "X-RapidAPI-Host": "facebook-scraper3.p.rapidapi.com",
                "X-RapidAPI-Key": process.env.RAPID_API_KEY
            }
        })

        return response?.data?.results[0]?.url
    } catch (error) {
        console.log(error)
    }
}

const getText = async (req, res) => {
    const { ytId, type, username, fbId } = req.body
    try {
        const {url: ytUrl, title} = await getYoutubeUrl(ytId, type);
        const igUrl = await getInstagramUrl(username);
        // console.log(fbId)
        const fbUrl = await getFbUrl(fbId);
        const textMessage = `${type}

        ${title}
        
        Youtube: ${ytUrl}
        
        FB: ${fbUrl}
        
        Insta: ${igUrl}
        
        For more updates Join our WhatsApp Channel:
        https://whatsapp.com/channel/0029Va4Fp8bChq6DZbzWfz46
        
        ♡ ㅤ    ❍ㅤ     ⌲ 
        ˡᶦᵏᵉ  ᶜᵒᵐᵐᵉⁿᵗ  ˢʰᵃʳᵉ
        Team U∆`

        res.json({ youTube: ytUrl, insta: igUrl, facebook: fbUrl, type, title})
    } catch (error) {
        res.status(500).send({ message: "Something went wrong", error })
    }
}

export { getText }